import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/BookingsList.css';  // Importing the CSS file
import { useVendorAuth } from '../../components/VendorDashboard/context/VendorAuthContext'; // Importing the context

const BookingsList = () => {
  const { vendor } = useVendorAuth();  // Access vendor data from context
  const [bookings, setBookings] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);  // For error state

  useEffect(() => {
    const fetchBookings = async () => {
      if (!vendor) {
        setError('Unauthorized access. Please login first.');
        setLoading(false);
        return;
      }

      try {
        // Use the vendor token from context
        const response = await axios.get('http://localhost:5000/api/bookings/getVendorBooking', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,  // You can use vendorToken here
          },
        });

        console.log(response.data);  // Log to inspect the structure of the response
        setBookings(response.data.bookings || []);  // Adjust based on actual response
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [vendor]);  // Dependency on vendor context

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
              <div className="booking-details1">
                <p className="booking-user">User: {booking.user.name}</p>
                <p className="booking-service">Service: {booking.service.title}</p>
                <p className="booking-date">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p> {/* Updated this */}
                
                {/* Render location properties separately */}
                <p className="booking-location">
                  Location: {`${booking.location.address}, ${booking.location.city}, ${booking.location.state} ${booking.location.zipCode}`}
                </p>
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
