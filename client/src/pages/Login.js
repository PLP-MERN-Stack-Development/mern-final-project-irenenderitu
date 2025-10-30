import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? 'https://mern-final-project-irenenderitu.onrender.com/api/auth/login' : 'https://mern-final-project-irenenderitu.onrender.com/api/auth/register';
      const res = await axios.post(endpoint, formData);
      
      onLogin(res.data.token, res.data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p style={styles.subtitle}>
            {isLogin ? 'Sign in to your SafeReport account' : 'Join SafeReport to report incidents safely'}
          </p>
        </div>
        
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter your full name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter your phone number"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Account Type</label>
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="user">Regular User</option>
                  <option value="counselor">Counselor/Support Staff</option>
                </select>
                <small style={styles.helpText}>
                  {formData.role === 'counselor' 
                    ? 'Counselors can provide support to users' 
                    : 'Regular users can report incidents and access support'}
                </small>
              </div>
            </>
          )}
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your email address"
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your password"
              minLength="6"
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <small style={styles.helpText}>
              Password must be at least 6 characters long
            </small>
          </div>

          {isLogin && (
            <div style={styles.forgotPassword}>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot your password?
              </Link>
            </div>
          )}
          
          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              ...(loading ? styles.submitButtonDisabled : {})
            }}
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        
        <div style={styles.switchContainer}>
          <p style={styles.switchText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              style={styles.switchLink}
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? 'Sign up now' : 'Sign in here'}
            </span>
          </p>
        </div>

        <div style={styles.features}>
          <h4 style={styles.featuresTitle}>Why join SafeReport?</h4>
          <ul style={styles.featuresList}>
            <li>🛡️ Report incidents anonymously</li>
            <li>🔒 Secure and confidential platform</li>
            <li>📱 Track your report status</li>
            <li>🤝 Access support resources</li>
            <li>🗺️ Help create safer communities</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '2rem 1rem',
    backgroundColor: '#f8f9fa'
  },
  card: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  subtitle: {
    color: '#666',
    marginTop: '0.5rem'
  },
  error: {
    backgroundColor: '#ffe6e6',
    color: '#d63031',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '1.5rem',
    textAlign: 'center',
    border: '1px solid #ffcccc'
  },
  form: {
    marginBottom: '1.5rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    backgroundColor: 'white',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  helpText: {
    display: 'block',
    marginTop: '0.5rem',
    color: '#666',
    fontSize: '0.85rem'
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: '1.5rem'
  },
  forgotLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '0.9rem'
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '14px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  submitButtonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed'
  },
  switchContainer: {
    textAlign: 'center',
    marginBottom: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #eee'
  },
  switchText: {
    color: '#666'
  },
  switchLink: {
    color: '#007bff',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'none'
  },
  features: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  featuresTitle: {
    marginBottom: '1rem',
    color: '#333',
    textAlign: 'center'
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  featuresList: {
    padding: '0.5rem 0',
    color: '#555'
  }
};

export default Login;