import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ServicePost.css";

const ServicePost = () => {
  const [services, setServices] = useState([]);

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

  return (
    <div className="home-page">
      <h2>Available Services</h2>
      <div className="services-list">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <img 
              src={service.imageUrl} 
              alt={service.title} 
              className="service-image" 
            />
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
        ))}
      </div>
    </div>
  );
};

export default ServicePost;
