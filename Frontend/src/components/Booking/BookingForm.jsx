import React, { useState, useEffect } from 'react';
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
  const [currency, setCurrency] = useState('');
  const [serviceDetails, setServiceDetails] = useState(null); // Store the service details

  // Fetch service details when the component mounts
  useEffect(() => {
    if (serviceId) {
      const fetchServiceDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/services/getService/${serviceId}`);
          const service = response.data;

          setServiceDetails(service); // Set the service details in state
          setPaymentAmount(service.pricing.amount); // Set the price
          setCurrency(service.pricing.currency); // Set the currency
        } catch (error) {
          console.error('Error fetching service details:', error);
          toast.error('Failed to fetch service details.');
        }
      };

      fetchServiceDetails();
    }
  }, [serviceId]);

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

      {serviceDetails ? (
        <div>
          <label>Payment Amount ({currency}):</label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            required
          />
        </div>
      ) : (
        <p>Loading service details...</p> // Show loading message until the service details are fetched
      )}

      <button className="book-btn1" type="submit">Book Service</button>
    </form>
  );
};

export default BookingForm;
