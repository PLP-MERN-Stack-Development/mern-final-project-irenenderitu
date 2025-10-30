import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Map = ({ onLocationSelect, initialLocation }) => {
  const [reports, setReports] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  useEffect(() => {
    fetchReportsForMap();
  }, []);

  const fetchReportsForMap = async () => {
    try {
      const res = await axios.get('/reports/map');
      setReports(res.data);
    } catch (error) {
      console.error('Error fetching reports for map:', error);
    }
  };

  const handleMapClick = (e) => {
    // In a real implementation, this would get coordinates from a map click
    // For MVP, we'll simulate location selection
    const location = {
      address: `Selected Location`,
      lat: 40.7128, // Default coordinates (NYC)
      lng: -74.0060
    };
    
    setSelectedLocation(location);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  const getIncidentColor = (type) => {
    const colors = {
      verbal: '#ff6b6b',
      physical: '#ff0000',
      online: '#4ecdc4',
      workplace: '#45b7d1',
      public: '#96ceb4',
      other: '#feca57'
    };
    return colors[type] || '#999';
  };

  return (
    <div style={styles.container}>
      <div style={styles.mapContainer} onClick={handleMapClick}>
        <div style={styles.mapPlaceholder}>
          <h3>Interactive Map</h3>
          <p>Click on the map to select incident location</p>
          <p style={styles.smallText}>(In full implementation, this would be a real map)</p>
          
          {/* Simulated map markers for existing reports */}
          {reports.map((report, index) => (
            <div
              key={report._id}
              style={{
                ...styles.mapMarker,
                left: `${20 + (index * 15) % 70}%`,
                top: `${30 + (index * 20) % 60}%`,
                backgroundColor: getIncidentColor(report.incidentType)
              }}
              title={`${report.incidentType} - ${new Date(report.dateTime).toLocaleDateString()}`}
            >
              <span style={styles.markerText}>
                {report.incidentType.charAt(0).toUpperCase()}
              </span>
            </div>
          ))}
          
          {/* Selected location marker */}
          {selectedLocation && (
            <div
              style={{
                ...styles.selectedMarker,
                left: '50%',
                top: '50%'
              }}
            >
              ★
            </div>
          )}
        </div>
      </div>

      <div style={styles.mapControls}>
        <div style={styles.legend}>
          <h4>Incident Legend</h4>
          <div style={styles.legendItem}>
            <span style={{...styles.legendColor, backgroundColor: '#ff6b6b'}}></span>
            <span>Verbal</span>
          </div>
          <div style={styles.legendItem}>
            <span style={{...styles.legendColor, backgroundColor: '#ff0000'}}></span>
            <span>Physical</span>
          </div>
          <div style={styles.legendItem}>
            <span style={{...styles.legendColor, backgroundColor: '#4ecdc4'}}></span>
            <span>Online</span>
          </div>
          <div style={styles.legendItem}>
            <span style={{...styles.legendColor, backgroundColor: '#45b7d1'}}></span>
            <span>Workplace</span>
          </div>
        </div>

        {selectedLocation && (
          <div style={styles.selectedInfo}>
            <h4>Selected Location</h4>
            <p>{selectedLocation.address}</p>
            <p>Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}</p>
          </div>
        )}
      </div>

      <div style={styles.stats}>
        <h4>Area Statistics</h4>
        <div style={styles.statGrid}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{reports.length}</span>
            <span style={styles.statLabel}>Total Reports</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>
              {reports.filter(r => r.status === 'pending').length}
            </span>
            <span style={styles.statLabel}>Pending</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>
              {reports.filter(r => r.status === 'resolved').length}
            </span>
            <span style={styles.statLabel}>Resolved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  mapContainer: {
    height: '400px',
    backgroundColor: '#e8f4f8',
    position: 'relative',
    cursor: 'pointer',
  },
  mapPlaceholder: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  smallText: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px',
  },
  mapMarker: {
    position: 'absolute',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  selectedMarker: {
    position: 'absolute',
    fontSize: '24px',
    color: '#007bff',
    transform: 'translate(-50%, -50%)',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  markerText: {
    fontSize: '10px',
  },
  mapControls: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: 'white',
    borderTop: '1px solid #ddd',
  },
  legend: {
    flex: 1,
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  legendColor: {
    width: '15px',
    height: '15px',
    borderRadius: '3px',
    marginRight: '8px',
  },
  selectedInfo: {
    flex: 1,
    textAlign: 'right',
  },
  stats: {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #ddd',
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  statItem: {
    textAlign: 'center',
    padding: '0.5rem',
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
  }
};

export default Map;