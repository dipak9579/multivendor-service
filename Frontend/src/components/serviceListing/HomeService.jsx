// HomeService.jsx
import React, { useState } from 'react';
import dipak from "../../assets/dipak1.jpg"
import './HomeService.css'; // Import your CSS file

const HomeService = () => {
  const [category, setCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Rating');

  // Sample services data
  const allServices = [
    {
      id: 1,
      title: 'Plumbing Service',
      description: 'Expert plumbing services for all needs.',
      image: dipak, // Replace with your image path
      rating: 4.5,
      price: 100,
      category: 'Plumbing'
    },
    {
      id: 2,
      title: 'Electrical Service',
      description: 'Qualified electricians for your home.',
      image: 'electrical.jpg', // Replace with your image path
      rating: 4.7,
      price: 150,
      category: 'Electrical'
    },
    {
      id: 3,
      title: 'Cleaning Service',
      description: 'Professional cleaning for your space.',
      image: 'cleaning.jpg', // Replace with your image path
      rating: 4.2,
      price: 80,
      category: 'Cleaning'
    },
    {
      id: 4,
      title: 'Gardening Service',
      description: 'Expert gardening services.',
      image: 'gardening.jpg', // Replace with your image path
      rating: 4.8,
      price: 120,
      category: 'Gardening'
    },
    // Add more services as needed
  ];

  // Filter services based on category
  const filteredServices = allServices.filter((service) => {
    return category === 'All Categories' || service.category === category;
  });

  // Sort services based on the selected sorting option
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'Rating') {
      return b.rating - a.rating; // Descending order
    } else if (sortBy === 'Price: Low to High') {
      return a.price - b.price; // Ascending order
    } else if (sortBy === 'Price: High to Low') {
      return b.price - a.price; // Descending order
    }
    return 0;
  });

  return (
    <div className="home-service">
      <div className="filter-sort-bar">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All Categories</option>
          <option>Plumbing</option>
          <option>Electrical</option>
          <option>Cleaning</option>
          <option>Gardening</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option>Rating</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <div className="service-cards">
        {sortedServices.map((service) => (
          <div className="service-card" key={service.id}>
            <img src={service.image} alt={service.title} className="service-image" />
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p>Rating: {service.rating}</p>
              <p>Price: ${service.price}</p>
              <button className="book-button">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeService;
