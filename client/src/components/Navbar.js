import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          SafeReport
        </Link>
        
        <div style={styles.navLinks}>
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                style={{
                  ...styles.navLink,
                  ...(location.pathname === '/dashboard' ? styles.activeLink : {})
                }}
              >
                Dashboard
              </Link>
              <Link 
                to="/report" 
                style={{
                  ...styles.navLink,
                  ...(location.pathname === '/report' ? styles.activeLink : {})
                }}
              >
                Report Incident
              </Link>
              <Link 
                to="/my-reports" 
                style={{
                  ...styles.navLink,
                  ...(location.pathname === '/my-reports' ? styles.activeLink : {})
                }}
              >
                My Reports
              </Link>
              
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  style={{
                    ...styles.navLink,
                    ...(location.pathname === '/admin' ? styles.activeLink : {})
                  }}
                >
                  Admin
                </Link>
              )}
              
              <span style={styles.userInfo}>Hello, {user.name}</span>
              <button onClick={onLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                style={{
                  ...styles.navLink,
                  ...(location.pathname === '/' ? styles.activeLink : {})
                }}
              >
                Home
              </Link>
              <Link to="/login" style={styles.navLink}>
                Login
              </Link>
              <Link to="/login" style={styles.getStartedBtn}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '1rem 0',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    transition: 'background-color 0.3s',
  },
  activeLink: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  userInfo: {
    margin: '0 10px',
    color: '#ecf0f1',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  getStartedBtn: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

// Add hover effects
const hoverStyles = `
  .navLink:hover {
    background-color: rgba(255,255,255,0.1);
  }
  .logoutBtn:hover {
    background-color: white;
    color: #2c3e50;
  }
  .getStartedBtn:hover {
    background-color: #0056b3;
  }
`;

// Inject styles
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(hoverStyles, styleSheet.cssRules.length);

export default Navbar;