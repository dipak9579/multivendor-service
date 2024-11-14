import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GetBookings.css';

const GetBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      toast.error('Cancellation reason is required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/bookings/cancel/${bookingId}`,
        { cancellationReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: 'Cancelled', cancellationReason } : booking
        )
      );

      toast.success('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error.response?.data?.message || error.message);
      toast.error('Error cancelling booking');
    }
  };

  const handleRateBooking = async (bookingId) => {
    const rating = prompt('Rate the service (1-5):');

    if (!rating || rating < 1 || rating > 5) {
      toast.error('Please provide a rating between 1 and 5.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/bookings/rate/${bookingId}`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, rating } : booking
        )
      );

      toast.success('Rating submitted successfully');
    } catch (error) {
      console.error('Error submitting rating:', error.response?.data?.message || error.message);
      toast.error('Error submitting rating');
    }
  };

  if (loading) return <div>Loading your bookings...</div>;

  return (
    <div className="bookings-container">
      <ToastContainer />
      <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
      <h2>Your Booked Services</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-item">
              <p><strong>Vendor:</strong> {booking.vendor.name}</p>
              <p><strong>Scheduled Date:</strong> {new Date(booking.scheduledDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Payment Status:</strong> {booking.payment.status}</p>
              {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
              {booking.status === 'Cancelled' && (
                <p><strong>Cancellation Reason:</strong> {booking.cancellationReason}</p>
              )}
              {booking.status !== 'Completed' && booking.status !== 'Cancelled' && (
                <button
                  className="btn-cancel"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              )}

              {booking.status === 'Completed' && !booking.rating && (
                <button
                  className="btn-rate"
                  onClick={() => handleRateBooking(booking._id)}
                >
                  Rate Service
                </button>
              )}
              {booking.rating && <p><strong>Your Rating:</strong> {booking.rating} / 5</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetBookings;
