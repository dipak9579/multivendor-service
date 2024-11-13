// RealEstateAgentService.js
import React, { useContext } from 'react';
import { ServiceContext } from '../../context/ServiceContext';
import './Service.css';

const RealStateAgent = () => {
  const { filteredServices, selectedSubCategory, setSelectedSubCategory } = useContext(ServiceContext);

  return (
    <div className="service-all">
      <h2>Real Estate Agent Services</h2>
      
      {/* SubCategory Dropdown */}
      <div className="filter-bar">
        <select 
          value={selectedSubCategory} 
          onChange={(e) => setSelectedSubCategory(e.target.value)}
        >
          <option value="">Select SubCategory</option>
          <option value="Agent">Agent</option>
          <option value="Property Management">Property Management</option>
          <option value="Consultation">Consultation</option>
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
              <p><strong>SubCategory:</strong> {service.subCategory}</p>
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

export default RealStateAgent;
