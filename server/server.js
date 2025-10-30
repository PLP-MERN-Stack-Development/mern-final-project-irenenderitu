// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // require('dotenv').config();

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use('/uploads', express.static('uploads'));

// // // Add these root routes:
// // app.get('/', (req, res) => {
// //   res.json({ 
// //     message: 'SafeReport API Server is running!',
// //     version: '1.0.0',
// //     timestamp: new Date().toISOString(),
// //     endpoints: {
// //       auth: '/api/auth',
// //       reports: '/api/reports'
// //     }
// //   });
// // });

// // app.get('/api', (req, res) => {
// //   res.json({ 
// //     message: 'SafeReport API is working!',
// //     status: 'active',
// //     timestamp: new Date().toISOString()
// //   });
// // });

// // // Test route for API health check
// // app.get('/api/health', (req, res) => {
// //   res.json({ 
// //     status: 'OK',
// //     database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
// //     timestamp: new Date().toISOString()
// //   });
// // });

// // // Routes
// // app.use('/api/auth', require('./routes/auth'));
// // app.use('/api/reports', require('./routes/reports'));

// // // Database connection
// // mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/harassment-reporting')
// //   .then(() => console.log('MongoDB connected'))
// //   .catch(err => console.log(err));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Enhanced CORS with debugging
// app.use(cors({
//   origin: function (origin, callback) {
//     console.log('🌐 CORS Check - Origin:', origin);
    
//     const allowedOrigins = [
//       'http://localhost:3000',
//       'http://localhost:3001',
//       'https://mern-final-project-irenenderitu.vercel.app',
//       'https://safereport.vercel.app'
//     ];
    
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) {
//       console.log('✅ CORS: No origin - allowing');
//       return callback(null, true);
//     }
    
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       console.log('✅ CORS: Origin allowed -', origin);
//       callback(null, true);
//     } else {
//       console.log('❌ CORS: Origin blocked -', origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));

// // Handle preflight requests
// app.options('*', cors());

// // Enhanced request logging middleware
// app.use((req, res, next) => {
//   console.log('\n=== 📨 INCOMING REQUEST ===');
//   console.log('🕒 Time:', new Date().toISOString());
//   console.log('🔗 Method:', req.method);
//   console.log('🌐 URL:', req.url);
//   console.log('📍 Origin:', req.headers.origin);
//   console.log('📧 Host:', req.headers.host);
//   console.log('🔑 Authorization:', req.headers.authorization ? 'Present' : 'Missing');
//   console.log('📋 Content-Type:', req.headers['content-type']);
//   console.log('📦 Body:', req.body);
//   console.log('=== END REQUEST INFO ===\n');
  
//   // Capture the original send function
//   const originalSend = res.send;
  
//   // Override send to log responses
//   res.send = function(data) {
//     console.log('\n=== 📤 OUTGOING RESPONSE ===');
//     console.log('🕒 Time:', new Date().toISOString());
//     console.log('🔗 Method:', req.method);
//     console.log('🌐 URL:', req.url);
//     console.log('📊 Status Code:', res.statusCode);
//     console.log('📦 Response Data:', typeof data === 'string' ? JSON.parse(data || '{}') : data);
//     console.log('=== END RESPONSE INFO ===\n');
    
//     originalSend.apply(this, arguments);
//   };
  
//   next();
// });

// // Body parser middleware
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Root routes with enhanced logging
// app.get('/', (req, res) => {
//   console.log('✅ Root route accessed');
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
//   console.log('✅ API root route accessed');
//   res.json({ 
//     message: 'SafeReport API is working!',
//     status: 'active',
//     timestamp: new Date().toISOString()
//   });
// });

// // Enhanced health check with detailed DB info
// app.get('/api/health', (req, res) => {
//   const dbStatus = mongoose.connection.readyState;
//   const dbStatusText = {
//     0: 'Disconnected',
//     1: 'Connected',
//     2: 'Connecting',
//     3: 'Disconnecting'
//   }[dbStatus] || 'Unknown';
  
//   console.log('🏥 Health check - DB Status:', dbStatusText);
  
//   res.json({ 
//     status: 'OK',
//     database: dbStatusText,
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// // Test auth endpoints directly
// app.get('/api/auth/debug', (req, res) => {
//   console.log('🔧 Auth debug endpoint accessed');
//   res.json({
//     message: 'Auth routes are accessible',
//     availableEndpoints: [
//       'POST /api/auth/register',
//       'POST /api/auth/login',
//       'GET /api/auth/me'
//     ],
//     timestamp: new Date().toISOString()
//   });
// });

// // Test specific auth route
// app.post('/api/auth/test', (req, res) => {
//   console.log('🧪 Test auth endpoint called with data:', req.body);
//   res.json({
//     success: true,
//     message: 'Test endpoint working!',
//     receivedData: req.body,
//     timestamp: new Date().toISOString()
//   });
// });

// // Route loading with error handling
// console.log('🔄 Loading routes...');

// try {
//   const authRoutes = require('./routes/auth');
//   app.use('/api/auth', authRoutes);
//   console.log('✅ Auth routes loaded successfully');
// } catch (error) {
//   console.log('❌ ERROR loading auth routes:', error.message);
//   console.log('💡 Make sure ./routes/auth.js exists and exports properly');
// }

// try {
//   const reportRoutes = require('./routes/reports');
//   app.use('/api/reports', reportRoutes);
//   console.log('✅ Report routes loaded successfully');
// } catch (error) {
//   console.log('❌ ERROR loading report routes:', error.message);
// }

// // Global error handler
// app.use((error, req, res, next) => {
//   console.log('\n=== 🚨 GLOBAL ERROR ===');
//   console.log('🕒 Time:', new Date().toISOString());
//   console.log('🔗 URL:', req.url);
//   console.log('📧 Method:', req.method);
//   console.log('❌ Error:', error.message);
//   console.log('📋 Stack:', error.stack);
//   console.log('=== END ERROR INFO ===\n');
  
//   res.status(500).json({
//     success: false,
//     message: 'Internal server error',
//     error: process.env.NODE_ENV === 'production' ? {} : error.message
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   console.log('❌ 404 - Route not found:', req.originalUrl);
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//     requestedUrl: req.originalUrl,
//     availableRoutes: [
//       'GET /',
//       'GET /api',
//       'GET /api/health',
//       'GET /api/auth/debug',
//       'POST /api/auth/test',
//       'POST /api/auth/register',
//       'POST /api/auth/login',
//       'GET /api/auth/me'
//     ]
//   });
// });

// // Database connection with enhanced logging
// console.log('🔄 Connecting to MongoDB...');
// console.log('📡 MongoDB URI:', process.env.MONGODB_URI ? 'Present' : 'Missing');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/harassment-reporting')
//   .then(() => {
//     console.log('✅ MongoDB connected successfully');
//     console.log('🏠 Database:', mongoose.connection.name);
//     console.log('👤 Host:', mongoose.connection.host);
//   })
//   .catch(err => {
//     console.log('❌ MongoDB connection failed:');
//     console.log('💥 Error:', err.message);
//     console.log('💡 Check if:');
//     console.log('   - MongoDB is running');
//     console.log('   - Connection string is correct');
//     console.log('   - Network connectivity');
//   });

// // Database event listeners
// mongoose.connection.on('error', (err) => {
//   console.log('❌ MongoDB connection error:', err);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('⚠️ MongoDB disconnected');
// });

// mongoose.connection.on('reconnected', () => {
//   console.log('✅ MongoDB reconnected');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log('\n=== 🚀 SERVER STARTED ===');
//   console.log('✅ Server running on port', PORT);
//   console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
//   console.log('📡 MongoDB:', mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected');
//   console.log('🕒 Started at:', new Date().toISOString());
//   console.log('=== SERVER READY ===\n');
  
//   // Test the server internally
//   console.log('🧪 Testing server internally...');
//   const testUrl = `http://localhost:${PORT}/api/health`;
//   console.log('💡 You can test the server manually by visiting:', testUrl);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enhanced CORS with debugging - UPDATED WITH PATCH METHOD
app.use(cors({
  origin: function (origin, callback) {
    console.log('🌐 CORS Check - Origin:', origin);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://mern-final-project-irenenderitu.vercel.app',
      'https://safereport.vercel.app'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✅ CORS: No origin - allowing');
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ CORS: Origin allowed -', origin);
      callback(null, true);
    } else {
      console.log('❌ CORS: Origin blocked -', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // ✅ ADDED PATCH
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

// Enhanced request logging middleware
app.use((req, res, next) => {
  console.log('\n=== 📨 INCOMING REQUEST ===');
  console.log('🕒 Time:', new Date().toISOString());
  console.log('🔗 Method:', req.method);
  console.log('🌐 URL:', req.url);
  console.log('📍 Origin:', req.headers.origin);
  console.log('📧 Host:', req.headers.host);
  console.log('🔑 Authorization:', req.headers.authorization ? 'Present' : 'Missing');
  console.log('📋 Content-Type:', req.headers['content-type']);
  console.log('📦 Body:', req.body);
  console.log('=== END REQUEST INFO ===\n');
  
  // Capture the original send function
  const originalSend = res.send;
  
  // Override send to log responses
  res.send = function(data) {
    console.log('\n=== 📤 OUTGOING RESPONSE ===');
    console.log('🕒 Time:', new Date().toISOString());
    console.log('🔗 Method:', req.method);
    console.log('🌐 URL:', req.url);
    console.log('📊 Status Code:', res.statusCode);
    console.log('📦 Response Data:', typeof data === 'string' ? JSON.parse(data || '{}') : data);
    console.log('=== END RESPONSE INFO ===\n');
    
    originalSend.apply(this, arguments);
  };
  
  next();
});

// Body parser middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Root routes with enhanced logging
app.get('/', (req, res) => {
  console.log('✅ Root route accessed');
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
  console.log('✅ API root route accessed');
  res.json({ 
    message: 'SafeReport API is working!',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

// Enhanced health check with detailed DB info
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStatusText = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  }[dbStatus] || 'Unknown';
  
  console.log('🏥 Health check - DB Status:', dbStatusText);
  
  res.json({ 
    status: 'OK',
    database: dbStatusText,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test auth endpoints directly
app.get('/api/auth/debug', (req, res) => {
  console.log('🔧 Auth debug endpoint accessed');
  res.json({
    message: 'Auth routes are accessible',
    availableEndpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/me'
    ],
    timestamp: new Date().toISOString()
  });
});

// Test specific auth route
app.post('/api/auth/test', (req, res) => {
  console.log('🧪 Test auth endpoint called with data:', req.body);
  res.json({
    success: true,
    message: 'Test endpoint working!',
    receivedData: req.body,
    timestamp: new Date().toISOString()
  });
});

// Route loading with error handling
console.log('🔄 Loading routes...');

try {
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ Auth routes loaded successfully');
} catch (error) {
  console.log('❌ ERROR loading auth routes:', error.message);
  console.log('💡 Make sure ./routes/auth.js exists and exports properly');
}

try {
  const reportRoutes = require('./routes/reports');
  app.use('/api/reports', reportRoutes);
  console.log('✅ Report routes loaded successfully');
} catch (error) {
  console.log('❌ ERROR loading report routes:', error.message);
}

// Global error handler
app.use((error, req, res, next) => {
  console.log('\n=== 🚨 GLOBAL ERROR ===');
  console.log('🕒 Time:', new Date().toISOString());
  console.log('🔗 URL:', req.url);
  console.log('📧 Method:', req.method);
  console.log('❌ Error:', error.message);
  console.log('📋 Stack:', error.stack);
  console.log('=== END ERROR INFO ===\n');
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? {} : error.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log('❌ 404 - Route not found:', req.originalUrl);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedUrl: req.originalUrl,
    availableRoutes: [
      'GET /',
      'GET /api',
      'GET /api/health',
      'GET /api/auth/debug',
      'POST /api/auth/test',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/me'
    ]
  });
});

// Database connection with enhanced logging
console.log('🔄 Connecting to MongoDB...');
console.log('📡 MongoDB URI:', process.env.MONGODB_URI ? 'Present' : 'Missing');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/harassment-reporting')
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log('🏠 Database:', mongoose.connection.name);
    console.log('👤 Host:', mongoose.connection.host);
  })
  .catch(err => {
    console.log('❌ MongoDB connection failed:');
    console.log('💥 Error:', err.message);
    console.log('💡 Check if:');
    console.log('   - MongoDB is running');
    console.log('   - Connection string is correct');
    console.log('   - Network connectivity');
  });

// Database event listeners
mongoose.connection.on('error', (err) => {
  console.log('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n=== 🚀 SERVER STARTED ===');
  console.log('✅ Server running on port', PORT);
  console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
  console.log('📡 MongoDB:', mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected');
  console.log('🕒 Started at:', new Date().toISOString());
  console.log('=== SERVER READY ===\n');
  
  // Test the server internally
  console.log('🧪 Testing server internally...');
  const testUrl = `http://localhost:${PORT}/api/health`;
  console.log('💡 You can test the server manually by visiting:', testUrl);
});