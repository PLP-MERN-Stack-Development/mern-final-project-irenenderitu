// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Register = ({ onLogin }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     role: 'user'
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }

//     setLoading(true);

//     try {
//       const { confirmPassword, ...submitData } = formData;
//       const res = await axios.post('/auth/register', submitData);
      
//       onLogin(res.data.token, res.data.user);
//       navigate('/dashboard');
//     } catch (error) {
//       setError(error.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <h2>Join SafeReport</h2>
//           <p style={styles.subtitle}>
//             Create your account to start reporting incidents safely
//           </p>
//         </div>
        
//         {error && (
//           <div style={styles.error}>
//             ⚠️ {error}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Full Name *</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               style={styles.input}
//               placeholder="Enter your full name"
//               onFocus={(e) => e.target.style.borderColor = '#007bff'}
//               onBlur={(e) => e.target.style.borderColor = '#ddd'}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Email Address *</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               style={styles.input}
//               placeholder="Enter your email address"
//               onFocus={(e) => e.target.style.borderColor = '#007bff'}
//               onBlur={(e) => e.target.style.borderColor = '#ddd'}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               style={styles.input}
//               placeholder="Enter your phone number (optional)"
//               onFocus={(e) => e.target.style.borderColor = '#007bff'}
//               onBlur={(e) => e.target.style.borderColor = '#ddd'}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Account Type *</label>
//             <select 
//               name="role" 
//               value={formData.role} 
//               onChange={handleChange}
//               style={styles.select}
//               required
//               onFocus={(e) => e.target.style.borderColor = '#007bff'}
//               onBlur={(e) => e.target.style.borderColor = '#ddd'}
//             >
//               <option value="user">Regular User</option>
//               <option value="counselor">Counselor/Support Staff</option>
//             </select>
//             <small style={styles.helpText}>
//               {formData.role === 'counselor' 
//                 ? 'Counselors can provide support and guidance to users' 
//                 : 'Regular users can report incidents and access support resources'}
//             </small>
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Password *</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               style={styles.input}
//               placeholder="Create a password (min. 6 characters)"
//               minLength="6"
//               onFocus={(e) => e.target.style.borderColor = '#007bff'}
//               onBlur={(e) => e.target.style.borderColor = '#ddd'}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Confirm Password *</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               style={styles.input}
//               placeholder="Confirm your password"
//               minLength="6"
//               onFocus={(e) => e.target.style.borderColor = '#007bff'}
//               onBlur={(e) => e.target.style.borderColor = '#ddd'}
//             />
//           </div>
          
//           <button 
//             type="submit" 
//             style={{
//               ...styles.submitButton,
//               ...(loading ? styles.submitButtonDisabled : {})
//             }}
//             disabled={loading}
//           >
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </button>
//         </form>
        
//         <div style={styles.switchContainer}>
//           <p style={styles.switchText}>
//             Already have an account? {' '}
//             <Link to="/login" style={styles.switchLink}>
//               Sign in here
//             </Link>
//           </p>
//         </div>

//         <div style={styles.privacyNotice}>
//           <h4 style={styles.privacyTitle}>🔒 Your Privacy Matters</h4>
//           <ul style={styles.privacyList}>
//             <li>We never share your personal information without your consent</li>
//             <li>All reports can be submitted anonymously</li>
//             <li>Your data is encrypted and stored securely</li>
//             <li>You control what information is shared</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     padding: '2rem 1rem',
//     backgroundColor: '#f8f9fa'
//   },
//   card: {
//     background: 'white',
//     padding: '2.5rem',
//     borderRadius: '12px',
//     boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//     width: '100%',
//     maxWidth: '500px'
//   },
//   header: {
//     textAlign: 'center',
//     marginBottom: '2rem'
//   },
//   subtitle: {
//     color: '#666',
//     marginTop: '0.5rem'
//   },
//   error: {
//     backgroundColor: '#ffe6e6',
//     color: '#d63031',
//     padding: '12px',
//     borderRadius: '6px',
//     marginBottom: '1.5rem',
//     textAlign: 'center',
//     border: '1px solid #ffcccc'
//   },
//   form: {
//     marginBottom: '1.5rem'
//   },
//   formGroup: {
//     marginBottom: '1.5rem'
//   },
//   label: {
//     display: 'block',
//     marginBottom: '0.5rem',
//     fontWeight: '600',
//     color: '#333'
//   },
//   input: {
//     width: '100%',
//     padding: '12px 16px',
//     border: '1px solid #ddd',
//     borderRadius: '6px',
//     fontSize: '16px',
//     transition: 'border-color 0.3s, box-shadow 0.3s',
//   },
//   select: {
//     width: '100%',
//     padding: '12px 16px',
//     border: '1px solid #ddd',
//     borderRadius: '6px',
//     fontSize: '16px',
//     backgroundColor: 'white',
//     transition: 'border-color 0.3s, box-shadow 0.3s',
//   },
//   helpText: {
//     display: 'block',
//     marginTop: '0.5rem',
//     color: '#666',
//     fontSize: '0.85rem'
//   },
//   submitButton: {
//     width: '100%',
//     backgroundColor: '#28a745',
//     color: 'white',
//     padding: '14px',
//     border: 'none',
//     borderRadius: '6px',
//     fontSize: '16px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s'
//   },
//   submitButtonDisabled: {
//     backgroundColor: '#6c757d',
//     cursor: 'not-allowed'
//   },
//   switchContainer: {
//     textAlign: 'center',
//     marginBottom: '2rem',
//     paddingTop: '1.5rem',
//     borderTop: '1px solid #eee'
//   },
//   switchText: {
//     color: '#666'
//   },
//   switchLink: {
//     color: '#007bff',
//     fontWeight: '600',
//     textDecoration: 'none'
//   },
//   privacyNotice: {
//     backgroundColor: '#e8f5e8',
//     padding: '1.5rem',
//     borderRadius: '8px',
//     border: '1px solid #d4edda'
//   },
//   privacyTitle: {
//     marginBottom: '1rem',
//     color: '#155724',
//     textAlign: 'center'
//   },
//   privacyList: {
//     listStyle: 'none',
//     padding: 0,
//     margin: 0,
//     color: '#155724'
//   },
//   privacyList: {
//     padding: '0.5rem 0',
//     fontSize: '0.9rem',
//     position: 'relative',
//     paddingLeft: '1.5rem'
//   }
// };

// // Add custom styles for privacy list checkmarks
// const privacyListStyle = `
//   [style*="paddingLeft: 1.5rem"]:before {
//     content: '✓';
//     position: absolute;
//     left: 0;
//     color: #28a745;
//     font-weight: bold;
//   }
// `;

// // Inject styles
// if (typeof document !== 'undefined') {
//   const style = document.createElement('style');
//   style.textContent = privacyListStyle;
//   document.head.appendChild(style);
// }

// export default Register;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...submitData } = formData;
      
      // Comprehensive debug logging
      console.log('🔍 === REGISTER DEBUG INFO ===');
      console.log('🌐 Base URL:', axios.defaults.baseURL);
      console.log('🔗 Full Endpoint:', axios.defaults.baseURL + '/auth/register');
      console.log('📦 Request Data:', submitData);
      console.log('🔄 Making POST request to /auth/register...');
      
      const res = await axios.post('/auth/register', submitData);
      
      console.log('✅ SUCCESS - Registration successful!');
      console.log('🔑 Token received:', res.data.token ? 'Yes' : 'No');
      console.log('👤 User data received:', res.data.user);
      console.log('📄 Full response:', res.data);
      
      onLogin(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (error) {
      console.log('❌ REGISTRATION FAILED - Detailed Error Analysis:');
      console.log('🚨 Full error object:', error);
      console.log('📡 Error response exists:', !!error.response);
      console.log('🔴 HTTP Status code:', error.response?.status);
      console.log('📄 Error response data:', error.response?.data);
      console.log('📋 Server error message:', error.response?.data?.message);
      console.log('🌐 Network error details:', error.message);
      console.log('🔧 Error code:', error.code);
      console.log('📊 Is axios error?', error.isAxiosError);
      
      // More specific error messages based on the error type
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 400) {
          setError(error.response.data.message || 'Invalid registration data');
        } else if (error.response.status === 409) {
          setError('Email already exists. Please use a different email.');
        } else if (error.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(error.response.data.message || `Server error (${error.response.status})`);
        }
      } else if (error.request) {
        // Request was made but no response received
        console.log('📡 No response received - possible CORS or network issue');
        setError('Cannot connect to server. Please check your internet connection.');
      } else {
        // Something else happened
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Join SafeReport</h2>
          <p style={styles.subtitle}>
            Create your account to start reporting incidents safely
          </p>
        </div>
        
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={styles.form}>
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
            <label style={styles.label}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your email address"
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
              placeholder="Enter your phone number (optional)"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Account Type *</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="user">Regular User</option>
              <option value="counselor">Counselor/Support Staff</option>
            </select>
            <small style={styles.helpText}>
              {formData.role === 'counselor' 
                ? 'Counselors can provide support and guidance to users' 
                : 'Regular users can report incidents and access support resources'}
            </small>
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
              placeholder="Create a password (min. 6 characters)"
              minLength="6"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Confirm your password"
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              ...(loading ? styles.submitButtonDisabled : {})
            }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div style={styles.switchContainer}>
          <p style={styles.switchText}>
            Already have an account? {' '}
            <Link to="/login" style={styles.switchLink}>
              Sign in here
            </Link>
          </p>
        </div>

        <div style={styles.privacyNotice}>
          <h4 style={styles.privacyTitle}>🔒 Your Privacy Matters</h4>
          <ul style={styles.privacyList}>
            <li>We never share your personal information without your consent</li>
            <li>All reports can be submitted anonymously</li>
            <li>Your data is encrypted and stored securely</li>
            <li>You control what information is shared</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ... styles remain the same (removed duplicate privacyList style)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem 1rem',
    backgroundColor: '#f8f9fa'
  },
  card: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px'
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
  submitButton: {
    width: '100%',
    backgroundColor: '#28a745',
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
    fontWeight: '600',
    textDecoration: 'none'
  },
  privacyNotice: {
    backgroundColor: '#e8f5e8',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #d4edda'
  },
  privacyTitle: {
    marginBottom: '1rem',
    color: '#155724',
    textAlign: 'center'
  },
  privacyList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    color: '#155724'
  }
};

// Remove the style injection to avoid issues
export default Register;