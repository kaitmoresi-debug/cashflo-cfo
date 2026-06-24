const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { router: authRouter } = require('./auth');
const transactionsRouter = require('./transactions');
const predictionsRouter = require('./predictions');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/predictions', predictionsRouter);


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Cashflow CFO API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
