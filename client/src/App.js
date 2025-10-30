import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportIncident from './pages/ReportIncident';
import MyReports from './pages/MyReports';
import Admin from './pages/Admin';

// Set axios base URL from environment variables
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ✅ allow cross-origin cookies and authentication headers
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://mern-final-project-irenenderitu.onrender.com/api';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Debug: Check environment variables
    console.log('API URL:', process.env.REACT_APP_API_URL);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/auth/me');
      setUser(res.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  };

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route 
            path="/login" 
            element={
              !user 
                ? <Login onLogin={login} /> 
                : user.role === 'counselor' 
                  ? <Navigate to="/admin" /> 
                  : <Navigate to="/dashboard" />
            } 
          />
          <Route 
            path="/register" 
            element={
              !user 
                ? <Register onRegister={login} /> 
                : user.role === 'counselor' 
                  ? <Navigate to="/admin" /> 
                  : <Navigate to="/dashboard" />
            } 
          />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              user 
                ? user.role === 'counselor' 
                  ? <Navigate to="/admin" /> 
                  : <Dashboard user={user} onLogout={logout} /> 
                : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/report" 
            element={
              user 
                ? user.role === 'counselor' 
                  ? <Navigate to="/admin" /> 
                  : <ReportIncident user={user} /> 
                : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/my-reports" 
            element={
              user 
                ? user.role === 'counselor' 
                  ? <Navigate to="/admin" /> 
                  : <MyReports user={user} /> 
                : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin" 
            element={
              user && user.role === 'counselor' 
                ? <Admin user={user} onLogout={logout} /> 
                : <Navigate to="/dashboard" />
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;