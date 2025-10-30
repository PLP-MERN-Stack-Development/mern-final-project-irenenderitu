import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportList = ({ user, view = 'user', onReportSelect, showFilters = true }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    incidentType: '',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    fetchReports();
  }, [view]);

  const fetchReports = async () => {
    try {
      const endpoint = view === 'admin' ? '/reports' : '/reports/my-reports';
      const res = await axios.get(endpoint);
      setReports(res.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredReports = reports.filter(report => {
    if (filters.status && report.status !== filters.status) return false;
    if (filters.incidentType && report.incidentType !== filters.incidentType) return false;
    if (filters.dateFrom && new Date(report.dateTime) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(report.dateTime) > new Date(filters.dateTo)) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'under_review': return '#17a2b8';
      case 'resolved': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>
          {view === 'admin' ? 'All Reports' : 'My Reports'} 
          <span style={styles.count}> ({filteredReports.length})</span>
        </h2>
        
        {showFilters && (
          <div style={styles.filters}>
            <select 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="resolved">Resolved</option>
            </select>

            <select 
              value={filters.incidentType}
              onChange={(e) => handleFilterChange('incidentType', e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">All Types</option>
              <option value="verbal">Verbal</option>
              <option value="physical">Physical</option>
              <option value="online">Online</option>
              <option value="workplace">Workplace</option>
              <option value="public">Public</option>
              <option value="other">Other</option>
            </select>

            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              style={styles.filterInput}
              placeholder="From Date"
            />

            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              style={styles.filterInput}
              placeholder="To Date"
            />

            <button
              onClick={() => setFilters({ status: '', incidentType: '', dateFrom: '', dateTo: '' })}
              style={styles.clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {filteredReports.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>No reports found</h3>
          <p>
            {reports.length === 0 
              ? (view === 'admin' 
                  ? 'No reports have been submitted yet.' 
                  : 'You haven\'t submitted any reports yet.')
              : 'No reports match your current filters.'}
          </p>
        </div>
      ) : (
        <div style={styles.reportsGrid}>
          {filteredReports.map(report => (
            <div 
              key={report._id} 
              style={styles.reportCard}
              onClick={() => onReportSelect && onReportSelect(report)}
              className={onReportSelect ? 'clickable' : ''}
            >
              <div style={styles.cardHeader}>
                <div style={styles.reportInfo}>
                  <h3 style={styles.reportId}>Report #{report.reportId}</h3>
                  <span style={styles.date}>
                    {formatDate(report.dateTime)}
                  </span>
                </div>
                <div style={styles.statusSection}>
                  <span 
                    style={{
                      ...styles.status,
                      backgroundColor: getStatusColor(report.status)
                    }}
                  >
                    {report.status.replace('_', ' ').toUpperCase()}
                  </span>
                  {report.priority && report.priority !== 'medium' && (
                    <span 
                      style={{
                        ...styles.priority,
                        backgroundColor: getPriorityColor(report.priority)
                      }}
                    >
                      {report.priority.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.incidentType}>
                  <strong>Type:</strong> 
                  <span style={styles.typeBadge}>
                    {report.incidentType}
                  </span>
                </div>

                <div style={styles.location}>
                  <strong>Location:</strong> 
                  {report.location?.address || 'Not specified'}
                </div>

                <div style={styles.description}>
                  <strong>Description:</strong>
                  <p style={styles.descriptionText}>
                    {report.description.length > 150 
                      ? `${report.description.substring(0, 150)}...` 
                      : report.description}
                  </p>
                </div>

                {view === 'admin' && (
                  <div style={styles.userInfo}>
                    <strong>Reported by:</strong> 
                    {report.isAnonymous 
                      ? 'Anonymous' 
                      : (report.userId?.name || 'Unknown User')}
                  </div>
                )}

                {report.evidence && report.evidence.length > 0 && (
                  <div style={styles.evidence}>
                    <strong>Evidence:</strong> 
                    <span style={styles.evidenceCount}>
                      {report.evidence.length} file(s)
                    </span>
                  </div>
                )}
              </div>

              <div style={styles.cardFooter}>
                <div style={styles.metaInfo}>
                  <span>Submitted: {formatDate(report.createdAt)}</span>
                  {report.updatedAt !== report.createdAt && (
                    <span>Updated: {formatDate(report.updatedAt)}</span>
                  )}
                </div>
                
                {onReportSelect && (
                  <button style={styles.viewButton}>
                    View Details →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats for Admin */}
      {view === 'admin' && reports.length > 0 && (
        <div style={styles.summary}>
          <h4>Summary</h4>
          <div style={styles.statsGrid}>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{reports.length}</span>
              <span style={styles.statLabel}>Total</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>
                {reports.filter(r => r.status === 'pending').length}
              </span>
              <span style={styles.statLabel}>Pending</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>
                {reports.filter(r => r.status === 'under_review').length}
              </span>
              <span style={styles.statLabel}>Under Review</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>
                {reports.filter(r => r.status === 'resolved').length}
              </span>
              <span style={styles.statLabel}>Resolved</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '0',
  },
  header: {
    marginBottom: '2rem',
  },
  count: {
    color: '#666',
    fontSize: '1rem',
    fontWeight: 'normal',
  },
  filters: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '1rem',
  },
  filterSelect: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: 'white',
  },
  filterInput: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: 'white',
  },
  clearFilters: {
    padding: '8px 12px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
  reportsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e9ecef',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem',
  },
  reportInfo: {
    flex: 1,
  },
  reportId: {
    margin: '0 0 5px 0',
    color: '#333',
    fontSize: '1.1rem',
  },
  date: {
    color: '#666',
    fontSize: '0.9rem',
  },
  statusSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '5px',
  },
  status: {
    padding: '4px 8px',
    borderRadius: '4px',
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  priority: {
    padding: '2px 6px',
    borderRadius: '3px',
    color: 'white',
    fontSize: '9px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardBody: {
    marginBottom: '1rem',
  },
  incidentType: {
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  typeBadge: {
    backgroundColor: '#e9ecef',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    textTransform: 'capitalize',
  },
  location: {
    marginBottom: '0.5rem',
    color: '#555',
  },
  description: {
    marginBottom: '0.5rem',
  },
  descriptionText: {
    margin: '5px 0 0 0',
    color: '#666',
    lineHeight: '1.4',
  },
  userInfo: {
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    color: '#555',
  },
  evidence: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
  },
  evidenceCount: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '10px',
    fontSize: '0.8rem',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #eee',
    paddingTop: '1rem',
  },
  metaInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    fontSize: '0.8rem',
    color: '#666',
  },
  viewButton: {
    backgroundColor: 'transparent',
    color: '#007bff',
    border: '1px solid #007bff',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  summary: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  },
  stat: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '5px',
  },
  statNumber: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007bff',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#666',
    textTransform: 'uppercase',
  },
};

// Add CSS animation for spinner
const spinnerStyle = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Inject styles
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(spinnerStyle, styleSheet.cssRules.length);

export default ReportList;