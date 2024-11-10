import React, { useState, useEffect } from 'react';
import axios from 'axios';  // To make HTTP requests
import "./styles/VendorProfile.css";  // Import the corresponding CSS file

const VendorProfile = () => {
  const [vendorData, setVendorData] = useState(null);  // State to hold vendor data
  const [loading, setLoading] = useState(true);  // State for loading
  const [error, setError] = useState(null);  // State to handle errors

  useEffect(() => {
    // Fetch the vendor data after login
    const fetchVendorData = async () => {
      const token = localStorage.getItem('vendorToken');  // Get the JWT token from localStorage

      if (!token) {
        // If no token found, redirect to login or show an error
        setError('You need to log in to view your profile.');
        setLoading(false);
        return;
      }

      try {
        // Make the request to the backend to get vendor details
        const response = await axios.get('http://localhost:5000/api/vendors/profile', {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in Authorization header
          },
        });

        setVendorData(response.data.vendor);  // Set vendor data from the response
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch vendor details. Please try again later.');
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);  // Empty dependency array ensures this effect runs only once when the component mounts

  if (loading) {
    return <p>Loading...</p>;  // Show loading message while data is being fetched
  }

  if (error) {
    return <p>{error}</p>;  // Show error message if there's an issue
  }

  if (!vendorData) {
    return <p>No vendor data found.</p>;  // Fallback if vendorData is null
  }

  return (
    <div className="vendor-profile">
      <h2>Vendor Profile</h2>
      
      <div className="profile-details">
        <div className="profile-section">
          <h3>Business Information</h3>
          <p><strong>Business Name:</strong> {vendorData.businessName}</p>
          <p><strong>Email:</strong> {vendorData.email}</p>
          <p><strong>Phone:</strong> {vendorData.contactNumber}</p>
        </div>

        
        
      </div>
    </div>
  );
};

export default VendorProfile;
