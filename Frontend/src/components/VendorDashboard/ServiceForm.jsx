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
  });
  const [imageFile, setImageFile] = useState(null); // State for selected image file

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

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('vendorToken');

      // Prepare FormData
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('pricing[amount]', formData.pricing.amount);
      data.append('pricing[currency]', formData.pricing.currency);
      data.append('location[city]', formData.location.city);
      data.append('location[state]', formData.location.state);
      data.append('location[country]', formData.location.country);
      data.append('location[zipCode]', formData.location.zipCode);
      data.append('availability[from]', formData.availability.from);
      data.append('availability[to]', formData.availability.to);

      if (imageFile) {
        data.append('image', imageFile); // Append the image file
      }

      const response = await axios.post(
        'http://localhost:5000/api/services/postService',
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        }
      );

      toast.success(response.data.message);

      // Reset form data and image file after successful submission
      setFormData({
        title: '',
        description: '',
        category: '',
        pricing: { amount: 0, currency: 'INR' },
        location: { city: '', state: '', country: '', zipCode: '' },
        availability: { from: '', to: '' },
      });
      setImageFile(null);
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

      <label>Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <button type="submit" className="submit-button">Post Service</button>
    </form>
  );
};

export default ServiceForm;
