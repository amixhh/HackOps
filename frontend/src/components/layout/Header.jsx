import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
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
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>TeleHealth Connect</h1>
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {currentUser ? (
            <>
              <li><Link to="/patient-info">My Profile</Link></li>
              <li><Link to="/book-appointment">Book Consultation</Link></li>
              <li><Link to="/my-appointments">My Appointments</Link></li>
              {currentUser.role === 'doctor' && (
                <li><Link to="/doctor-schedule">My Schedule</Link></li>
              )}
              <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login / Register</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header; 