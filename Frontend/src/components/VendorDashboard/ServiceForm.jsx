
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles/ServiceForm.css';

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    pricing: { amount: 0, currency: 'INR' },
    location: { city: '', state: '', country: '', zipCode: '' },
    availability: { from: '', to: '' },
    images: [{ url: '', altText: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const field = name.split('.');
    
    if (field.length > 1) {
      setFormData((prev) => ({
        ...prev,
        [field[0]]: {
          ...prev[field[0]],
          [field[1]]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('vendorToken');
      const response = await axios.post(
        'http://localhost:5000/api/services/postService',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success(response.data.message);

      // Reset form data after successful submission
      setFormData({
        title: '',
        description: '',
        category: '',
        pricing: { amount: 0, currency: 'INR' },
        location: { city: '', state: '', country: '', zipCode: '' },
        availability: { from: '', to: '' },
        images: [{ url: '', altText: '' }],
      });
    } catch (error) {
      toast.error('Failed to post service');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="service-form">
      <h3>Post a New Service</h3>
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Category</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Electrical">Electrical</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Moving">Moving</option>
        <option value="Painting">Painting</option>
        <option value="IT Support">IT Support</option>
        <option value="Other">Other</option>
      </select>

      <label>Price</label>
      <input
        type="number"
        name="pricing.amount"
        value={formData.pricing.amount}
        onChange={handleChange}
        required
      />

      <label>Location</label>
      <input
        type="text"
        name="location.city"
        placeholder="City"
        value={formData.location.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location.state"
        placeholder="State"
        value={formData.location.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location.country"
        placeholder="Country"
        value={formData.location.country}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location.zipCode"
        placeholder="Zip Code"
        value={formData.location.zipCode}
        onChange={handleChange}
        required
      />

      <label>Availability</label>
      <input
        type="datetime-local"
        name="availability.from"
        value={formData.availability.from}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="availability.to"
        value={formData.availability.to}
        onChange={handleChange}
        required
      />

      <label>Images</label>
      <input
        type="text"
        name="images[0].url"
        placeholder="Image URL"
        value={formData.images[0].url}
        onChange={handleChange}
      />
      <input
        type="text"
        name="images[0].altText"
        placeholder="Image Alt Text"
        value={formData.images[0].altText}
        onChange={handleChange}
      />
      <button type="submit" className="submit-button">Post Service</button>
    </form>
  );
};

export default ServiceForm;
