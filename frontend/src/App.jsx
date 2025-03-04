// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import BookConsultation from './components/consultation/BookConsultation';
import VideoConsultation from './components/consultation/VideoConsultation';
import PatientInfo from './components/profile/PatientInfo';
import Payment from './components/payment/Payment';
import MyAppointments from './components/appointments/MyAppointments';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patient-info" element={<PatientInfo />} />
              <Route path="/book-consultation" element={<BookConsultation />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/video-consultation/:sessionId" element={<VideoConsultation />} />
              <Route path="/my-appointments" element={<MyAppointments />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;