import React, { useState } from 'react';
import './VendorRegister.css';
import { Link } from 'react-router-dom';

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    email: '',
    password: '',
    phone: '',
    company: '',
    website: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    console.log(formData);
  };

  return (
    <div className="vendor-registration">
      <h2>Vendor Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Vendor Name
          <input
            type="text"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            required
          />
        </label>
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
        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Company Name
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </label>
        <label>
          Website
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="submit-button">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/vendorLogin">Login here</Link>.
      </p>
    </div>
  );
};

export default VendorRegister;
