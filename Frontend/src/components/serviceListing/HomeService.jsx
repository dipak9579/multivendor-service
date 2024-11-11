import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomeService.css';

const HomeService = () => {
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

  const homeServices = services.filter(service => service.category === 'Plumbing'); // Filter by Home category

  return (
    <div className="home-service">
      <h2>Home Services</h2>
      <div className="service-cards">
        {homeServices.map((service) => (
          <div className="service-card" key={service._id}>
            <img 
              src={service.images[0]?.url || '/placeholder-image.jpg'} 
              alt={service.images[0]?.altText || service.title} 
              className="service-image" 
            />
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Price:</strong> {service.pricing.amount} {service.pricing.currency}</p>
              <button className="book-button">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeService;
