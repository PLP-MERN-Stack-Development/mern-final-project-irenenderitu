import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyReports = ({ user }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get('/reports/my-reports');
      setReports(res.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'under_review': return '#17a2b8';
      case 'resolved': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'under_review': return '🔍';
      case 'resolved': return '✅';
      default: return '📄';
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading your reports...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header with Back Button */}
      <div style={styles.header}>
        <Link to="/dashboard" style={styles.backButton}>
          <span style={styles.backIcon}>←</span>
          Back to Dashboard
        </Link>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>My Reports</h1>
          <p style={styles.subtitle}>Track the status of your submitted reports</p>
        </div>
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{reports.length}</span>
            <span style={styles.statLabel}>Total Reports</span>
          </div>
        </div>
      </div>

      {reports.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📋</div>
          <h3 style={styles.emptyTitle}>No reports submitted yet</h3>
          <p style={styles.emptyText}>When you submit a report, it will appear here.</p>
          <Link to="/report" style={styles.reportButton}>
            Submit Your First Report
          </Link>
        </div>
      ) : (
        <div style={styles.reportsGrid}>
          {reports.map(report => (
            <div key={report._id} style={styles.reportCard}>
              <div style={styles.cardHeader}>
                <div style={styles.reportInfo}>
                  <div style={styles.reportIcon}>
                    {getStatusIcon(report.status)}
                  </div>
                  <div>
                    <h3 style={styles.reportId}>Report #{report.reportId}</h3>
                    <span style={styles.reportDate}>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <span 
                  style={{
                    ...styles.status,
                    backgroundColor: getStatusColor(report.status)
                  }}
                >
                  {report.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <div style={styles.cardBody}>
                <div style={styles.detailGrid}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Type:</span>
                    <span style={styles.detailValue}>{report.incidentType}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Date:</span>
                    <span style={styles.detailValue}>
                      {new Date(report.dateTime).toLocaleString()}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Location:</span>
                    <span style={styles.detailValue}>
                      {report.location?.address || 'Not specified'}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Anonymous:</span>
                    <span style={styles.detailValue}>
                      {report.isAnonymous ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                <div style={styles.description}>
                  <span style={styles.detailLabel}>Description:</span>
                  <p style={styles.descriptionText}>
                    {report.description.length > 150 
                      ? `${report.description.substring(0, 150)}...` 
                      : report.description}
                  </p>
                </div>

                {report.evidence && report.evidence.length > 0 && (
                  <div style={styles.evidenceSection}>
                    <span style={styles.detailLabel}>Evidence:</span>
                    <div style={styles.evidenceList}>
                      {report.evidence.map((file, index) => (
                        <a 
                          key={index} 
                          href={`http://localhost:5000/${file}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={styles.evidenceLink}
                        >
                          <span style={styles.evidenceIcon}>📎</span>
                          Evidence {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div style={styles.cardFooter}>
                <span style={styles.footerText}>
                  Last updated: {new Date(report.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    '@media (min-width: 768px)': {
      padding: '2rem'
    }
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    color: '#666'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,123,255,0.3)',
    border: '2px solid #007bff',
    alignSelf: 'flex-start',
    '&:hover': {
      backgroundColor: '#0056b3',
      borderColor: '#0056b3',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,123,255,0.4)'
    }
  },
  backIcon: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  headerContent: {
    flex: 1,
    textAlign: 'center',
    '@media (min-width: 768px)': {
      textAlign: 'left'
    }
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#2c3e50',
    margin: '0 0 0.5rem 0',
    '@media (min-width: 768px)': {
      fontSize: '2.5rem'
    }
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#6c757d',
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '1rem'
    }
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    '@media (min-width: 768px)': {
      justifyContent: 'flex-end'
    }
  },
  statItem: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    minWidth: '120px'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '0.25rem',
    display: 'block'
  },
  statLabel: {
    color: '#6c757d',
    fontWeight: '500',
    fontSize: '0.9rem'
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#666',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem'
  },
  emptyTitle: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '1rem'
  },
  emptyText: {
    fontSize: '1.1rem',
    marginBottom: '2rem'
  },
  reportButton: {
    display: 'inline-block',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#0056b3'
    }
  },
  reportsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #f1f3f4'
  },
  reportInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    flex: 1
  },
  reportIcon: {
    fontSize: '1.5rem',
    marginTop: '0.25rem'
  },
  reportId: {
    margin: '0 0 0.25rem 0',
    color: '#2c3e50',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  reportDate: {
    color: '#6c757d',
    fontSize: '0.85rem'
  },
  status: {
    padding: '6px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  cardBody: {
    flex: 1,
    marginBottom: '1rem'
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.75rem',
    marginBottom: '1rem'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detailLabel: {
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '0.9rem'
  },
  detailValue: {
    color: '#666',
    fontSize: '0.9rem',
    textAlign: 'right'
  },
  description: {
    marginBottom: '1rem'
  },
  descriptionText: {
    color: '#666',
    fontSize: '0.9rem',
    lineHeight: '1.4',
    margin: '0.5rem 0 0 0'
  },
  evidenceSection: {
    marginTop: '1rem'
  },
  evidenceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '0.5rem'
  },
  evidenceLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '8px 12px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '6px',
    textDecoration: 'none',
    color: '#495057',
    fontSize: '0.85rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#e9ecef',
      borderColor: '#007bff'
    }
  },
  evidenceIcon: {
    fontSize: '0.9rem'
  },
  cardFooter: {
    borderTop: '1px solid #f1f3f4',
    paddingTop: '1rem',
    marginTop: 'auto'
  },
  footerText: {
    color: '#6c757d',
    fontSize: '0.8rem'
  }
};

// Add CSS animations
const additionalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = additionalStyles;
  document.head.appendChild(style);
}

export default MyReports;