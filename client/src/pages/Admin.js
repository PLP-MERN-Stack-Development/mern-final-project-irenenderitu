import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    underReview: 0,
    resolved: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get('/reports');
      setReports(res.data);
      calculateStats(res.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      try {
        const res = await axios.get('/reports');
        setReports(res.data);
        calculateStats(res.data);
      } catch (secondError) {
        console.error('Error with second attempt:', secondError);
        alert('Error fetching reports: ' + (secondError.response?.data?.message || 'Please check if the backend is running'));
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reportsData) => {
    const stats = {
      total: reportsData.length,
      pending: reportsData.filter(r => r.status === 'pending').length,
      underReview: reportsData.filter(r => r.status === 'under_review').length,
      resolved: reportsData.filter(r => r.status === 'resolved').length
    };
    setStats(stats);
  };

  const updateReportStatus = async (reportId, newStatus) => {
    try {
      await axios.patch(`/reports/${reportId}/status`, { status: newStatus });
      
      const updatedReports = reports.map(report => 
        report._id === reportId ? { ...report, status: newStatus } : report
      );
      
      setReports(updatedReports);
      calculateStats(updatedReports);
      
      if (selectedReport && selectedReport._id === reportId) {
        setSelectedReport({ ...selectedReport, status: newStatus });
      }
      
      alert('Report status updated successfully!');
    } catch (error) {
      alert('Error updating report status: ' + (error.response?.data?.message || 'Something went wrong'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
    alert('You have been logged out successfully.');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'under_review': return '#17a2b8';
      case 'resolved': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'PENDING';
      case 'under_review': return 'UNDER REVIEW';
      case 'resolved': return 'RESOLVED';
      default: return status?.toUpperCase() || 'UNKNOWN';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (reports.length > 0) {
      console.log('Reports data:', reports);
    }
  }, [reports]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>Manage and process all user reports</p>
        </div>
        <div style={styles.headerActions}>
          <button 
            onClick={fetchReports}
            style={styles.refreshButton}
          >
            🔄 Refresh
          </button>
          <button 
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <div style={styles.statInfo}>
            <div style={styles.statNumber}>{stats.total}</div>
            <div style={styles.statLabel}>Total Reports</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⏳</div>
          <div style={styles.statInfo}>
            <div style={styles.statNumber}>{stats.pending}</div>
            <div style={styles.statLabel}>Pending</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🔍</div>
          <div style={styles.statInfo}>
            <div style={styles.statNumber}>{stats.underReview}</div>
            <div style={styles.statLabel}>Under Review</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div style={styles.statInfo}>
            <div style={styles.statNumber}>{stats.resolved}</div>
            <div style={styles.statLabel}>Resolved</div>
          </div>
        </div>
      </div>

      {/* Main Content - Single Column Layout */}
      <div style={styles.content}>
        <div style={styles.reportsSection}>
          <h2 style={styles.sectionTitle}>All User Reports ({reports.length})</h2>
          
          {reports.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📋</div>
              <h3>No reports found</h3>
              <p>There are no reports in the system yet.</p>
              <button onClick={fetchReports} style={styles.retryButton}>
                🔄 Try Again
              </button>
            </div>
          ) : (
            <div style={styles.reportsList}>
              {/* Selection Prompt */}
              {!selectedReport && (
                <div style={styles.selectionPrompt}>
                  <div style={styles.selectionIcon}>📋</div>
                  <h3>Select a Report</h3>
                  <p>Click on a report from the list to view details and update its status.</p>
                </div>
              )}

              {/* Reports List with Expandable Details */}
              {reports.map(report => (
                <div key={report._id}>
                  {/* Report Summary Item */}
                  <div 
                    style={{
                      ...styles.reportItem,
                      ...(selectedReport?._id === report._id ? styles.selectedReport : {})
                    }}
                    onClick={() => setSelectedReport(selectedReport?._id === report._id ? null : report)}
                  >
                    <div style={styles.reportHeader}>
                      <div style={styles.reportBasicInfo}>
                        <h4 style={styles.reportId}>
                          {report.reportId ? `Report #${report.reportId}` : `Report ${report._id?.slice(-6) || 'N/A'}`}
                        </h4>
                        <span style={styles.reportDate}>
                          {formatDate(report.createdAt)}
                        </span>
                      </div>
                      <div style={styles.statusSection}>
                        <span 
                          style={{
                            ...styles.statusBadge,
                            backgroundColor: getStatusColor(report.status)
                          }}
                        >
                          {getStatusText(report.status)}
                        </span>
                        <div style={styles.expandIcon}>
                          {selectedReport?._id === report._id ? '▼' : '▶'}
                        </div>
                      </div>
                    </div>
                    
                    <div style={styles.reportPreview}>
                      <p style={styles.incidentType}>
                        <strong>Type:</strong> {report.incidentType ? report.incidentType.replace(/_/g, ' ').toUpperCase() : 'Not specified'}
                      </p>
                      <p style={styles.reportDescription}>
                        {report.description && report.description.length > 100 
                          ? `${report.description.substring(0, 100)}...` 
                          : report.description || 'No description provided'}
                      </p>
                      <div style={styles.reportMeta}>
                        <span style={styles.metaItem}>
                          👤 {report.isAnonymous ? 'Anonymous' : (report.user?.name || report.userId?.name || 'User')}
                        </span>
                        <span style={styles.metaItem}>
                          📍 {report.location?.address || report.location || 'Location not specified'}
                        </span>
                        {report.evidence && report.evidence.length > 0 && (
                          <span style={styles.metaItem}>
                            📎 {report.evidence.length} file(s)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Report Details - Expanded under the selected report */}
                  {selectedReport?._id === report._id && (
                    <div style={styles.reportDetails}>
                      {/* Status Update Section */}
                      <div style={styles.actionSection}>
                        <h3 style={styles.sectionSubtitle}>Update Status</h3>
                        <div style={styles.statusButtons}>
                          <button
                            onClick={() => updateReportStatus(selectedReport._id, 'pending')}
                            style={{
                              ...styles.statusButton,
                              ...(selectedReport.status === 'pending' ? styles.statusButtonActive : {})
                            }}
                          >
                            ⏳ Pending
                          </button>
                          <button
                            onClick={() => updateReportStatus(selectedReport._id, 'under_review')}
                            style={{
                              ...styles.statusButton,
                              ...(selectedReport.status === 'under_review' ? styles.statusButtonActive : {})
                            }}
                          >
                            🔍 Under Review
                          </button>
                          <button
                            onClick={() => updateReportStatus(selectedReport._id, 'resolved')}
                            style={{
                              ...styles.statusButton,
                              ...(selectedReport.status === 'resolved' ? styles.statusButtonActive : {})
                            }}
                          >
                            ✅ Resolved
                          </button>
                        </div>
                      </div>

                      {/* Report Details */}
                      <div style={styles.detailSection}>
                        <h3 style={styles.sectionSubtitle}>Report Details</h3>
                        <div style={styles.detailGrid}>
                          <div style={styles.detailItem}>
                            <strong>Report ID:</strong> {selectedReport.reportId ? `#${selectedReport.reportId}` : selectedReport._id?.slice(-6) || 'N/A'}
                          </div>
                          <div style={styles.detailItem}>
                            <strong>Submitted:</strong> {formatDate(selectedReport.createdAt)}
                          </div>
                          <div style={styles.detailItem}>
                            <strong>Incident Type:</strong> {selectedReport.incidentType ? selectedReport.incidentType.replace(/_/g, ' ').toUpperCase() : 'Not specified'}
                          </div>
                          <div style={styles.detailItem}>
                            <strong>Incident Date:</strong> {formatDate(selectedReport.dateTime)}
                          </div>
                          <div style={styles.detailItem}>
                            <strong>Location:</strong> {selectedReport.location?.address || selectedReport.location || 'Not specified'}
                          </div>
                          <div style={styles.detailItem}>
                            <strong>Anonymous:</strong> {selectedReport.isAnonymous ? 'Yes' : 'No'}
                          </div>
                          <div style={styles.detailItem}>
                            <strong>Reported by:</strong> {selectedReport.isAnonymous ? 'Anonymous' : (selectedReport.user?.name || selectedReport.userId?.name || 'User')}
                          </div>
                          {!selectedReport.isAnonymous && (selectedReport.user?.email || selectedReport.userId?.email) && (
                            <div style={styles.detailItem}>
                              <strong>User Email:</strong> {selectedReport.user?.email || selectedReport.userId?.email}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <div style={styles.detailSection}>
                        <h3 style={styles.sectionSubtitle}>Description</h3>
                        <div style={styles.descriptionBox}>
                          {selectedReport.description || 'No description provided'}
                        </div>
                      </div>

                      {/* Evidence */}
                      {selectedReport.evidence && selectedReport.evidence.length > 0 && (
                        <div style={styles.detailSection}>
                          <h3 style={styles.sectionSubtitle}>
                            Evidence ({selectedReport.evidence.length} file(s))
                          </h3>
                          <div style={styles.evidenceList}>
                            {selectedReport.evidence.map((file, index) => (
                              <a 
                                key={index}
                                href={`http://localhost:5000/${file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.evidenceItem}
                              >
                                <span style={styles.evidenceIcon}>📎</span>
                                <span style={styles.evidenceText}>
                                  Evidence {index + 1} - {file}
                                </span>
                                <span style={styles.evidenceArrow}>→</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Current Status Display */}
                      <div style={styles.detailSection}>
                        <h3 style={styles.sectionSubtitle}>Current Status</h3>
                        <div style={{
                          ...styles.statusBadge,
                          backgroundColor: getStatusColor(selectedReport.status),
                          fontSize: '14px',
                          padding: '8px 16px',
                          display: 'inline-block'
                        }}>
                          {getStatusText(selectedReport.status)}
                        </div>
                      </div>

                      {/* Close Button for Mobile */}
                      <div style={styles.mobileCloseSection}>
                        <button 
                          onClick={() => setSelectedReport(null)}
                          style={styles.mobileCloseButton}
                        >
                          ↑ Close Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  headerContent: {
    textAlign: 'center'
  },
  title: {
    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
    fontWeight: '600',
    color: '#2c3e50',
    margin: '0 0 0.5rem 0',
    lineHeight: '1.2'
  },
  subtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    color: '#6c757d',
    margin: 0
  },
  headerActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  refreshButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    whiteSpace: 'nowrap'
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    whiteSpace: 'nowrap'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '2rem'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1.25rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  statIcon: {
    fontSize: '1.5rem'
  },
  statInfo: {
    flex: 1
  },
  statNumber: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '0.25rem'
  },
  statLabel: {
    color: '#6c757d',
    fontWeight: '500',
    fontSize: '0.9rem'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  reportsSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.25rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
    color: '#2c3e50',
    margin: '0 0 1.5rem 0',
    fontWeight: '600'
  },
  reportsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  selectionPrompt: {
    textAlign: 'center',
    padding: '2rem 1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '2px dashed #dee2e6',
    color: '#6c757d',
    marginBottom: '1rem'
  },
  selectionIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem'
  },
  reportItem: {
    padding: '1rem',
    border: '2px solid #f1f3f4',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'white'
  },
  selectedReport: {
    borderColor: '#007bff',
    backgroundColor: '#f0f8ff'
  },
  reportHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem'
  },
  reportBasicInfo: {
    flex: 1
  },
  reportId: {
    margin: '0 0 0.25rem 0',
    color: '#2c3e50',
    fontSize: '1rem',
    fontWeight: '600'
  },
  reportDate: {
    color: '#6c757d',
    fontSize: '0.8rem'
  },
  statusSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '12px',
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  expandIcon: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  reportPreview: {
    color: '#666'
  },
  incidentType: {
    margin: '0 0 0.5rem 0',
    fontSize: '0.9rem'
  },
  reportDescription: {
    margin: '0 0 0.75rem 0',
    fontSize: '0.85rem',
    lineHeight: '1.4'
  },
  reportMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  metaItem: {
    fontSize: '0.8rem',
    color: '#6c757d'
  },
  reportDetails: {
    marginTop: '0.5rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  actionSection: {
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    marginBottom: '1.5rem'
  },
  sectionSubtitle: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    margin: '0 0 1rem 0',
    fontWeight: '600'
  },
  statusButtons: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  statusButton: {
    padding: '8px 16px',
    border: '2px solid #e9ecef',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    flex: '1',
    minWidth: '120px'
  },
  statusButtonActive: {
    borderColor: '#007bff',
    backgroundColor: '#007bff',
    color: 'white'
  },
  detailSection: {
    padding: '1rem 0',
    borderBottom: '1px solid #e9ecef'
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.75rem'
  },
  detailItem: {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: '1.4'
  },
  descriptionBox: {
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '6px',
    border: '1px solid #e9ecef',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#666'
  },
  evidenceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  evidenceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    backgroundColor: 'white',
    border: '1px solid #e9ecef',
    borderRadius: '6px',
    textDecoration: 'none',
    color: '#495057',
    transition: 'all 0.3s ease',
    flexWrap: 'wrap'
  },
  evidenceIcon: {
    fontSize: '1rem'
  },
  evidenceText: {
    flex: 1,
    fontSize: '0.9rem',
    wordBreak: 'break-word'
  },
  evidenceArrow: {
    color: '#007bff',
    fontWeight: 'bold'
  },
  mobileCloseSection: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e9ecef'
  },
  mobileCloseButton: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: '#666'
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  retryButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    marginTop: '1rem'
  }
};

// Add CSS animations and responsive behavior
const additionalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .reportItem:hover {
    border-color: #007bff;
    background-color: #f8f9fa;
  }

  .statusButton:hover {
    border-color: #007bff;
    background-color: #f0f8ff;
  }

  .evidenceItem:hover {
    background-color: #e9ecef;
    border-color: #007bff;
  }

  .logoutButton:hover {
    background-color: #c82333;
  }

  .refreshButton:hover {
    background-color: #218838;
  }

  .mobileCloseButton:hover {
    background-color: #5a6268;
  }

  /* Mobile-first responsive design */
  @media (min-width: 768px) {
    .header {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      text-align: left;
    }
    
    .headerContent {
      text-align: left;
    }
    
    .headerActions {
      justify-content: flex-end;
    }
    
    .statsGrid {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .reportHeader {
      flex-direction: row;
    }
    
    .detailGrid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .statusButtons {
      flex-direction: row;
    }
    
    .mobileCloseSection {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    .container {
      padding: '2rem';
    }
    
    .reportsSection {
      padding: '1.5rem';
    }
    
    .reportItem {
      padding: '1.25rem';
    }
    
    .statCard {
      padding: '1.5rem';
    }
  }

  @media (max-width: 480px) {
    .headerActions {
      flex-direction: column;
      width: 100%;
    }
    
    .refreshButton,
    .logoutButton {
      width: 100%;
    }
    
    .statsGrid {
      grid-template-columns: 1fr;
    }
    
    .statusButtons {
      flex-direction: column;
    }
    
    .statusButton {
      min-width: auto;
    }
    
    .evidenceItem {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
    
    .evidenceText {
      text-align: center;
    }
  }

  @media (max-width: 360px) {
    .container {
      padding: '0.5rem';
    }
    
    .header,
    .reportsSection {
      padding: '1rem';
    }
    
    .reportItem {
      padding: '0.75rem';
    }
    
    .reportDetails {
      padding: '1rem';
    }
    
    .statCard {
      padding: '1rem';
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = additionalStyles;
  document.head.appendChild(style);
}

export default Admin;