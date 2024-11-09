import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/BookingsList.css';  // Importing the CSS file

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);  // For error state

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings/vendor');
        setBookings(response.data.bookings || []);  // Ensure bookings is an array
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // If loading, show a loader or a loading message
  if (loading) {
    return <div>Loading bookings...</div>;
  }

  // If there's an error, display an error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bookings-container">
      <h3>Your Bookings</h3>
      <div className="bookings-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="booking-item" key={booking._id}>
              <div className="booking-details">
                <p className="booking-user">User: {booking.user.name}</p>
                <p className="booking-service">Service: {booking.service.title}</p>
                <p className="booking-date">Date: {new Date(booking.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsList;
