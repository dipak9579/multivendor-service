import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomeService.css';

const HomeService = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // To track selected category

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services/getAllService');
        setServices(response.data.services);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Filter services based on selected category
  const filteredServices = selectedCategory 
    ? services.filter(service => service.category === selectedCategory) 
    : services;  // If no category is selected, show all services

  return (
    <div className="home-service">
      <h2>Home Services</h2>
      
      {/* Category Dropdown */}
      <div className="filter-bar">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Painting">Painting</option>
         <option value="Other">Other</option>
        </select>
      </div>

      {/* Service Cards */}
      <div className="service-cards">
        {filteredServices.map((service) => (
          <div className="service-card" key={service._id}>
            <img 
              src={service.images[0]?.url || '/placeholder-image.jpg'} 
              alt={service.images[0]?.altText || service.title} 
              className="service-image" 
            />
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Category:</strong> {service.category}</p>
            <p><strong>Price:</strong> {service.pricing.amount} {service.pricing.currency}</p>
            <p><strong>Location:</strong> {`${service.location.city}, ${service.location.state}`}</p>
            <div className="service-rating">
              <strong>Rating:</strong> {service.rating} ⭐
            </div>
              <button className="book-button">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeService;
