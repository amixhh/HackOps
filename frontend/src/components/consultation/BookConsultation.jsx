import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function BookConsultation() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [consultationData, setConsultationData] = useState({
    specialty: '',
    preferredDate: '',
    preferredTime: '',
    symptoms: '',
    previousHistory: '',
    preferredLanguage: '',
  });

  const specialties = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Psychiatry',
    'Orthopedics'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to save consultation request
      navigate('/payment', { 
        state: { 
          consultationType: consultationData.specialty,
          amount: 50 // Example fixed amount
        }
      });
    } catch (error) {
      console.error('Failed to book consultation:', error);
    }
  };

  return (
    <div className="consultation-form">
      <h2>Book Telehealth Consultation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Specialty Required</label>
          <select 
            value={consultationData.specialty}
            onChange={(e) => setConsultationData({
              ...consultationData,
              specialty: e.target.value
            })}
            required
          >
            <option value="">Select Specialty</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Preferred Date</label>
          <input
            type="date"
            value={consultationData.preferredDate}
            onChange={(e) => setConsultationData({
              ...consultationData,
              preferredDate: e.target.value
            })}
            required
          />
        </div>

        <div className="form-group">
          <label>Preferred Time</label>
          <input
            type="time"
            value={consultationData.preferredTime}
            onChange={(e) => setConsultationData({
              ...consultationData,
              preferredTime: e.target.value
            })}
            required
          />
        </div>

        <div className="form-group">
          <label>Symptoms</label>
          <textarea
            value={consultationData.symptoms}
            onChange={(e) => setConsultationData({
              ...consultationData,
              symptoms: e.target.value
            })}
            required
          />
        </div>

        <div className="form-group">
          <label>Preferred Language</label>
          <select
            value={consultationData.preferredLanguage}
            onChange={(e) => setConsultationData({
              ...consultationData,
              preferredLanguage: e.target.value
            })}
            required
          >
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="mandarin">Mandarin</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default BookConsultation; 