import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './GetBookings.css'; // Assume this file contains your CSS

const GetBookings = () => {
  const { user } = useAuth();  // Assuming useAuth provides user context
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/bookings/getBooking', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setBookings(response.data.bookings);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    const cancellationReason = prompt('Enter a reason for cancellation (optional):');
    
    if (!cancellationReason) {
        alert('Cancellation reason is required');
        return; // Avoid making the API call without a reason
    }

    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:5000/api/bookings/cancel/${bookingId}`, 
            { cancellationReason },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Update the bookings state to reflect the cancelled booking
        setBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking._id === bookingId ? { ...booking, status: 'Cancelled', cancellationReason } : booking
            )
        );

        alert('Booking cancelled successfully');
    } catch (error) {
        console.error('Error cancelling booking:', error.response?.data?.message || error.message);
        alert('Error cancelling booking');
    }
};


  if (loading) return <div>Loading your bookings...</div>;

  return (
    <div className="bookings-container">
      {/* Back Button */}
      <button className="btn-back" onClick={() => navigate(-1)}>Back</button> {/* navigate(-1) takes the user back to the previous page */}

      <h2>Your Booked Services</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-item">
              <h3>Service: {booking.service.name}</h3>
              <p><strong>Vendor:</strong> {booking.vendor.name}</p>
              <p><strong>Scheduled Date:</strong> {new Date(booking.scheduledDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Payment Status:</strong> {booking.payment.status}</p>
              {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
              {booking.status === 'Cancelled' && (
                <p><strong>Cancellation Reason:</strong> {booking.cancellationReason}</p>
              )}
              {booking.status !== 'Cancelled' && (
                <button 
                  className="btn-cancel" 
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetBookings;
