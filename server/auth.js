const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { query } = require('./db');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const existingUser = await query(`SELECT * FROM users WHERE email = '${email}'`);
    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    await query(`INSERT INTO users (id, email, password) VALUES ('${userId}', '${email}', '${hashedPassword}')`);
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ token, user: { id: userId, email, subscription_status: 'none', subscription_plan: 'none' } });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const users = await query(`SELECT * FROM users WHERE email = '${email}'`);
    const user = users && users.length > 0 ? users[0] : null;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email,
        subscription_status: user.subscription_status,
        subscription_plan: user.subscription_plan
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/me', authenticate, async (req, res) => {
  try {
    const users = await query(`SELECT id, email, subscription_status, subscription_plan FROM users WHERE id = '${req.user.userId}'`);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: users[0] });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { router, authenticate };
