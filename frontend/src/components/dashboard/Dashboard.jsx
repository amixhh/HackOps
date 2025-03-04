import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {currentUser?.name}!</h2>
      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate('/patient-info')}>
          <h3>My Health Profile</h3>
          <p>Update your medical information</p>
        </div>
        <div className="card" onClick={() => navigate('/book-consultation')}>
          <h3>Book Consultation</h3>
          <p>Schedule a telehealth appointment</p>
        </div>
        <div className="card" onClick={() => navigate('/my-appointments')}>
          <h3>My Appointments</h3>
          <p>View and manage your consultations</p>
        </div>
        {currentUser?.role === 'doctor' && (
          <div className="card" onClick={() => navigate('/doctor-schedule')}>
            <h3>My Schedule</h3>
            <p>Manage your availability</p>
          </div>
        )}
      </div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
}

export default Dashboard; 