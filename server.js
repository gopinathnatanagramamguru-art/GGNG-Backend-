const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const dns = require('dns');

// Bypass timing out local ISP DNS resolvers for MongoDB Atlas SRV connection queries
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
  console.log('Forced Node.js DNS resolver to public DNS (8.8.8.8, 1.1.1.1).');
} catch (err) {
  console.warn('Failed to set custom DNS servers:', err);
}
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Guru Gopinath Natanagramam & Dance Museum API' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/exhibits', require('./routes/exhibits'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/events', require('./routes/events'));
app.use('/api/inquiries', require('./routes/inquiries'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'An internal server error occurred',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
