import React, { useState } from 'react';
import axios from 'axios';
import Map from './Map';

const ReportForm = ({ user, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    incidentType: '',
    description: '',
    location: '',
    dateTime: '',
    isAnonymous: false
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setFormData({
      ...formData,
      location: location.address
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('incidentType', formData.incidentType);
      submitData.append('description', formData.description);
      submitData.append('location', JSON.stringify(
        selectedLocation || { address: formData.location }
      ));
      submitData.append('dateTime', formData.dateTime);
      submitData.append('isAnonymous', formData.isAnonymous);

      files.forEach(file => {
        submitData.append('evidence', file);
      });

      await axios.post('/reports', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      alert('Error submitting report: ' + (error.response?.data?.message || 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getStepTitle = () => {
    const titles = {
      1: 'Incident Details',
      2: 'Location Information',
      3: 'Additional Evidence',
      4: 'Review & Submit'
    };
    return titles[step] || 'Report Incident';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Report Harassment Incident</h2>
        <div style={styles.progress}>
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              style={{
                ...styles.progressStep,
                ...(step >= stepNum ? styles.progressActive : {})
              }}
            >
              {stepNum}
            </div>
          ))}
        </div>
        <h3 style={styles.stepTitle}>{getStepTitle()}</h3>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Step 1: Incident Details */}
        {step === 1 && (
          <div style={styles.step}>
            <div style={styles.formGroup}>
              <label>Type of Incident *</label>
              <select 
                name="incidentType" 
                value={formData.incidentType}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select the type of harassment</option>
                <option value="verbal">Verbal Harassment</option>
                <option value="physical">Physical Harassment</option>
                <option value="online">Online Harassment</option>
                <option value="workplace">Workplace Harassment</option>
                <option value="public">Public Harassment</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label>When did it happen? *</label>
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Describe what happened *</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Please provide a detailed description of the incident. Include what happened, who was involved, and any other relevant details..."
                required
                style={styles.textarea}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData({
                    ...formData,
                    isAnonymous: e.target.checked
                  })}
                />
                Submit report anonymously
              </label>
              <small style={styles.helpText}>
                Your personal information will not be shared with authorities
              </small>
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div style={styles.step}>
            <div style={styles.formGroup}>
              <label>Location of Incident</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter address or location description"
                style={styles.input}
              />
              <small style={styles.helpText}>
                You can also click on the map below to select location
              </small>
            </div>

            <div style={styles.mapSection}>
              <Map 
                onLocationSelect={handleLocationSelect}
                initialLocation={selectedLocation}
              />
            </div>
          </div>
        )}

        {/* Step 3: Evidence */}
        {step === 3 && (
          <div style={styles.step}>
            <div style={styles.formGroup}>
              <label>Upload Evidence</label>
              <div style={styles.fileUploadArea}>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  style={styles.fileInput}
                  id="file-upload"
                />
                <label htmlFor="file-upload" style={styles.fileUploadLabel}>
                  <div style={styles.uploadIcon}>📎</div>
                  <div>Click to upload files or drag and drop</div>
                  <small style={styles.helpText}>
                    Supported: Images, Videos, PDF, Word documents (Max 5 files)
                  </small>
                </label>
              </div>
            </div>

            {files.length > 0 && (
              <div style={styles.fileList}>
                <h4>Selected Files:</h4>
                {files.map((file, index) => (
                  <div key={index} style={styles.fileItem}>
                    <span style={styles.fileName}>{file.name}</span>
                    <span style={styles.fileSize}>
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      type="button"
                      onClick={() => setFiles(files.filter((_, i) => i !== index))}
                      style={styles.removeFile}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={styles.safetyNotice}>
              <h4>🛡️ Safety First</h4>
              <ul style={styles.safetyList}>
                <li>Only share evidence you're comfortable providing</li>
                <li>Your privacy and safety are our priority</li>
                <li>All evidence is stored securely and confidentially</li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div style={styles.step}>
            <div style={styles.reviewSection}>
              <h4>Please review your report</h4>
              
              <div style={styles.reviewItem}>
                <strong>Incident Type:</strong>
                <span>{formData.incidentType}</span>
              </div>
              
              <div style={styles.reviewItem}>
                <strong>Date & Time:</strong>
                <span>{new Date(formData.dateTime).toLocaleString()}</span>
              </div>
              
              <div style={styles.reviewItem}>
                <strong>Location:</strong>
                <span>{formData.location || 'Not specified'}</span>
              </div>
              
              <div style={styles.reviewItem}>
                <strong>Anonymous:</strong>
                <span>{formData.isAnonymous ? 'Yes' : 'No'}</span>
              </div>
              
              <div style={styles.reviewItem}>
                <strong>Files:</strong>
                <span>{files.length} file(s) attached</span>
              </div>
              
              <div style={styles.reviewDescription}>
                <strong>Description:</strong>
                <p>{formData.description}</p>
              </div>
            </div>

            <div style={styles.confirmation}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" required />
                I confirm that the information provided is accurate to the best of my knowledge
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={styles.buttonGroup}>
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              style={styles.secondaryButton}
            >
              Back
            </button>
          )}
          
          {onCancel && step === 1 && (
            <button
              type="button"
              onClick={onCancel}
              style={styles.secondaryButton}
            >
              Cancel
            </button>
          )}
          
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              style={styles.primaryButton}
              disabled={!formData.incidentType || !formData.description || !formData.dateTime}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              style={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0',
  },
  progressStep: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 10px',
    fontWeight: 'bold',
  },
  progressActive: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  stepTitle: {
    color: '#333',
    marginTop: '1rem',
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  step: {
    minHeight: '300px',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    backgroundColor: 'white',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    resize: 'vertical',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  helpText: {
    color: '#666',
    fontSize: '0.9rem',
    display: 'block',
    marginTop: '5px',
  },
  mapSection: {
    marginTop: '1rem',
  },
  fileUploadArea: {
    border: '2px dashed #ddd',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s',
  },
  fileInput: {
    display: 'none',
  },
  fileUploadLabel: {
    cursor: 'pointer',
  },
  uploadIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  fileList: {
    marginTop: '1rem',
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    marginBottom: '5px',
  },
  fileName: {
    flex: 1,
  },
  fileSize: {
    color: '#666',
    margin: '0 10px',
  },
  removeFile: {
    background: 'none',
    border: 'none',
    color: '#ff6b6b',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  safetyNotice: {
    backgroundColor: '#e8f5e8',
    padding: '1rem',
    borderRadius: '5px',
    marginTop: '1rem',
  },
  safetyList: {
    margin: '0.5rem 0 0 1rem',
  },
  reviewSection: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '5px',
  },
  reviewItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #eee',
  },
  reviewDescription: {
    marginTop: '1rem',
  },
  confirmation: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#fff3cd',
    borderRadius: '5px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
    gap: '1rem',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    flex: 1,
  },
};

export default ReportForm;