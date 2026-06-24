const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { query } = require('./db');
const { authenticate } = require('./auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const transactions = await query('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [req.user.userId]);
    res.json(transactions);
  } catch (error) {
    console.error('Fetch transactions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { amount, category, date, description } = req.body;
  if (!amount || !category || !date) {
    return res.status(400).json({ message: 'Amount, category, and date are required' });
  }

  try {
    const id = uuidv4();
    await query('INSERT INTO transactions (id, user_id, amount, category, date, description) VALUES (?, ?, ?, ?, ?, ?)', 
      [id, req.user.userId, amount, category, date, description || '']);
    res.status(201).json({ id, amount, category, date, description });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
