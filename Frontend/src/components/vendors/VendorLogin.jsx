import React, { useState, useContext } from 'react';
import './VendorLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVendorAuth } from '../../components/VendorDashboard/context/VendorAuthContext'; // import the context

const VendorLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setVendor } = useVendorAuth(); // Access setVendor from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/api/vendors/login', formData);

      // Save the token in local storage
      localStorage.setItem('vendorToken', response.data.token);

      // Update the vendor state in the context
      setVendor(true);  // Set vendor as authenticated

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

      <p className="register-link">
        Don't have an account? <Link to="/vendorRegister">Register here</Link>.
      </p>
    </div>
  );
};

export default VendorLogin;
