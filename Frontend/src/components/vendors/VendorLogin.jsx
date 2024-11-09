import React, { useState, useEffect } from 'react';
import './VendorLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VendorLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  // Check if the vendor is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('vendorToken');
    if (token) {
      setIsLoggedIn(true); // Vendor is already logged in
      toast.info('You are already logged in!');
      navigate('/vendorDashboard'); // Redirect to vendor services page if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If already logged in, don't attempt to log in again
    if (isLoggedIn) {
      toast.info('You are already logged in!');
      return;
    }

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/api/vendors/login', formData);

      // Save the token in local storage
      localStorage.setItem('vendorToken', response.data.token);

      // Show success toast and redirect to dashboard after 1 second
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/vendorDashboard');
      }, 1000); // 1 second delay
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      toast.error(errorMessage); // Show error toast
    }
  };

  return (
    <div className="vendor-login">
      <ToastContainer />
      <h2>Vendor Login</h2>
      {isLoggedIn ? (
        <p>You are already logged in.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="submit-button">Login</button>
        </form>
      )}
      <p className="register-link">
        Don't have an account? <Link to="/vendorRegister">Register here</Link>.
      </p>
    </div>
  );
};

export default VendorLogin;
