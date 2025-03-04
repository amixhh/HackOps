import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PatientInfo() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    address: '',
    phone: '',
    emergencyContact: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: '',
    insuranceProvider: '',
    insuranceMemberID: '',
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchPatientInfo = async () => {
      try {
        const response = await fetch('/api/patient-info', {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setFormData(prevData => ({
            ...prevData,
            ...data,
            name: currentUser.name
          }));
        }
      } catch (error) {
        console.error('Failed to fetch patient info:', error);
      }
    };

    fetchPatientInfo();
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/patient-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Show success message or redirect
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Failed to update patient info:', error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="patient-info">
      <h2>My Health Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Reference to existing PatientInfo.jsx for medical history section */}
        ```javascript:frontend/src/componentsssss/PatientInfo.jsx
        startLine: 173
        endLine: 197
        ```

        <div className="form-actions">
          <button type="submit" className="btn-primary">Save Information</button>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => navigate('/book-appointment')}
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientInfo; 