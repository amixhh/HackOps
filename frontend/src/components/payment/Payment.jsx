import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const consultationData = location.state?.consultationData;

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate(`/video-consultation/${consultationData.id}`);
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Complete Payment</h2>
      <div className="payment-summary">
        <h3>Consultation Details</h3>
        <p>Specialty: {consultationData?.specialty}</p>
        <p>Amount: $50.00</p>
      </div>
      
      <form onSubmit={handlePayment}>
        <div className="form-group">
          <label>Card Number</label>
          <input type="text" placeholder="1234 5678 9012 3456" required />
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <input type="text" placeholder="MM/YY" required />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input type="text" placeholder="123" required />
        </div>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}

export default Payment; 