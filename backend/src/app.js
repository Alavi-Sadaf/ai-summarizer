require('dotenv').config();
const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple Logger Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Health Check
app.get('/', (req, res) => {
    res.status(200).json({ status: 'API is running...' });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
  🚀 Server is humming!
  📡 Port: ${PORT}
  🔗 URL: http://localhost:${PORT}
  `);
});
