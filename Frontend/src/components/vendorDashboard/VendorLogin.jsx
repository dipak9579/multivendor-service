import React, { useState } from 'react';
import './VendorLogin.css';
import { Link } from 'react-router-dom';

const VendorLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic (e.g., API call)
    console.log(formData);
  };

  return (
    <div className="vendor-login">
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
