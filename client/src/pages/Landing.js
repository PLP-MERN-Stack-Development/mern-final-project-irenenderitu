import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Navbar */}
      <nav style={{
        backgroundColor: '#2c3e50',
        padding: '1rem 0',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ 
            color: 'white', 
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
            fontWeight: 'bold'
          }}>
            SafeReport
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Link 
              to="/login" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                border: '1px solid white',
                borderRadius: '5px',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                whiteSpace: 'nowrap'
              }}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '8px 16px',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                whiteSpace: 'nowrap'
              }}
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 6vw, 3rem)', 
          marginBottom: '1rem',
          lineHeight: '1.2'
        }}>
          SafeReport
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', 
          marginBottom: '2rem', 
          maxWidth: '600px', 
          margin: '0 auto 2rem',
          lineHeight: '1.4'
        }}>
          A Safe, Anonymous Platform for Women to Report Harassment
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <Link 
            to="/login" 
            style={{
              backgroundColor: 'white',
              color: '#667eea',
              padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              fontWeight: 'bold',
              whiteSpace: 'nowrap'
            }}
          >
            Report Incident
          </Link>
          <Link 
            to="/login" 
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              border: '2px solid white',
              whiteSpace: 'nowrap'
            }}
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
          color: '#2c3e50',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          lineHeight: '1.3'
        }}>
          Why Choose SafeReport?
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)',
          marginBottom: '4rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>🛡️</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>100% Anonymous</h3>
            <p style={{ color: '#666', lineHeight: '1.6', flex: '1' }}>
              Report incidents without revealing your identity. Your personal information is never shared without your consent.
            </p>
            <Link 
              to="/register" 
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '5px',
                marginTop: '1rem',
                display: 'inline-block',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}
            >
              Get Started
            </Link>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>Secure & Private</h3>
            <p style={{ color: '#666', lineHeight: '1.6', flex: '1' }}>
              All data is encrypted and stored securely. We prioritize your privacy and safety above all else.
            </p>
            <Link 
              to="/login" 
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '5px',
                marginTop: '1rem',
                display: 'inline-block',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}
            >
              Learn More
            </Link>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>🤝</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>Support Network</h3>
            <p style={{ color: '#666', lineHeight: '1.6', flex: '1' }}>
              Connect with counselors, legal aid, and support organizations dedicated to helping you.
            </p>
            <Link 
              to="/register" 
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '5px',
                marginTop: '1rem',
                display: 'inline-block',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}
            >
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* Anonymous Reporting Section */}
      <section style={{ 
        backgroundColor: '#e8f5e8',
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
            color: '#2c3e50',
            marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
            lineHeight: '1.3'
          }}>
            Anonymous Reporting Features
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                backgroundColor: '#007bff', 
                color: 'white',
                width: 'clamp(50px, 8vw, 60px)',
                height: 'clamp(50px, 8vw, 60px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
              }}>👤</div>
              <h4 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>No Identity Required</h4>
              <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                Submit reports without providing any personal identification information
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                backgroundColor: '#28a745', 
                color: 'white',
                width: 'clamp(50px, 8vw, 60px)',
                height: 'clamp(50px, 8vw, 60px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
              }}>📱</div>
              <h4 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>Secure Platform</h4>
              <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                All communications are encrypted and your data is protected
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                backgroundColor: '#ffc107', 
                color: 'white',
                width: 'clamp(50px, 8vw, 60px)',
                height: 'clamp(50px, 8vw, 60px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
              }}>🗺️</div>
              <h4 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>Location Safety</h4>
              <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                Identify harassment hotspots to help improve community safety
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                backgroundColor: '#dc3545', 
                color: 'white',
                width: 'clamp(50px, 8vw, 60px)',
                height: 'clamp(50px, 8vw, 60px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
              }}>⚖️</div>
              <h4 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>Legal Support</h4>
              <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                Access to legal resources while maintaining your privacy
              </p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            <Link 
              to="/register" 
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}
            >
              Start Reporting Anonymously
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ 
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
          color: '#2c3e50',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          lineHeight: '1.3'
        }}>
          How It Works
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              backgroundColor: '#6f42c1',
              color: 'white',
              width: 'clamp(40px, 6vw, 50px)',
              height: 'clamp(40px, 6vw, 50px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontWeight: 'bold',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)'
            }}>1</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>Sign Up Securely</h4>
            <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
              Create an account with minimal information. Choose to remain anonymous.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              backgroundColor: '#6f42c1',
              color: 'white',
              width: 'clamp(40px, 6vw, 50px)',
              height: 'clamp(40px, 6vw, 50px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontWeight: 'bold',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)'
            }}>2</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>Report Incident</h4>
            <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
              Submit details about the harassment incident with optional evidence.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              backgroundColor: '#6f42c1',
              color: 'white',
              width: 'clamp(40px, 6vw, 50px)',
              height: 'clamp(40px, 6vw, 50px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontWeight: 'bold',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)'
            }}>3</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>Get Support</h4>
            <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
              Access resources and track your report status confidentially.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              backgroundColor: '#6f42c1',
              color: 'white',
              width: 'clamp(40px, 6vw, 50px)',
              height: 'clamp(40px, 6vw, 50px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontWeight: 'bold',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)'
            }}>4</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>Make Impact</h4>
            <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
              Help create safer communities by reporting incidents.
            </p>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
          <Link 
            to="/register" 
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              fontWeight: 'bold',
              whiteSpace: 'nowrap'
            }}
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Emergency Section */}
      <section style={{ 
        backgroundColor: '#fff3cd',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
        border: '1px solid #ffeaa7'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ 
            color: '#856404', 
            marginBottom: '1rem',
            fontSize: 'clamp(1.3rem, 3vw, 1.5rem)'
          }}>
            🆘 Need Immediate Help?
          </h3>
          <p style={{ 
            color: '#856404', 
            marginBottom: '2rem', 
            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
            lineHeight: '1.4'
          }}>
            If you're in immediate danger, please contact emergency services first.
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '5px',
              color: '#856404',
              fontWeight: 'bold',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)'
            }}>
              Police: 911
            </div>
            <div style={{ 
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '5px',
              color: '#856404',
              fontWeight: 'bold',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)'
            }}>
              Women Helpline: 
              07XX-144-144
            </div>
            <div style={{ 
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '5px',
              color: '#856404',
              fontWeight: 'bold',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)'
            }}>
              Crisis Text: Text HOME to 741741
            </div>
          </div>
          <Link 
            to="/login" 
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              fontWeight: 'bold',
              whiteSpace: 'nowrap'
            }}
          >
            Get Support Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>© 2024 SafeReport. Empowering women through safe reporting.</p>
        <p style={{ marginTop: '1rem', opacity: 0.8, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
          Your safety and privacy are our top priorities.
        </p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link 
            to="/login" 
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
            }}
          >
            Login
          </Link>
          <Link 
            to="/register" 
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
            }}
          >
            Register
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;