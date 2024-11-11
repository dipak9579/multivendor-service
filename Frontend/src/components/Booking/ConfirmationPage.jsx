import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Retrieve booking details from navigate state

  // If state is not available, show a fallback message
  const booking = state?.booking || {
    service: 'Service Name',
    scheduledDate: new Date().toLocaleString(),
    paymentAmount: 'Amount',
    location: {
      address: '123 Street',
      city: 'City',
      state: 'State',
      zipCode: '12345',
    },
  };

  return (
    <div className="confirmation-page">
      <h2>Booking Confirmed!</h2>
      <p>Thank you for booking with us. Here are your booking details:</p>

      <div className="booking-details">
        <p><strong>Service:</strong> {booking.service}</p>
        <p><strong>Scheduled Date:</strong> {new Date(booking.scheduledDate).toLocaleString()}</p>
        <p><strong>Payment Amount:</strong> ₹ {booking.payment.amount}</p>
        <p><strong>Location:</strong> {`${booking.location.address}, ${booking.location.city}, ${booking.location.state}, ${booking.location.zipCode}`}</p>
      </div>

      <button onClick={() => navigate('/services')}>Back to Services</button>
      <button onClick={() => navigate('/')}>Go to Dashboard</button>
    </div>
  );
};

export default ConfirmationPage;
