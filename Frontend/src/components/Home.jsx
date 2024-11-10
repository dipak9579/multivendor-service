import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css"

const Home = () => {
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
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p><strong>Category:</strong> {service.category}</p>
            <p><strong>Price:</strong> {service.pricing.amount} {service.pricing.currency}</p>
            <p><strong>Location:</strong> {`${service.location.city}, ${service.location.state}`}</p>
            {/* Add additional fields if necessary */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
