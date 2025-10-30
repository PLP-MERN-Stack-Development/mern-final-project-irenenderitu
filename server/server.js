// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Add these root routes:
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'SafeReport API Server is running!',
//     version: '1.0.0',
//     timestamp: new Date().toISOString(),
//     endpoints: {
//       auth: '/api/auth',
//       reports: '/api/reports'
//     }
//   });
// });

// app.get('/api', (req, res) => {
//   res.json({ 
//     message: 'SafeReport API is working!',
//     status: 'active',
//     timestamp: new Date().toISOString()
//   });
// });

// // Test route for API health check
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK',
//     database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
//     timestamp: new Date().toISOString()
//   });
// });

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/reports', require('./routes/reports'));

// // Database connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/harassment-reporting')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Improved CORS Middleware - Add this
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mern-final-project-irenenderitu.vercel.app', // Replace with your actual Vercel URLc
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests explicitly
app.options('*', cors()); // This is important!

// Your existing middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Add request logging to see what's happening
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// Your existing routes...
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

// Test route for API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/harassment-reporting')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});