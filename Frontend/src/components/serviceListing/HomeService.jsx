// HomeService.js
import React, { useContext } from 'react';
import { ServiceContext } from '../../context/ServiceContext';
import { useNavigate } from 'react-router-dom';
import './Service.css';

// Function to render stars based on the rating value
const renderStars = (rating) => {
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


const HomeService = () => {
  const { filteredServices, selectedSubCategory, setSelectedSubCategory } = useContext(ServiceContext);
  const navigate = useNavigate();
  const handleBookNow = (serviceId) => {
    navigate('/book', { state: { serviceId } });
  };
  return (
    <div className="service-all">
      <h2>Home Services</h2>
      
      {/* Category Dropdown */}
      <div className="filter-bar">
        <select 
          value={selectedSubCategory} 
          onChange={(e) => setSelectedSubCategory(e.target.value)}
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
      <div className="service-cards1">
        {filteredServices.map((service) => (
          <div className="service-card1" key={service._id}>
            <img 
              src={service.images[0]?.url || '/placeholder-image.jpg'} 
              alt={service.images[0]?.altText || service.title} 
              className="service-image" 
            />
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>SubCategory:</strong> {service.subCategory}</p>
              <p><strong>Price:</strong> {service.pricing.amount} {service.pricing.currency}</p>
              <p><strong>Location:</strong> {`${service.location.city}, ${service.location.state}`}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeService;