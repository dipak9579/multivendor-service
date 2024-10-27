import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    address: { street: '', city: '', state: '', zipCode: '', country: '' }
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (['street', 'city', 'state', 'zipCode', 'country'].includes(id)) {
      setFormData(prevData => ({
        ...prevData,
        address: { ...prevData.address, [id]: value }
      }));
    } else {
      setFormData(prevData => ({ ...prevData, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      toast.success(response.data.message); // Show success toast

      // Clear form fields
      setFormData({
        name: '',
        email: '',
        password: '',
        contactNumber: '',
        address: { street: '', city: '', state: '', zipCode: '', country: '' }
      });

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 3000); // 3 seconds delay to show toast message
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed'); // Show error toast
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer /> {/* Toast container */}
      <h2 className="signup-title">Create an Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" className="signup-input" placeholder="Enter your name" value={formData.name} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="signup-input" placeholder="Enter your email" value={formData.email} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" className="signup-input" placeholder="Enter your password" value={formData.password} onChange={handleChange} />

        <label htmlFor="contactNumber">Contact Number</label>
        <input type="text" id="contactNumber" className="signup-input" placeholder="Enter your contact number" value={formData.contactNumber} onChange={handleChange} />

        {/* Address fields */}
        <label htmlFor="street">Street</label>
        <input type="text" id="street" className="signup-input" placeholder="Enter your street" value={formData.address.street} onChange={handleChange} />

        <label htmlFor="city">City</label>
        <input type="text" id="city" className="signup-input" placeholder="Enter your city" value={formData.address.city} onChange={handleChange} />

        <label htmlFor="state">State</label>
        <input type="text" id="state" className="signup-input" placeholder="Enter your state" value={formData.address.state} onChange={handleChange} />

        <label htmlFor="zipCode">Zip Code</label>
        <input type="text" id="zipCode" className="signup-input" placeholder="Enter your zip code" value={formData.address.zipCode} onChange={handleChange} />

        <label htmlFor="country">Country</label>
        <input type="text" id="country" className="signup-input" placeholder="Enter your country" value={formData.address.country} onChange={handleChange} />

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default SignUp;
