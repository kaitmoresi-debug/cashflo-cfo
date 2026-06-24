const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const { router: authRouter } = require('./auth');
const transactionsRouter = require('./transactions');
const predictionsRouter = require('./predictions');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet({
  contentSecurityPolicy: false, // Disable for MVP if it causes issues with local/external assets
}));
app.use(cors());
app.use(morgan('dev'));
const stripeRouter = require("./stripe");
app.use("/api", stripeRouter);
app.use(express.json());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/predictions', predictionsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Cashflow CFO API is running' });
});

// Serve static files from the React app in production
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      // If index.html is missing, it means the client hasn't been built
      res.status(404).send('Frontend not built. Run "npm run build" in the client directory.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

