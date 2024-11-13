import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles/VendorServices.css';

const VendorServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch vendor's services on component mount
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('vendorToken');
        const response = await axios.get('http://localhost:5000/api/services/vendorService', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(response.data.services);  // Update state with services
      } catch (error) {
        toast.error('Failed to fetch services');
      }
    };

    fetchServices();
  }, []);

  // Delete a service
  const handleDelete = async (serviceId) => {
    try {
      const token = localStorage.getItem('vendorToken');
      await axios.delete(`http://localhost:5000/api/services/deleteService/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted service from the state
      setServices(services.filter(service => service._id !== serviceId));
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <div className="vendor-services">
      <h2>Your Created Services</h2>
      <div className="services-list">
        {services.length === 0 ? (
          <p>No services available</p>
        ) : (
          services.map((service) => (
            <div key={service._id} className="service-card">
                  {service.images.length > 0 && (
                <div className="service-images">
                  {service.images.map((image, index) => (
                    <img key={index} src={image.url} alt={image.altText} />
                  ))}
                </div>
              )}
              <h3>{service.title}</h3>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Price:</strong> {service.pricing.amount} {service.pricing.currency}</p>
              <p><strong>Location:</strong> {service.location.city}, {service.location.state}</p>
              <p><strong>Availability:</strong> {new Date(service.availability.from).toLocaleString()} to {new Date(service.availability.to).toLocaleString()}</p>

            

              <button
                className="delete-button"
                onClick={() => handleDelete(service._id)}
              >
                Delete Service
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VendorServices;
