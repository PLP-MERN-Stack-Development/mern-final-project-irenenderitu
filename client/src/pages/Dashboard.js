// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Dashboard = ({ user }) => {
//   const [reportsCount, setReportsCount] = useState(0);
//   const [pendingCount, setPendingCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUserReports();
//   }, []);

//   const fetchUserReports = async () => {
//     try {
//       const res = await axios.get('/reports/my-reports');
//       const reports = res.data;
//       setReportsCount(reports.length);
//       setPendingCount(reports.filter(report => report.status === 'pending').length);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     // Clear local storage
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
    
//     // Clear axios headers
//     delete axios.defaults.headers.common['Authorization'];
    
//     // Redirect to landing page
//     navigate('/');
    
//     // Optional: Show logout message
//     alert('You have been logged out successfully.');
//   };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 18) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header Section */}
//       <div style={styles.header}>
//         <div style={styles.welcomeSection}>
//           <h1 style={styles.greeting}>
//             {getGreeting()}, <span style={styles.userName}>{user.name}!</span>
//           </h1>
//           <p style={styles.subtitle}>Your safety and well-being are our top priority</p>
//         </div>
//         <div style={styles.headerRight}>
//           <div style={styles.statsOverview}>
//             <div style={styles.statItem}>
//               <div style={styles.statNumber}>{reportsCount}</div>
//               <div style={styles.statLabel}>Total Reports</div>
//             </div>
//             <div style={styles.statItem}>
//               <div style={styles.statNumber}>{pendingCount}</div>
//               <div style={styles.statLabel}>Pending</div>
//             </div>
//           </div>
//           <button 
//             onClick={handleLogout}
//             style={styles.logoutButton}
//           >
//             🚪 Logout
//           </button>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div style={styles.section}>
//         <h2 style={styles.sectionTitle}>Quick Actions</h2>
//         <div style={styles.quickActions}>
//           <Link to="/report" style={styles.actionCard}>
//             <div style={styles.actionIcon}>📝</div>
//             <div style={styles.actionContent}>
//               <h3 style={styles.actionTitle}>Report Incident</h3>
//               <p style={styles.actionDescription}>
//                 Submit a new harassment incident report safely and anonymously
//               </p>
//             </div>
//             <div style={styles.actionArrow}>→</div>
//           </Link>

//           <Link to="/my-reports" style={styles.actionCard}>
//             <div style={styles.actionIcon}>📊</div>
//             <div style={styles.actionContent}>
//               <h3 style={styles.actionTitle}>My Reports</h3>
//               <p style={styles.actionDescription}>
//                 View and track the status of your submitted reports
//               </p>
//             </div>
//             <div style={styles.actionArrow}>→</div>
//           </Link>

//           {user.role === 'admin' && (
//             <Link to="/admin" style={styles.actionCard}>
//               <div style={styles.actionIcon}>⚙️</div>
//               <div style={styles.actionContent}>
//                 <h3 style={styles.actionTitle}>Admin Panel</h3>
//                 <p style={styles.actionDescription}>
//                   Manage all reports, users, and system administration
//                 </p>
//               </div>
//               <div style={styles.actionArrow}>→</div>
//             </Link>
//           )}

//           {user.role === 'counselor' && (
//             <Link to="/counselor" style={styles.actionCard}>
//               <div style={styles.actionIcon}>🤝</div>
//               <div style={styles.actionContent}>
//                 <h3 style={styles.actionTitle}>Counselor Panel</h3>
//                 <p style={styles.actionDescription}>
//                   Provide support and guidance to users in need
//                 </p>
//               </div>
//               <div style={styles.actionArrow}>→</div>
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Safety Resources */}
//       <div style={styles.resourcesGrid}>
//         <div style={styles.resourceCard}>
//           <div style={styles.resourceHeader}>
//             <div style={styles.resourceIcon}>🛡️</div>
//             <h3 style={styles.resourceTitle}>Safety Tips</h3>
//           </div>
//           <ul style={styles.tipsList}>
//             <li style={styles.tipItem}>
//               <span style={styles.tipBullet}>•</span>
//               Trust your instincts and remove yourself from uncomfortable situations
//             </li>
//             <li style={styles.tipItem}>
//               <span style={styles.tipBullet}>•</span>
//               Be aware of your surroundings and have an exit plan
//             </li>
//             <li style={styles.tipItem}>
//               <span style={styles.tipBullet}>•</span>
//               Share your location with trusted contacts when traveling
//             </li>
//             <li style={styles.tipItem}>
//               <span style={styles.tipBullet}>•</span>
//               Use well-lit and populated areas, especially at night
//             </li>
//           </ul>
//         </div>

//         <div style={styles.resourceCard}>
//           <div style={styles.resourceHeader}>
//             <div style={styles.resourceIcon}>🚨</div>
//             <h3 style={styles.resourceTitle}>Emergency Contacts</h3>
//           </div>
//           <div style={styles.emergencyContacts}>
//             <div style={styles.contactItem}>
//               <div style={styles.contactIcon}>🚓</div>
//               <div style={styles.contactInfo}>
//                 <div style={styles.contactName}>Police Emergency</div>
//                 <div style={styles.contactNumber}>911 / 100</div>
//               </div>
//             </div>
//             <div style={styles.contactItem}>
//               <div style={styles.contactIcon}>👩‍💼</div>
//               <div style={styles.contactInfo}>
//                 <div style={styles.contactName}>Women Helpline</div>
//                 <div style={styles.contactNumber}>1091 / 1-800-799-7233</div>
//               </div>
//             </div>
//             <div style={styles.contactItem}>
//               <div style={styles.contactIcon}>🏥</div>
//               <div style={styles.contactInfo}>
//                 <div style={styles.contactName}>Emergency Services</div>
//                 <div style={styles.contactNumber}>112</div>
//               </div>
//             </div>
//             <div style={styles.contactItem}>
//               <div style={styles.contactIcon}>💬</div>
//               <div style={styles.contactInfo}>
//                 <div style={styles.contactName}>Crisis Text Line</div>
//                 <div style={styles.contactNumber}>Text HOME to 741741</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div style={styles.resourceCard}>
//           <div style={styles.resourceHeader}>
//             <div style={styles.resourceIcon}>📚</div>
//             <h3 style={styles.resourceTitle}>Resources</h3>
//           </div>
//           <div style={styles.resourcesList}>
//             <div style={styles.resourceItem}>
//               <strong>Legal Rights:</strong> Know your rights against harassment
//             </div>
//             <div style={styles.resourceItem}>
//               <strong>Support Groups:</strong> Connect with survivors and counselors
//             </div>
//             <div style={styles.resourceItem}>
//               <strong>Self-Defense:</strong> Basic techniques and awareness training
//             </div>
//             <div style={styles.resourceItem}>
//               <strong>Mental Health:</strong> Professional counseling services available
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity (Placeholder) */}
//       <div style={styles.section}>
//         <h2 style={styles.sectionTitle}>Your Safety Network</h2>
//         <div style={styles.networkGrid}>
//           <div style={styles.networkItem}>
//             <div style={styles.networkIcon}>🔒</div>
//             <div style={styles.networkContent}>
//               <h4 style={styles.networkTitle}>24/7 Support</h4>
//               <p style={styles.networkDescription}>
//                 Round-the-clock access to counselors and support staff
//               </p>
//             </div>
//           </div>
//           <div style={styles.networkItem}>
//             <div style={styles.networkIcon}>🤝</div>
//             <div style={styles.networkContent}>
//               <h4 style={styles.networkTitle}>Community</h4>
//               <p style={styles.networkDescription}>
//                 Connect with others who understand your experience
//               </p>
//             </div>
//           </div>
//           <div style={styles.networkItem}>
//             <div style={styles.networkIcon}>⚖️</div>
//             <div style={styles.networkContent}>
//               <h4 style={styles.networkTitle}>Legal Aid</h4>
//               <p style={styles.networkDescription}>
//                 Access to legal resources and guidance
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '2rem',
//     maxWidth: '1200px',
//     margin: '0 auto',
//     backgroundColor: '#f8f9fa',
//     minHeight: '100vh'
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '3rem',
//     gap: '2rem'
//   },
//   welcomeSection: {
//     flex: 1
//   },
//   greeting: {
//     fontSize: '2.5rem',
//     fontWeight: '300',
//     color: '#2c3e50',
//     marginBottom: '0.5rem'
//   },
//   userName: {
//     fontWeight: '600',
//     color: '#007bff'
//   },
//   subtitle: {
//     fontSize: '1.2rem',
//     color: '#6c757d',
//     margin: 0
//   },
//   headerRight: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-end',
//     gap: '1rem'
//   },
//   statsOverview: {
//     display: 'flex',
//     gap: '2rem'
//   },
//   statItem: {
//     textAlign: 'center',
//     padding: '1.5rem',
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     minWidth: '120px'
//   },
//   statNumber: {
//     fontSize: '2.5rem',
//     fontWeight: 'bold',
//     color: '#007bff',
//     marginBottom: '0.5rem'
//   },
//   statLabel: {
//     color: '#6c757d',
//     fontWeight: '500'
//   },
//   logoutButton: {
//     padding: '12px 24px',
//     backgroundColor: '#dc3545',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '1rem',
//     fontWeight: '500',
//     transition: 'background-color 0.3s',
//     whiteSpace: 'nowrap'
//   },
//   section: {
//     marginBottom: '3rem'
//   },
//   sectionTitle: {
//     fontSize: '1.8rem',
//     color: '#2c3e50',
//     marginBottom: '1.5rem',
//     fontWeight: '600'
//   },
//   quickActions: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
//     gap: '1.5rem'
//   },
//   actionCard: {
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: '1.5rem',
//     borderRadius: '12px',
//     textDecoration: 'none',
//     color: 'inherit',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     transition: 'all 0.3s ease',
//     border: '1px solid transparent'
//   },
//   actionIcon: {
//     fontSize: '2rem',
//     marginRight: '1rem'
//   },
//   actionContent: {
//     flex: 1
//   },
//   actionTitle: {
//     fontSize: '1.3rem',
//     color: '#2c3e50',
//     margin: '0 0 0.5rem 0',
//     fontWeight: '600'
//   },
//   actionDescription: {
//     color: '#6c757d',
//     margin: 0,
//     lineHeight: '1.5'
//   },
//   actionArrow: {
//     fontSize: '1.5rem',
//     color: '#007bff',
//     fontWeight: 'bold'
//   },
//   resourcesGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//     gap: '1.5rem',
//     marginBottom: '3rem'
//   },
//   resourceCard: {
//     backgroundColor: 'white',
//     padding: '2rem',
//     borderRadius: '12px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//   },
//   resourceHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '1.5rem'
//   },
//   resourceIcon: {
//     fontSize: '2rem',
//     marginRight: '1rem'
//   },
//   resourceTitle: {
//     fontSize: '1.4rem',
//     color: '#2c3e50',
//     margin: 0,
//     fontWeight: '600'
//   },
//   tipsList: {
//     listStyle: 'none',
//     padding: 0,
//     margin: 0
//   },
//   tipItem: {
//     padding: '0.75rem 0',
//     borderBottom: '1px solid #f1f3f4',
//     display: 'flex',
//     alignItems: 'flex-start'
//   },
//   tipBullet: {
//     color: '#007bff',
//     marginRight: '0.75rem',
//     fontWeight: 'bold'
//   },
//   emergencyContacts: {
//     space: '1rem'
//   },
//   contactItem: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: '1rem 0',
//     borderBottom: '1px solid #f1f3f4'
//   },
//   contactIcon: {
//     fontSize: '1.5rem',
//     marginRight: '1rem'
//   },
//   contactInfo: {
//     flex: 1
//   },
//   contactName: {
//     fontWeight: '600',
//     color: '#2c3e50',
//     marginBottom: '0.25rem'
//   },
//   contactNumber: {
//     color: '#007bff',
//     fontWeight: '500'
//   },
//   resourcesList: {
//     marginBottom: '1.5rem'
//   },
//   resourceItem: {
//     padding: '0.75rem 0',
//     borderBottom: '1px solid #f1f3f4',
//     color: '#555'
//   },
//   resourceButton: {
//     width: '100%',
//     padding: '12px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '1rem',
//     fontWeight: '500',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s'
//   },
//   networkGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//     gap: '1.5rem'
//   },
//   networkItem: {
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: '1.5rem',
//     borderRadius: '12px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//   },
//   networkIcon: {
//     fontSize: '2rem',
//     marginRight: '1rem'
//   },
//   networkContent: {
//     flex: 1
//   },
//   networkTitle: {
//     fontSize: '1.2rem',
//     color: '#2c3e50',
//     margin: '0 0 0.5rem 0',
//     fontWeight: '600'
//   },
//   networkDescription: {
//     color: '#6c757d',
//     margin: 0,
//     lineHeight: '1.5'
//   }
// };

// // Add CSS for responsiveness
// const responsiveStyles = `
//   @media (max-width: 1024px) {
//     .header {
//       flex-direction: column;
//       gap: 1.5rem;
//     }
    
//     .headerRight {
//       align-items: flex-start;
//       width: 100%;
//     }
    
//     .statsOverview {
//       width: 100%;
//       justify-content: space-between;
//     }
    
//     .statItem {
//       flex: 1;
//       min-width: auto;
//     }
//   }
  
//   @media (max-width: 768px) {
//     .container {
//       padding: 1rem;
//     }
    
//     .greeting {
//       font-size: 2rem;
//       text-align: center;
//     }
    
//     .subtitle {
//       font-size: 1rem;
//       text-align: center;
//     }
    
//     .header {
//       margin-bottom: 2rem;
//     }
    
//     .section {
//       margin-bottom: 2rem;
//     }
    
//     .sectionTitle {
//       font-size: 1.5rem;
//       text-align: center;
//       margin-bottom: 1rem;
//     }
    
//     .quickActions {
//       grid-template-columns: 1fr;
//       gap: 1rem;
//     }
    
//     .actionCard {
//       padding: 1.25rem;
//     }
    
//     .actionIcon {
//       font-size: 1.75rem;
//       margin-right: 0.75rem;
//     }
    
//     .actionTitle {
//       font-size: 1.1rem;
//     }
    
//     .actionDescription {
//       font-size: 0.9rem;
//     }
    
//     .resourcesGrid {
//       grid-template-columns: 1fr;
//       gap: 1rem;
//       margin-bottom: 2rem;
//     }
    
//     .resourceCard {
//       padding: 1.5rem;
//     }
    
//     .networkGrid {
//       grid-template-columns: 1fr;
//       gap: 1rem;
//     }
    
//     .networkItem {
//       padding: 1.25rem;
//     }
    
//     .statItem {
//       padding: 1rem;
//     }
    
//     .statNumber {
//       font-size: 2rem;
//     }
    
//     .logoutButton {
//       width: 100%;
//       max-width: 200px;
//     }
//   }
  
//   @media (max-width: 480px) {
//     .statsOverview {
//       flex-direction: column;
//       gap: 1rem;
//     }
    
//     .statItem {
//       width: 100%;
//     }
    
//     .headerRight {
//       align-items: center;
//     }
//   }

//   .actionCard:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.15);
//     border-color: #007bff;
//   }
  
//   .logoutButton:hover {
//     background-color: #c82333;
//   }
// `;

// // Inject styles
// if (typeof document !== 'undefined') {
//   const style = document.createElement('style');
//   style.textContent = responsiveStyles;
//   document.head.appendChild(style);
// }

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [reportsCount, setReportsCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserReports();
  }, []);

  const fetchUserReports = async () => {
    try {
      const res = await axios.get('/reports/my-reports');
      const reports = res.data;
      setReportsCount(reports.length);
      setPendingCount(reports.filter(report => report.status === 'pending').length);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
    alert('You have been logged out successfully.');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.welcomeSection}>
          <h1 style={styles.greeting}>
            {getGreeting()}, <span style={styles.userName}>{user.name}!</span>
          </h1>
          <p style={styles.subtitle}>Your safety and well-being are our top priority</p>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.statsOverview}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{reportsCount}</div>
              <div style={styles.statLabel}>Total Reports</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{pendingCount}</div>
              <div style={styles.statLabel}>Pending</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.quickActions}>
          <Link to="/report" style={styles.actionCard}>
            <div style={styles.actionIcon}>📝</div>
            <div style={styles.actionContent}>
              <h3 style={styles.actionTitle}>Report Incident</h3>
              <p style={styles.actionDescription}>
                Submit a new harassment incident report safely and anonymously
              </p>
            </div>
            <div style={styles.actionArrow}>→</div>
          </Link>

          <Link to="/my-reports" style={styles.actionCard}>
            <div style={styles.actionIcon}>📊</div>
            <div style={styles.actionContent}>
              <h3 style={styles.actionTitle}>My Reports</h3>
              <p style={styles.actionDescription}>
                View and track the status of your submitted reports
              </p>
            </div>
            <div style={styles.actionArrow}>→</div>
          </Link>

          {user.role === 'admin' && (
            <Link to="/admin" style={styles.actionCard}>
              <div style={styles.actionIcon}>⚙️</div>
              <div style={styles.actionContent}>
                <h3 style={styles.actionTitle}>Admin Panel</h3>
                <p style={styles.actionDescription}>
                  Manage all reports, users, and system administration
                </p>
              </div>
              <div style={styles.actionArrow}>→</div>
            </Link>
          )}

          {user.role === 'counselor' && (
            <Link to="/counselor" style={styles.actionCard}>
              <div style={styles.actionIcon}>🤝</div>
              <div style={styles.actionContent}>
                <h3 style={styles.actionTitle}>Counselor Panel</h3>
                <p style={styles.actionDescription}>
                  Provide support and guidance to users in need
                </p>
              </div>
              <div style={styles.actionArrow}>→</div>
            </Link>
          )}
        </div>
      </div>

      {/* Safety Resources */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Safety Resources</h2>
        <div style={styles.resourcesGrid}>
          <div style={styles.resourceCard}>
            <div style={styles.resourceHeader}>
              <div style={styles.resourceIcon}>🛡️</div>
              <h3 style={styles.resourceTitle}>Safety Tips</h3>
            </div>
            <ul style={styles.tipsList}>
              <li style={styles.tipItem}>
                <span style={styles.tipBullet}>•</span>
                Trust your instincts and remove yourself from uncomfortable situations
              </li>
              <li style={styles.tipItem}>
                <span style={styles.tipBullet}>•</span>
                Be aware of your surroundings and have an exit plan
              </li>
              <li style={styles.tipItem}>
                <span style={styles.tipBullet}>•</span>
                Share your location with trusted contacts when traveling
              </li>
              <li style={styles.tipItem}>
                <span style={styles.tipBullet}>•</span>
                Use well-lit and populated areas, especially at night
              </li>
            </ul>
          </div>

          <div style={styles.resourceCard}>
            <div style={styles.resourceHeader}>
              <div style={styles.resourceIcon}>🚨</div>
              <h3 style={styles.resourceTitle}>Emergency Contacts</h3>
            </div>
            <div style={styles.emergencyContacts}>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>🚓</div>
                <div style={styles.contactInfo}>
                  <div style={styles.contactName}>Police Emergency</div>
                  <div style={styles.contactNumber}>911 / 100</div>
                </div>
              </div>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>👩‍💼</div>
                <div style={styles.contactInfo}>
                  <div style={styles.contactName}>Women Helpline</div>
                  <div style={styles.contactNumber}>1091 / 1-800-799-7233</div>
                </div>
              </div>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>🏥</div>
                <div style={styles.contactInfo}>
                  <div style={styles.contactName}>Emergency Services</div>
                  <div style={styles.contactNumber}>112</div>
                </div>
              </div>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>💬</div>
                <div style={styles.contactInfo}>
                  <div style={styles.contactName}>Crisis Text Line</div>
                  <div style={styles.contactNumber}>Text HOME to 741741</div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.resourceCard}>
            <div style={styles.resourceHeader}>
              <div style={styles.resourceIcon}>📚</div>
              <h3 style={styles.resourceTitle}>Resources</h3>
            </div>
            <div style={styles.resourcesList}>
              <div style={styles.resourceItem}>
                <strong>Legal Rights:</strong> Know your rights against harassment
              </div>
              <div style={styles.resourceItem}>
                <strong>Support Groups:</strong> Connect with survivors and counselors
              </div>
              <div style={styles.resourceItem}>
                <strong>Self-Defense:</strong> Basic techniques and awareness training
              </div>
              <div style={styles.resourceItem}>
                <strong>Mental Health:</strong> Professional counseling services available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Network */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Your Safety Network</h2>
        <div style={styles.networkGrid}>
          <div style={styles.networkItem}>
            <div style={styles.networkIcon}>🔒</div>
            <div style={styles.networkContent}>
              <h4 style={styles.networkTitle}>24/7 Support</h4>
              <p style={styles.networkDescription}>
                Round-the-clock access to counselors and support staff
              </p>
            </div>
          </div>
          <div style={styles.networkItem}>
            <div style={styles.networkIcon}>🤝</div>
            <div style={styles.networkContent}>
              <h4 style={styles.networkTitle}>Community</h4>
              <p style={styles.networkDescription}>
                Connect with others who understand your experience
              </p>
            </div>
          </div>
          <div style={styles.networkItem}>
            <div style={styles.networkIcon}>⚖️</div>
            <div style={styles.networkContent}>
              <h4 style={styles.networkTitle}>Legal Aid</h4>
              <p style={styles.networkDescription}>
                Access to legal resources and guidance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  welcomeSection: {
    textAlign: 'center'
  },
  greeting: {
    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
    fontWeight: '300',
    color: '#2c3e50',
    marginBottom: '0.5rem',
    lineHeight: '1.2'
  },
  userName: {
    fontWeight: '600',
    color: '#007bff',
    display: 'block'
  },
  subtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    color: '#6c757d',
    margin: 0
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    width: '100%'
  },
  statsOverview: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap'
  },
  statItem: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    minWidth: '100px',
    flex: '1',
    maxWidth: '150px'
  },
  statNumber: {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '0.5rem'
  },
  statLabel: {
    color: '#6c757d',
    fontWeight: '500',
    fontSize: '0.9rem'
  },
  logoutButton: {
    padding: '12px 24px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    width: '100%',
    maxWidth: '200px'
  },
  section: {
    marginBottom: '2rem',
    padding: '0 0.5rem'
  },
  sectionTitle: {
    fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    fontWeight: '600',
    textAlign: 'center'
  },
  quickActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
    gap: '1rem'
  },
  actionCard: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '1.25rem',
    borderRadius: '12px',
    textDecoration: 'none',
    color: 'inherit',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    border: '1px solid transparent',
    minHeight: '100px'
  },
  actionIcon: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    marginRight: '1rem',
    flexShrink: 0
  },
  actionContent: {
    flex: 1
  },
  actionTitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
    color: '#2c3e50',
    margin: '0 0 0.5rem 0',
    fontWeight: '600'
  },
  actionDescription: {
    color: '#6c757d',
    margin: 0,
    lineHeight: '1.5',
    fontSize: '0.9rem'
  },
  actionArrow: {
    fontSize: '1.5rem',
    color: '#007bff',
    fontWeight: 'bold',
    flexShrink: 0
  },
  resourcesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
    gap: '1rem'
  },
  resourceCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    height: '100%'
  },
  resourceHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  resourceIcon: {
    fontSize: '1.5rem',
    marginRight: '1rem',
    flexShrink: 0
  },
  resourceTitle: {
    fontSize: '1.2rem',
    color: '#2c3e50',
    margin: 0,
    fontWeight: '600'
  },
  tipsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  tipItem: {
    padding: '0.75rem 0',
    borderBottom: '1px solid #f1f3f4',
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: '0.9rem',
    lineHeight: '1.4'
  },
  tipBullet: {
    color: '#007bff',
    marginRight: '0.75rem',
    fontWeight: 'bold',
    flexShrink: 0
  },
  emergencyContacts: {
    spaceY: '1rem'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
    borderBottom: '1px solid #f1f3f4'
  },
  contactIcon: {
    fontSize: '1.25rem',
    marginRight: '1rem',
    flexShrink: 0
  },
  contactInfo: {
    flex: 1
  },
  contactName: {
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '0.25rem',
    fontSize: '0.95rem'
  },
  contactNumber: {
    color: '#007bff',
    fontWeight: '500',
    fontSize: '0.9rem'
  },
  resourcesList: {
    marginBottom: '1.5rem'
  },
  resourceItem: {
    padding: '0.75rem 0',
    borderBottom: '1px solid #f1f3f4',
    color: '#555',
    fontSize: '0.9rem',
    lineHeight: '1.4'
  },
  networkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
    gap: '1rem'
  },
  networkItem: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: '1.25rem',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    minHeight: '100px'
  },
  networkIcon: {
    fontSize: '1.5rem',
    marginRight: '1rem',
    flexShrink: 0,
    marginTop: '0.25rem'
  },
  networkContent: {
    flex: 1
  },
  networkTitle: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    margin: '0 0 0.5rem 0',
    fontWeight: '600'
  },
  networkDescription: {
    color: '#6c757d',
    margin: 0,
    lineHeight: '1.5',
    fontSize: '0.9rem'
  }
};

// Add hover effects and responsive behavior
const responsiveStyles = `
  .actionCard:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    border-color: #007bff;
  }
  
  .logoutButton:hover {
    background-color: #c82333;
  }
  
  @media (min-width: 768px) {
    .header {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      text-align: left;
    }
    
    .welcomeSection {
      text-align: left;
    }
    
    .headerRight {
      align-items: flex-end;
      width: auto;
    }
    
    .statsOverview {
      justify-content: flex-end;
      width: auto;
    }
    
    .statItem {
      min-width: 120px;
    }
    
    .logoutButton {
      width: auto;
    }
    
    .userName {
      display: inline;
    }
  }
  
  @media (min-width: 1024px) {
    .container {
      padding: '2rem';
    }
    
    .header {
      margin-bottom: '3rem';
    }
    
    .section {
      margin-bottom: '3rem';
      padding: 0;
    }
    
    .quickActions {
      gap: '1.5rem';
    }
    
    .actionCard {
      padding: '1.5rem';
    }
    
    .resourcesGrid {
      gap: '1.5rem';
    }
    
    .resourceCard {
      padding: '2rem';
    }
    
    .networkGrid {
      gap: '1.5rem';
    }
    
    .networkItem {
      padding: '1.5rem';
    }
  }
  
  @media (max-width: 480px) {
    .actionCard {
      flex-direction: column;
      text-align: center;
      gap: 0.75rem;
    }
    
    .actionIcon {
      margin-right: 0;
      margin-bottom: 0.5rem;
    }
    
    .contactItem {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
    
    .contactIcon {
      margin-right: 0;
    }
    
    .resourceHeader {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
    
    .resourceIcon {
      margin-right: 0;
    }
    
    .networkItem {
      flex-direction: column;
      text-align: center;
      gap: 0.75rem;
    }
    
    .networkIcon {
      margin-right: 0;
      margin-top: 0;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}

export default Dashboard;