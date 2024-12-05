// components/ServiceList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/ServiceCreate/ServicePost.css';

// Function to render stars based on the rating value
const renderStars = (rating) => {
  // Validate if the rating is a valid number between 0 and 5
  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    return <span>No ratings yet</span>;
  }

  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star
  const emptyStars = 5 - Math.ceil(rating); // Number of empty stars

  return (
    <div className="star-rating">
      {/* Full stars */}
      {Array.from({ length: fullStars }, (_, index) => (
        <span key={`full-${index}`} className="star full-star">★</span>
      ))}
      {/* Half star, if applicable */}
      {hasHalfStar && <span className="star half-star">☆</span>}
      {/* Empty stars */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <span key={`empty-${index}`} className="star empty-star">☆</span>
      ))}
    </div>
  );
};

const ServiceLists = ({ services }) => {
  const navigate = useNavigate();

  // Function to handle "Book Now" button click
  const handleBookNow = (serviceId) => {
    navigate('/book', { state: { serviceId } });
  };

  return (
    <div className="services-list">
      {services.length > 0 ? (
        services.map((service) => (
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
            <p><strong>Price:</strong> {`${service.pricing.amount} ${service.pricing.currency}`}</p>
            <p><strong>Location:</strong> {`${service.location.city}, ${service.location.state}, ${service.location.country}`}</p>
            <div className="service-rating">
              <strong>Rating:</strong>
              {service.averageRating !== null && service.averageRating !== undefined
                ? renderStars(service.averageRating)
                : <span>No ratings yet</span>}
            </div>
            {/* Book Now Button */}
            <button 
              className="book-button" 
              onClick={() => handleBookNow(service._id)}
            >
              Book Now
            </button>
          </div>
        ))
      ) : (
        <p>No services found.</p>
      )}
    </div>
  );
};

export default ServiceLists;
