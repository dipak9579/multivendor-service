import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './VendorRegister.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    businessName: '',
    businessAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('businessAddress')) {
      const addressField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        businessAddress: {
          ...prevData.businessAddress,
          [addressField]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/vendors/register', formData);
      toast.success(response.data.message);

      // Redirect to the VerifyOtp page with email as state
      navigate('/verifyOtp', { state: { email: formData.email } });

      setFormData({
        name: '',
        email: '',
        password: '',
        contactNumber: '',
        businessName: '',
        businessAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="vendor-register">
      <ToastContainer />
      <h2>Vendor Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
          Contact Number
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
        </label>
        <label>
          Business Name
          <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required />
        </label>
        <fieldset>
          <legend>Business Address</legend>
          <label>
            Street
            <input type="text" name="businessAddress.street" value={formData.businessAddress.street} onChange={handleChange} />
          </label>
          <label>
            City
            <input type="text" name="businessAddress.city" value={formData.businessAddress.city} onChange={handleChange} />
          </label>
          <label>
            State
            <input type="text" name="businessAddress.state" value={formData.businessAddress.state} onChange={handleChange} />
          </label>
          <label>
            Zip Code
            <input type="text" name="businessAddress.zipCode" value={formData.businessAddress.zipCode} onChange={handleChange} />
          </label>
          <label>
            Country
            <input type="text" name="businessAddress.country" value={formData.businessAddress.country} onChange={handleChange} />
          </label>
        </fieldset>
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default VendorRegister;
