import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./ServicePost.css";

// Function to render stars based on the rating value
const renderStars = (rating) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star
  const emptyStars = 5 - Math.ceil(rating); // Number of empty stars

  return (
    <div className="star-rating">
      {Array(fullStars).fill(<span className="star full-star">★</span>)}
      {hasHalfStar && <span className="star half-star">☆</span>}
      {Array(emptyStars).fill(<span className="star empty-star">☆</span>)}
    </div>
  );
};

const ServicePost = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

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

  const handleBookNow = (serviceId) => {
    navigate('/book', { state: { serviceId } });
  };

  return (
    <div className="home-page">
      <h2>Available Services</h2>
      <div className="services-list">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <img 
              src={service.images?.[0]?.url || '/placeholder-image.jpg'} 
              alt={service.images?.[0]?.altText || service.title} 
              className="service-image" 
            />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p><strong>Category:</strong> {service.category}</p>
            {service.subCategory && (
              <p><strong>SubCategory:</strong> {service.subCategory}</p>
            )}
            <p><strong>Price:</strong> {service.pricing.amount} {service.pricing.currency}</p>
            <p><strong>Location:</strong> {`${service.location.city}, ${service.location.state}, ${service.location.country}`}</p>
            <div className="service-rating">
              <strong>Rating:</strong> 
              {service.averageRating !== null ? renderStars(service.averageRating) : 'No ratings yet'}
            </div>
            <button 
              className="book-button" 
              onClick={() => handleBookNow(service._id)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePost;
