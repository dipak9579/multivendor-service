import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles/ServiceList.css';  // Importing the CSS file

const ServiceList = () => {
  const [services, setServices] = useState([]); // Default to empty array

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('vendorToken');
        
        if (!token) {
          toast.error('You need to be logged in');
          return;
        }

        // Send request with the token in the Authorization header
        const response = await axios.get('http://localhost:5000/api/services/vendorService', {
          headers: {
            Authorization: `Bearer ${token}` // Pass token in Authorization header
          }
        });

        if (response.data && response.data.services) {
          setServices(response.data.services); // Update state if services are returned
        } else {
          setServices([]); // If no services in the response, default to empty array
        }
      } catch (error) {
        toast.error('Failed to load services');
        setServices([]); // Default to empty array on error
      }
    };
    fetchServices();
  }, []);

  const handleDelete = async (serviceId) => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('vendorToken');

      if (!token) {
        toast.error('You need to be logged in');
        return;
      }

      // Delete service with token authentication
      await axios.delete(`http://localhost:5000/api/services/deleteService/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass token in Authorization header
        }
      });

      setServices(services.filter((service) => service._id !== serviceId));
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <div className="service-list-container">
      <h3>Your Services</h3>
      <ul>
        {/* Add a check to avoid calling map on an undefined or null array */}
        {services && services.length > 0 ? (
          services.map((service) => (
            <li key={service._id} className="service-item">
              <h4>{service.title}</h4>
              <button onClick={() => handleDelete(service._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No services found.</p> // Fallback UI when there are no services
        )}
      </ul>
    </div>
  );
};

export default ServiceList;
