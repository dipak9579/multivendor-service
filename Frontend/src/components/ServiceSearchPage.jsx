// pages/ServiceSearchPage.js
import React, { useState } from 'react';
import ServiceSearch from '../components/ServiceSearch';
import ServiceLists from '../components/ServiceLists'
// import ServicePost from './ServiceCreate/ServicePost';

const ServiceSearchPage = () => {
  const [services, setServices] = useState([]);

  const handleSearchResults = (results) => {
    setServices(results);
  };

  return (
    <div style={{ padding: '20px' }}>
 
      <ServiceSearch onResults={handleSearchResults} />
      {/* <ServicePost services={services} nearData={"Your Near Services"} /> */}
      <ServiceLists services={services}/>
    </div>
  );
};

export default ServiceSearchPage;
