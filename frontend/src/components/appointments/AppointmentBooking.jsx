import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AppointmentBooking() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    specialty: '',
    reason: '',
    preferredDate: '',
    preferredTime: '',
    preferredLanguage: 'english'
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Reference to existing AppointmentBooking.jsx for form structure
  ```javascript:frontend/src/componentsssss/AppointmentBooking.jsx
  startLine: 89
  endLine: 217
  ```

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointmentData = {
        ...formData,
        doctor: selectedDoctor,
        cost: 75.00,
        patientId: currentUser.id
      };
      
      // Make API call to backend to save appointment
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        navigate('/payment', { state: { appointmentData } });
      }
    } catch (error) {
      console.error('Failed to book appointment:', error);
    }
  };

  return (
    // Reference to existing AppointmentBooking.jsx for JSX structure
    ```javascript:frontend/src/componentsssss/AppointmentBooking.jsx
    startLine: 85
    endLine: 220
    ```
  );
}

export default AppointmentBooking; 