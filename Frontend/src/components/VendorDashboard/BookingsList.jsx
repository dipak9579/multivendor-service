import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/BookingsList.css';
import { useVendorAuth } from '../../components/VendorDashboard/context/VendorAuthContext';

const BookingsList = () => {
  const { vendor } = useVendorAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!vendor) {
        setError('Unauthorized access. Please login first.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/bookings/getVendorBooking', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,
          },
        });

        setBookings(response.data.bookings || []);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [vendor]);

  const handleCompleteBooking = async (bookingId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/bookings/complete/${bookingId}`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,
          },
        }
      );

      // Update the booking status in the UI
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: 'Completed', completionDate: new Date().toISOString() } : booking
        )
      );

      alert(response.data.message);
    } catch (error) {
      console.error('Error completing booking:', error.response?.data?.message || error.message);
      alert('Error completing booking');
    }
  };

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bookings-container">
      <h3>Your Bookings</h3>
      <div className="bookings-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="booking-item" key={booking._id}>
              <div className="booking-details1">
                <p className="booking-user">User: {booking.user.name}</p>
                <p className="booking-service">Service: {booking.service.title}</p>
                <p className="booking-date">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p className="booking-location">
                  Location: {`${booking.location.address}, ${booking.location.city}, ${booking.location.state} ${booking.location.zipCode}`}
                </p>
                <p className="booking-status">Status: {booking.status}</p>
                
                {booking.status !== 'Completed' && booking.status !== 'Cancelled' && (
                  <button 
                    className="btn-complete" 
                    onClick={() => handleCompleteBooking(booking._id)}
                  >
                    Complete Booking
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className='no-p'>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsList;
