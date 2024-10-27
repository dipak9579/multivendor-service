import React from 'react';
import './ServiceListing.css';
import { useNavigate } from 'react-router-dom';

const serviceData = [
  {
    id: 1,
    title: 'Premium Photography',
    description: 'Capture your special moments with high-quality photography.',
    image: 'https://via.placeholder.com/150',
    rating: 4.8,
    price: '$150',
    category: 'Photography',
  },
  {
    id: 2,
    title: 'Wedding Catering',
    description: 'Delicious and customizable menu options for your wedding.',
    image: 'https://via.placeholder.com/150',
    rating: 4.6,
    price: '$500',
    category: 'Catering',
  },
  // Add more service data as needed
];

const ServiceListing = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId) => {
    if (!isLoggedIn) {
      alert('Please log in to book services.');
      navigate('/login');
    } else {
      // Redirect to the booking page for the selected service
      navigate(`/services/${serviceId}`);
    }
  };

  return (
    <div className="service-listings">
      <div className="service-cards">
        {serviceData.map((service) => (
          <div className="service-card" key={service.id}>
            <img src={service.image} alt={service.title} className="service-image" />
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p>Rating: {service.rating} ★</p>
              <p>Price: {service.price}</p>
              <button className="book-button" onClick={() => handleServiceClick(service.id)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceListing;
