import React from 'react';
import './VendorServices.css'; // Import the CSS for styling

const servicesData = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    title: 'Service One',
    rating: 4.5,
    price: '$50',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    title: 'Service Two',
    rating: 4.0,
    price: '$70',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150',
    title: 'Service Three',
    rating: 5.0,
    price: '$100',
  },
];

const VendorServices = () => {
  return (
    <div className="vendor-services-container">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {servicesData.map((service) => (
          <div className="service-card" key={service.id}>
            <img src={service.image} alt={service.title} className="service-image" />
            <h3 className="service-title">{service.title}</h3>
            <p className="service-rating">Rating: {service.rating} ★</p>
            <p className="service-price">{service.price}</p>
            <button className="book-button">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorServices;
