import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles/VendorProfile.css';  // Import the CSS file

const VendorProfile = () => {
  const [profile, setProfile] = useState({ name: '', contactNumber: '', businessName: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('/api/vendor/profile');
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/vendor/profile', profile);
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="vendor-profile-container">
      <h3>Edit Profile</h3>
      <div className="form-field">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>
      <div className="form-field">
        <label>Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={profile.contactNumber}
          onChange={handleChange}
          placeholder="Enter your contact number"
        />
      </div>
      <div className="form-field">
        <label>Business Name</label>
        <input
          type="text"
          name="businessName"
          value={profile.businessName}
          onChange={handleChange}
          placeholder="Enter your business name"
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default VendorProfile;
