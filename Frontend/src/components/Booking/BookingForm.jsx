import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookingForm.css';

const BookingForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const serviceId = state?.serviceId;

  const [scheduledDate, setScheduledDate] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [location, setLocation] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const bookingData = {
        serviceId,
        scheduledDate,
        notes,
        duration,
        discount: {
          discountCode,
        },
        location,
        paymentAmount,
      };

      const response = await axios.post('http://localhost:5000/api/bookings/book', bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // On successful booking, navigate to the confirmation page and pass the actual booking data
      toast.success('Booking successful!');
      navigate('/confirmation', { state: { booking: response.data.booking } });
    } catch (error) {
      console.error('Error booking service:', error);
      toast.error('Failed to book service.');
    }
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({ ...prevLocation, [name]: value }));
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <ToastContainer />
      <h2>Book a Service</h2>

      <label>Scheduled Date:</label>
      <input
        type="datetime-local"
        value={scheduledDate}
        onChange={(e) => setScheduledDate(e.target.value)}
        required
      />

      <label>Notes:</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        maxLength={500}
      />

      <label>Duration (in minutes):</label>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <label>Discount Code:</label>
      <input
        type="text"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
      />

      <fieldset>
        <legend>Location</legend>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={location.address}
          onChange={handleLocationChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={location.city}
          onChange={handleLocationChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={location.state}
          onChange={handleLocationChange}
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={location.zipCode}
          onChange={handleLocationChange}
        />
      </fieldset>

      <label>Payment Amount:</label>
      <input
        type="number"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
        required
      />

      <button type="submit">Book Service</button>
    </form>
  );
};

export default BookingForm;
