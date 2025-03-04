import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function MyAppointments() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        // In a real app, this would be an API call
        // Simulating API response
        const mockAppointments = [
          {
            _id: '1',
            doctorName: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            status: 'scheduled',
            paymentStatus: 'completed'
          },
          {
            _id: '2',
            doctorName: 'Dr. Michael Chen',
            specialty: 'Dermatology',
            startTime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
            status: 'scheduled',
            paymentStatus: 'completed'
          }
        ];

        setAppointments(mockAppointments);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentUser, navigate]);

  const joinConsultation = (appointmentId) => {
    navigate(`/video-consultation/${appointmentId}`);
  };

  if (loading) {
    return <div className="loading">Loading appointments...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="my-appointments">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <div className="no-appointments">
          <p>You have no scheduled appointments.</p>
          <button onClick={() => navigate('/book-consultation')}>
            Book a Consultation
          </button>
        </div>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="appointment-card">
              <div className="appointment-info">
                <h3>{appointment.doctorName}</h3>
                <p className="specialty">{appointment.specialty}</p>
                <p className="datetime">
                  {new Date(appointment.startTime).toLocaleString()}
                </p>
                <p className="status">Status: {appointment.status}</p>
              </div>
              <div className="appointment-actions">
                {appointment.status === 'scheduled' && (
                  <button
                    onClick={() => joinConsultation(appointment._id)}
                    className="join-btn"
                    disabled={new Date(appointment.startTime) > new Date()}
                  >
                    Join Consultation
                  </button>
                )}
                <button 
                  onClick={() => navigate(`/appointment-details/${appointment._id}`)}
                  className="details-btn"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments; 