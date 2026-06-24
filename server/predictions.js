const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { query } = require('./db');
const { authenticate } = require('./auth');

const router = express.Router();

// Get all predictions for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const predictions = await query(`SELECT * FROM predictions WHERE user_id = '${req.user.userId}'`);
    res.json(predictions);
  } catch (error) {
    console.error('Fetch predictions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Trigger a recalculation of all predictions
router.post('/recalculate', authenticate, async (req, res) => {
  const userId = req.user.userId;
  try {
    const transactions = await query(`SELECT * FROM transactions WHERE user_id = '${userId}'`);
    
    // 1. Tax Prediction
    const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const expenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0));
    const profit = Math.max(0, income - expenses);
    
    const selfEmploymentTax = profit * 0.153;
    const estimatedIncomeTax = profit * 0.15; // Simplified 15% income tax
    const totalTaxNeeded = selfEmploymentTax + estimatedIncomeTax;
    
    await updatePrediction(userId, 'tax', totalTaxNeeded, {
      income,
      expenses,
      profit,
      selfEmploymentTax,
      estimatedIncomeTax,
      nextPayments: [
        { date: '2026-06-15', label: 'Q2' },
        { date: '2026-09-15', label: 'Q3' },
        { date: '2027-01-15', label: 'Q4' },
        { date: '2027-04-15', label: 'Q1' }
      ]
    });

    // 2. Runway Forecasting
    const monthlyExpenses = {};
    const monthlyIncome = {};
    transactions.forEach(t => {
      const month = t.date.substring(0, 7);
      if (t.amount < 0) {
        monthlyExpenses[month] = (monthlyExpenses[month] || 0) + Math.abs(t.amount);
      } else {
        monthlyIncome[month] = (monthlyIncome[month] || 0) + t.amount;
      }
    });

    const months = Object.keys({ ...monthlyExpenses, ...monthlyIncome }).sort().reverse();
    const last3Months = months.slice(0, 3);
    
    const avgMonthlyExpenses = last3Months.reduce((acc, m) => acc + (monthlyExpenses[m] || 0), 0) / (last3Months.length || 1);
    const avgMonthlyIncome = last3Months.reduce((acc, m) => acc + (monthlyIncome[m] || 0), 0) / (last3Months.length || 1);
    const netBurn = Math.max(0, avgMonthlyExpenses - avgMonthlyIncome);
    
    const startingBalance = 10000;
    const netCashToDate = income - expenses;
    const currentBalance = startingBalance + netCashToDate;
    
    const runwayMonths = netBurn > 0 ? currentBalance / netBurn : 99; 
    
    await updatePrediction(userId, 'runway', runwayMonths, {
      currentBalance,
      avgMonthlyExpenses,
      avgMonthlyIncome,
      netBurn,
      status: runwayMonths > 12 ? 'green' : (runwayMonths > 3 ? 'amber' : 'red')
    });

    // 3. Pricing Suggestions
    let suggestion = null;
    if (avgMonthlyExpenses > 0) {
      if (avgMonthlyExpenses > avgMonthlyIncome * 0.7) {
        const suggestedIncrease = 0.15;
        const addedMonthlyRevenue = avgMonthlyIncome * suggestedIncrease;
        const newRunway = netBurn > addedMonthlyRevenue ? currentBalance / (netBurn - addedMonthlyRevenue) : 99;
        
        suggestion = {
          text: `Your expenses are ${Math.round((avgMonthlyExpenses / (avgMonthlyIncome || 1)) * 100)}% of your income. Consider raising rates by 15%.`,
          impact: `A 15% increase would add $${Math.round(addedMonthlyRevenue)}/month and extend runway by ${newRunway === 99 ? 'infinity' : Math.round(newRunway - runwayMonths)} months.`
        };
        
        await createPricingSuggestion(userId, suggestion.text, suggestion.impact);
      }
    }

    res.json({ success: true, predictions: { tax: totalTaxNeeded, runway: runwayMonths, pricing: suggestion } });
  } catch (error) {
    console.error('Recalculate error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get pricing suggestions
router.get('/suggestions', authenticate, async (req, res) => {
  try {
    const suggestions = await query(`SELECT * FROM pricing_suggestions WHERE user_id = '${req.user.userId}' AND status = 'pending'`);
    res.json(suggestions);
  } catch (error) {
    console.error('Fetch suggestions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update pricing suggestion status
router.post('/suggestions/:id/status', authenticate, async (req, res) => {
  const { status } = req.body;
  if (!['accepted', 'dismissed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  try {
    await query(`UPDATE pricing_suggestions SET status = '${status}', updated_at = CURRENT_TIMESTAMP WHERE id = '${req.params.id}' AND user_id = '${req.user.userId}'`);
    res.json({ success: true });
  } catch (error) {
    console.error('Update suggestion status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function updatePrediction(userId, type, value, details) {
  const detailsStr = JSON.stringify(details);
  const existing = await query(`SELECT id FROM predictions WHERE user_id = '${userId}' AND type = '${type}'`);
  if (existing && existing.length > 0) {
    await query(`UPDATE predictions SET value = ${value}, details = '${detailsStr.replace(/'/g, "''")}', updated_at = CURRENT_TIMESTAMP WHERE id = '${existing[0].id}'`);
  } else {
    await query(`INSERT INTO predictions (id, user_id, type, value, details) VALUES ('${uuidv4()}', '${userId}', '${type}', ${value}, '${detailsStr.replace(/'/g, "''")}')`);
  }
}

async function createPricingSuggestion(userId, suggestion, impact) {
  const existing = await query(`SELECT id FROM pricing_suggestions WHERE user_id = '${userId}' AND suggestion = '${suggestion.replace(/'/g, "''")}' AND status = 'pending'`);
  if (!existing || existing.length === 0) {
    await query(`INSERT INTO pricing_suggestions (id, user_id, suggestion, impact) VALUES ('${uuidv4()}', '${userId}', '${suggestion.replace(/'/g, "''")}', '${impact.replace(/'/g, "''")}')`);
  }
}

module.exports = router;
