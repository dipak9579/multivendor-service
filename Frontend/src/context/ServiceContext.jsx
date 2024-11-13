// ServiceContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ServiceContext = createContext();

export const ServiceProvider = ({ children, serviceType }) => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/services/${serviceType}`);
        setServices(response.data.services);
      } catch (error) {
        console.error(`Error fetching ${serviceType} services:`, error);
      }
    };

    fetchServices();
  }, [serviceType]);

  // Filter services based on selected category and subCategory
  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory ? service.category === selectedCategory : true;
    const matchesSubCategory = selectedSubCategory ? service.subCategory === selectedSubCategory : true;

    return matchesCategory && matchesSubCategory;
  });

  return (
    <ServiceContext.Provider 
      value={{
        filteredServices,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
