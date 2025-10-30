// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const ReportIncident = ({ user }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     incidentType: '',
//     description: '',
//     location: '',
//     dateTime: '',
//     isAnonymous: false
//   });
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const submitData = new FormData();
//       submitData.append('incidentType', formData.incidentType);
//       submitData.append('description', formData.description);
//       submitData.append('location', JSON.stringify({
//         address: formData.location
//       }));
//       submitData.append('dateTime', formData.dateTime);
//       submitData.append('isAnonymous', formData.isAnonymous);

//       files.forEach(file => {
//         submitData.append('evidence', file);
//       });

//       await axios.post('/reports', submitData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       alert('Report submitted successfully!');
//       navigate('/my-reports');
//     } catch (error) {
//       alert('Error submitting report: ' + (error.response?.data?.message || 'Something went wrong'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header with Back Button */}
//       <div style={styles.header}>
//         <Link to="/dashboard" style={styles.backButton}>
//           ← Back to Dashboard
//         </Link>
//         <h1 style={styles.title}>Report Harassment Incident</h1>
//       </div>

//       <div style={styles.content}>
//         <div style={styles.infoCard}>
//           <div style={styles.infoIcon}>🛡️</div>
//           <div style={styles.infoContent}>
//             <h3 style={styles.infoTitle}>Your Safety Comes First</h3>
//             <p style={styles.infoText}>
//               Your report will be handled with the utmost confidentiality and care. 
//               All information is encrypted and stored securely.
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.formGrid}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Incident Type *</label>
//               <select 
//                 name="incidentType" 
//                 value={formData.incidentType}
//                 onChange={handleChange}
//                 required
//                 style={styles.select}
//               >
//                 <option value="">Select type of harassment</option>
//                 <option value="verbal">Verbal Harassment</option>
//                 <option value="physical">Physical Harassment</option>
//                 <option value="online">Online Harassment</option>
//                 <option value="workplace">Workplace Harassment</option>
//                 <option value="public">Public Harassment</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>Date and Time *</label>
//               <input
//                 type="datetime-local"
//                 name="dateTime"
//                 value={formData.dateTime}
//                 onChange={handleChange}
//                 required
//                 style={styles.input}
//               />
//             </div>
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Location *</label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               placeholder="Enter the location where the incident occurred..."
//               required
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Description *</label>
//             <textarea 
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="6"
//               placeholder="Please provide a detailed description of what happened, including any relevant details about the people involved, what was said or done, and how it made you feel..."
//               required
//               style={styles.textarea}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Evidence (Photos, Videos, Documents)</label>
//             <div style={styles.fileUpload}>
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 accept="image/*,video/*,.pdf,.doc,.docx"
//                 style={styles.fileInput}
//                 id="file-upload"
//               />
//               <label htmlFor="file-upload" style={styles.fileLabel}>
//                 <div style={styles.uploadIcon}>📎</div>
//                 <div style={styles.uploadText}>
//                   <strong>Choose files</strong> or drag and drop here
//                 </div>
//                 <div style={styles.uploadSubtext}>
//                   PNG, JPG, PDF, DOC, MP4 up to 10MB each
//                 </div>
//               </label>
//             </div>
//             {files.length > 0 && (
//               <div style={styles.fileList}>
//                 <strong>Selected files:</strong>
//                 {files.map((file, index) => (
//                   <div key={index} style={styles.fileItem}>
//                     <span style={styles.fileName}>{file.name}</span>
//                     <span style={styles.fileSize}>
//                       ({(file.size / 1024 / 1024).toFixed(2)} MB)
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div style={styles.anonymousSection}>
//             <label style={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 name="isAnonymous"
//                 checked={formData.isAnonymous}
//                 onChange={(e) => setFormData({
//                   ...formData,
//                   isAnonymous: e.target.checked
//                 })}
//                 style={styles.checkbox}
//               />
//               <div style={styles.checkboxContent}>
//                 <span style={styles.checkboxText}>Report anonymously</span>
//                 <span style={styles.checkboxDescription}>
//                   Your personal information will not be shared with authorities. 
//                   You can still track your report status.
//                 </span>
//               </div>
//             </label>
//           </div>

//           <div style={styles.buttonGroup}>
//             <Link to="/dashboard" style={styles.cancelButton}>
//               Cancel
//             </Link>
//             <button 
//               type="submit" 
//               style={{
//                 ...styles.submitButton,
//                 ...(loading ? styles.submitButtonDisabled : {})
//               }}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <div style={styles.spinner}></div>
//                   Submitting Report...
//                 </>
//               ) : (
//                 'Submit Report'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '1rem',
//     maxWidth: '800px',
//     margin: '0 auto',
//     backgroundColor: '#f8f9fa',
//     minHeight: '100vh',
//     '@media (min-width: 768px)': {
//       padding: '2rem'
//     }
//   },
//   header: {
//     marginBottom: '2rem',
//     textAlign: 'center',
//     '@media (min-width: 768px)': {
//       textAlign: 'left'
//     }
//   },
//   backButton: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     color: '#007bff',
//     textDecoration: 'none',
//     fontWeight: '500',
//     marginBottom: '1rem',
//     fontSize: '0.9rem',
//     '&:hover': {
//       textDecoration: 'underline'
//     }
//   },
//   title: {
//     fontSize: '2rem',
//     fontWeight: '600',
//     color: '#2c3e50',
//     margin: '0 0 0.5rem 0',
//     '@media (min-width: 768px)': {
//       fontSize: '2.5rem'
//     }
//   },
//   content: {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     padding: '1.5rem',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     '@media (min-width: 768px)': {
//       padding: '2rem'
//     }
//   },
//   infoCard: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     backgroundColor: '#e8f5e8',
//     padding: '1.5rem',
//     borderRadius: '8px',
//     marginBottom: '2rem',
//     border: '1px solid #d4edda'
//   },
//   infoIcon: {
//     fontSize: '2rem',
//     marginRight: '1rem',
//     flexShrink: 0
//   },
//   infoContent: {
//     flex: 1
//   },
//   infoTitle: {
//     fontSize: '1.2rem',
//     color: '#155724',
//     margin: '0 0 0.5rem 0',
//     fontWeight: '600'
//   },
//   infoText: {
//     color: '#155724',
//     margin: 0,
//     lineHeight: '1.5',
//     fontSize: '0.95rem'
//   },
//   form: {
//     width: '100%'
//   },
//   formGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr',
//     gap: '1.5rem',
//     marginBottom: '1.5rem',
//     '@media (min-width: 768px)': {
//       gridTemplateColumns: '1fr 1fr'
//     }
//   },
//   formGroup: {
//     marginBottom: '1.5rem'
//   },
//   label: {
//     display: 'block',
//     marginBottom: '0.5rem',
//     fontWeight: '600',
//     color: '#2c3e50',
//     fontSize: '0.95rem'
//   },
//   input: {
//     width: '100%',
//     padding: '12px 16px',
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     fontSize: '16px',
//     transition: 'border-color 0.3s, box-shadow 0.3s',
//     '&:focus': {
//       borderColor: '#007bff',
//       outline: 'none',
//       boxShadow: '0 0 0 3px rgba(0,123,255,0.1)'
//     }
//   },
//   select: {
//     width: '100%',
//     padding: '12px 16px',
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     fontSize: '16px',
//     backgroundColor: 'white',
//     transition: 'border-color 0.3s, box-shadow 0.3s',
//     '&:focus': {
//       borderColor: '#007bff',
//       outline: 'none',
//       boxShadow: '0 0 0 3px rgba(0,123,255,0.1)'
//     }
//   },
//   textarea: {
//     width: '100%',
//     padding: '12px 16px',
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     fontSize: '16px',
//     resize: 'vertical',
//     minHeight: '120px',
//     transition: 'border-color 0.3s, box-shadow 0.3s',
//     '&:focus': {
//       borderColor: '#007bff',
//       outline: 'none',
//       boxShadow: '0 0 0 3px rgba(0,123,255,0.1)'
//     }
//   },
//   fileUpload: {
//     border: '2px dashed #ddd',
//     borderRadius: '8px',
//     padding: '2rem',
//     textAlign: 'center',
//     transition: 'border-color 0.3s',
//     '&:hover': {
//       borderColor: '#007bff'
//     }
//   },
//   fileInput: {
//     display: 'none'
//   },
//   fileLabel: {
//     cursor: 'pointer',
//     display: 'block'
//   },
//   uploadIcon: {
//     fontSize: '2rem',
//     marginBottom: '1rem'
//   },
//   uploadText: {
//     fontSize: '1.1rem',
//     color: '#2c3e50',
//     marginBottom: '0.5rem'
//   },
//   uploadSubtext: {
//     fontSize: '0.9rem',
//     color: '#6c757d'
//   },
//   fileList: {
//     marginTop: '1rem',
//     padding: '1rem',
//     backgroundColor: '#f8f9fa',
//     borderRadius: '8px'
//   },
//   fileItem: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '0.5rem 0',
//     borderBottom: '1px solid #e9ecef'
//   },
//   fileName: {
//     flex: 1
//   },
//   fileSize: {
//     color: '#6c757d',
//     fontSize: '0.9rem'
//   },
//   anonymousSection: {
//     backgroundColor: '#f8f9fa',
//     padding: '1.5rem',
//     borderRadius: '8px',
//     marginBottom: '2rem'
//   },
//   checkboxLabel: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     cursor: 'pointer',
//     gap: '1rem'
//   },
//   checkbox: {
//     marginTop: '0.25rem'
//   },
//   checkboxContent: {
//     flex: 1
//   },
//   checkboxText: {
//     display: 'block',
//     fontWeight: '600',
//     color: '#2c3e50',
//     marginBottom: '0.25rem'
//   },
//   checkboxDescription: {
//     display: 'block',
//     color: '#6c757d',
//     fontSize: '0.9rem',
//     lineHeight: '1.4'
//   },
//   buttonGroup: {
//     display: 'flex',
//     gap: '1rem',
//     flexDirection: 'column',
//     '@media (min-width: 768px)': {
//       flexDirection: 'row',
//       justifyContent: 'flex-end'
//     }
//   },
//   cancelButton: {
//     padding: '12px 24px',
//     border: '1px solid #6c757d',
//     borderRadius: '8px',
//     color: '#6c757d',
//     textDecoration: 'none',
//     textAlign: 'center',
//     fontWeight: '500',
//     transition: 'all 0.3s',
//     '&:hover': {
//       backgroundColor: '#6c757d',
//       color: 'white'
//     },
//     '@media (min-width: 768px)': {
//       order: 2
//     }
//   },
//   submitButton: {
//     padding: '12px 24px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '16px',
//     fontWeight: '500',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '0.5rem',
//     '&:hover:not(:disabled)': {
//       backgroundColor: '#0056b3'
//     },
//     '@media (min-width: 768px)': {
//       order: 1
//     }
//   },
//   submitButtonDisabled: {
//     backgroundColor: '#6c757d',
//     cursor: 'not-allowed'
//   },
//   spinner: {
//     width: '16px',
//     height: '16px',
//     border: '2px solid transparent',
//     borderTop: '2px solid white',
//     borderRadius: '50%',
//     animation: 'spin 1s linear infinite'
//   }
// };

// // Add CSS animations
// const additionalStyles = `
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
  
//   input:focus, select:focus, textarea:focus {
//     border-color: #007bff !important;
//     outline: none;
//     box-shadow: 0 0 0 3px rgba(0,123,255,0.1) !important;
//   }
  
//   @media (max-width: 767px) {
//     .form-grid {
//       grid-template-columns: 1fr;
//     }
//   }
// `;

// // Inject styles
// if (typeof document !== 'undefined') {
//   const style = document.createElement('style');
//   style.textContent = additionalStyles;
//   document.head.appendChild(style);
// }

// export default ReportIncident;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ReportIncident = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    incidentType: '',
    description: '',
    location: '',
    dateTime: '',
    isAnonymous: false
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('incidentType', formData.incidentType);
      submitData.append('description', formData.description);
      submitData.append('location', JSON.stringify({
        address: formData.location
      }));
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

      alert('Report submitted successfully!');
      navigate('/my-reports');
    } catch (error) {
      alert('Error submitting report: ' + (error.response?.data?.message || 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header with Redesigned Back Button */}
      <div style={styles.header}>
        <Link to="/dashboard" style={styles.backButton}>
          <span style={styles.backIcon}>←</span>
          Back to Dashboard
        </Link>
        <h1 style={styles.title}>Report Harassment Incident</h1>
      </div>

      <div style={styles.content}>
        <div style={styles.infoCard}>
          <div style={styles.infoIcon}>🛡️</div>
          <div style={styles.infoContent}>
            <h3 style={styles.infoTitle}>Your Safety Comes First</h3>
            <p style={styles.infoText}>
              Your report will be handled with the utmost confidentiality and care. 
              All information is encrypted and stored securely.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Incident Type *</label>
              <select 
                name="incidentType" 
                value={formData.incidentType}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select type of harassment</option>
                <option value="verbal">Verbal Harassment</option>
                <option value="physical">Physical Harassment</option>
                <option value="online">Online Harassment</option>
                <option value="workplace">Workplace Harassment</option>
                <option value="public">Public Harassment</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Date and Time *</label>
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the location where the incident occurred..."
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description *</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Please provide a detailed description of what happened, including any relevant details about the people involved, what was said or done, and how it made you feel..."
              required
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Evidence (Photos, Videos, Documents)</label>
            <div style={styles.fileUpload}>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*,video/*,.pdf,.doc,.docx"
                style={styles.fileInput}
                id="file-upload"
              />
              <label htmlFor="file-upload" style={styles.fileLabel}>
                <div style={styles.uploadIcon}>📎</div>
                <div style={styles.uploadText}>
                  <strong>Choose files</strong> or drag and drop here
                </div>
                <div style={styles.uploadSubtext}>
                  PNG, JPG, PDF, DOC, MP4 up to 10MB each
                </div>
              </label>
            </div>
            {files.length > 0 && (
              <div style={styles.fileList}>
                <strong>Selected files:</strong>
                {files.map((file, index) => (
                  <div key={index} style={styles.fileItem}>
                    <span style={styles.fileName}>{file.name}</span>
                    <span style={styles.fileSize}>
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={styles.anonymousSection}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({
                  ...formData,
                  isAnonymous: e.target.checked
                })}
                style={styles.checkbox}
              />
              <div style={styles.checkboxContent}>
                <span style={styles.checkboxText}>Report anonymously</span>
                <span style={styles.checkboxDescription}>
                  Your personal information will not be shared with authorities. 
                  You can still track your report status.
                </span>
              </div>
            </label>
          </div>

          <div style={styles.buttonGroup}>
            <Link to="/dashboard" style={styles.cancelButton}>
              Cancel
            </Link>
            <button 
              type="submit" 
              style={{
                ...styles.submitButton,
                ...(loading ? styles.submitButtonDisabled : {})
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div style={styles.spinner}></div>
                  Submitting Report...
                </>
              ) : (
                'Submit Report'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    '@media (min-width: 768px)': {
      padding: '2rem'
    }
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
    '@media (min-width: 768px)': {
      textAlign: 'left'
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
    marginBottom: '1rem',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,123,255,0.3)',
    border: '2px solid #007bff',
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
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#2c3e50',
    margin: '0 0 0.5rem 0',
    '@media (min-width: 768px)': {
      fontSize: '2.5rem'
    }
  },
  content: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    '@media (min-width: 768px)': {
      padding: '2rem'
    }
  },
  infoCard: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: '#e8f5e8',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    border: '1px solid #d4edda'
  },
  infoIcon: {
    fontSize: '2rem',
    marginRight: '1rem',
    flexShrink: 0
  },
  infoContent: {
    flex: 1
  },
  infoTitle: {
    fontSize: '1.2rem',
    color: '#155724',
    margin: '0 0 0.5rem 0',
    fontWeight: '600'
  },
  infoText: {
    color: '#155724',
    margin: 0,
    lineHeight: '1.5',
    fontSize: '0.95rem'
  },
  form: {
    width: '100%'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr 1fr'
    }
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '0.95rem'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    '&:focus': {
      borderColor: '#007bff',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(0,123,255,0.1)'
    }
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: 'white',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    '&:focus': {
      borderColor: '#007bff',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(0,123,255,0.1)'
    }
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '120px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    '&:focus': {
      borderColor: '#007bff',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(0,123,255,0.1)'
    }
  },
  fileUpload: {
    border: '2px dashed #ddd',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center',
    transition: 'border-color 0.3s',
    '&:hover': {
      borderColor: '#007bff'
    }
  },
  fileInput: {
    display: 'none'
  },
  fileLabel: {
    cursor: 'pointer',
    display: 'block'
  },
  uploadIcon: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  uploadText: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    marginBottom: '0.5rem'
  },
  uploadSubtext: {
    fontSize: '0.9rem',
    color: '#6c757d'
  },
  fileList: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #e9ecef'
  },
  fileName: {
    flex: 1
  },
  fileSize: {
    color: '#6c757d',
    fontSize: '0.9rem'
  },
  anonymousSection: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'pointer',
    gap: '1rem'
  },
  checkbox: {
    marginTop: '0.25rem'
  },
  checkboxContent: {
    flex: 1
  },
  checkboxText: {
    display: 'block',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '0.25rem'
  },
  checkboxDescription: {
    display: 'block',
    color: '#6c757d',
    fontSize: '0.9rem',
    lineHeight: '1.4'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }
  },
  cancelButton: {
    padding: '12px 24px',
    border: '1px solid #6c757d',
    borderRadius: '8px',
    color: '#6c757d',
    textDecoration: 'none',
    textAlign: 'center',
    fontWeight: '500',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: '#6c757d',
      color: 'white'
    },
    '@media (min-width: 768px)': {
      order: 2
    }
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    '&:hover:not(:disabled)': {
      backgroundColor: '#0056b3'
    },
    '@media (min-width: 768px)': {
      order: 1
    }
  },
  submitButtonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed'
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

// Add CSS animations
const additionalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  input:focus, select:focus, textarea:focus {
    border-color: #007bff !important;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1) !important;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = additionalStyles;
  document.head.appendChild(style);
}

export default ReportIncident;