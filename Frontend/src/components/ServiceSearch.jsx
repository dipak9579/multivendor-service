// components/ServiceSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const ServiceSearch = ({ onResults }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const query = new URLSearchParams();
      if (city) query.append('city', city);
      if (state) query.append('state', state);
      if (country) query.append('country', country);

      const response = await axios.get(`http://localhost:5000/api/services/search?${query.toString()}`);
      onResults(response.data);
    } catch (error) {
      console.error('Error searching for services:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px',marginTop:'50px' }}>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button type="submit" style={{padding:'10px',border:'none',borderRadius:'5px',backgroundColor:'#4caf50',color:'white',cursor:'pointer',}}>Search</button>
    </form>
  );
};

export default ServiceSearch;
