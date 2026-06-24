const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { authenticate } = require('./auth');
const { query } = require('./db');
const router = express.Router();

// 4. Build Checkout session endpoint
router.post('/create-checkout-session', express.json(), authenticate, async (req, res) => {
  const { tier } = req.body;
  const userId = req.user.userId;
  const email = req.user.email;

  const priceId = tier === 'pro' ? process.env.STRIPE_PRO_PRICE_ID : process.env.STRIPE_STARTER_PRICE_ID;

  if (!priceId) {
    return res.status(400).json({ message: 'Invalid tier' });
  }

  try {
    // Get or create stripe customer
    const users = await query('SELECT stripe_customer_id FROM users WHERE id = ?', [userId]);
    let customerId = users[0]?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({ email, metadata: { userId } });
      customerId = customer.id;
      await query('UPDATE users SET stripe_customer_id = ? WHERE id = ?', [customerId, userId]);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 14,
      },
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/pricing`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 5. Build subscription status endpoint
router.get('/subscription', authenticate, async (req, res) => {
  try {
    const users = await query('SELECT subscription_status, subscription_plan FROM users WHERE id = ?', [req.user.userId]);
    res.json({ 
      status: users[0]?.subscription_status || 'none',
      plan: users[0]?.subscription_plan || 'none'
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 6. Handle webhook endpoint
router.post('/webhooks', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const customerId = session.customer;
        const subscriptionId = session.subscription;
        
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const planId = subscription.items.data[0].price.id;
        const plan = planId === process.env.STRIPE_PRO_PRICE_ID ? 'pro' : 'starter';

        await query('UPDATE users SET subscription_status = ?, subscription_plan = ?, subscription_id = ? WHERE stripe_customer_id = ?', 
          ['active', plan, subscriptionId, customerId]);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const status = subscription.status;
        const planId = subscription.items.data[0].price.id;
        const plan = planId === process.env.STRIPE_PRO_PRICE_ID ? 'pro' : 'starter';

        await query('UPDATE users SET subscription_status = ?, subscription_plan = ? WHERE stripe_customer_id = ?', 
          [status, plan, customerId]);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        await query('UPDATE users SET subscription_status = ?, subscription_plan = ?, subscription_id = NULL WHERE stripe_customer_id = ?', 
          ['canceled', 'none', customerId]);
        break;
      }
    }
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handling error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
