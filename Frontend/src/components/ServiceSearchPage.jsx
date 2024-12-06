// pages/ServiceSearchPage.js
import React, { useState } from 'react';
import ServiceSearch from '../components/ServiceSearch';
import ServiceLists from '../components/ServiceLists';

const ServiceSearchPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);  // Track loading state
  const [error, setError] = useState('');        // Track error state

  const handleSearchResults = (results) => {
    setServices(results);
    setLoading(false); // Stop loading when results are received
    setError('');      // Clear error if results are received
  };

  const handleLoading = () => {
    setLoading(true);  // Set loading to true when search starts
    setError('');      // Clear error on new search
  };

  const handleError = (message) => {
    setError(message); // Set error message if something goes wrong
    setLoading(false); // Stop loading on error
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Pass handleLoading and handleError to ServiceSearch to manage loading and error states */}
      <ServiceSearch 
        onResults={handleSearchResults} 
        onLoading={handleLoading} 
        onError={handleError} 
      />
      
      {/* Display loading state, error message, or services */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ServiceLists services={services} />
    </div>
  );
};

export default ServiceSearchPage;
