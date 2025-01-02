import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './VerifyOtp.css';


const VerifyOtpVendor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve email from location state
  const emailFromState = location.state?.email || '';
  const [formData, setFormData] = useState({ email: emailFromState, otp: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/vendors/verify-otp', formData);
      toast.success(response.data.message);

      // Redirect to login page
      setTimeout(() => {
        navigate('/VendorLogin');
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="verify-otp-container">
      <ToastContainer />
      <h2>Verify Your Email</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />

        <label htmlFor="otp">OTP</label>
        <input
          type="text"
          id="otp"
          value={formData.otp}
          onChange={handleChange}
          required
          placeholder="Enter your OTP"
        />

        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOtpVendor;
