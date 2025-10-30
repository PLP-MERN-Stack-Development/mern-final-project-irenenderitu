const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// ✅ Secure and explicit CORS setup
app.use(cors({
  origin: 'https://mern-final-project-irenenderitu.vercel.app', // your deployed frontend
  credentials: true, // allow cookies / tokens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ handle preflight OPTIONS requests
app.options('*', cors());

// ✅ other middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// ✅ Root routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'SafeReport API Server is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      reports: '/api/reports'
    }
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'SafeReport API is working!',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// ✅ API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));

// ✅ Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/harassment-reporting')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
