import React, { useState, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';
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
    const response = await axios.post('http://localhost:5000/api/vendors/login', formData);
    
    const token = response.data.token;
    localStorage.setItem('vendorToken', token);

    // Decode the token to get vendor data and set in context
    const decodedToken = jwtDecode(token);
    setVendor({ id: decodedToken.id }); // Assuming the token has 'id'

    toast.success('Login successful!');
    setTimeout(() => {
      navigate('/vendorDashboard');
    }, 1000); // 1-second delay
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Login failed';
    toast.error(errorMessage);
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