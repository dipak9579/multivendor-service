import React, { useState, useEffect } from 'react';
import { useVendorAuth } from '../../components/VendorDashboard/context/VendorAuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardHome from './DashboardHome';
import ServiceForm from './ServiceForm';

import BookingsList from './BookingsList';


import './styles/VendorDashboard.css';
import VendorServices from './VendorServices';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { vendor, logout } = useVendorAuth();
  const navigate = useNavigate();

  // Redirect to vendor login if not authenticated
  useEffect(() => {
    if (!vendor) {
      navigate('/vendorLogin');
    }
  }, [vendor, navigate]);

  // Logout function
  const handleLogout = async () => {
    await logout();
    // Show the success toast
    toast.success('You have logged out successfully!', {
      position: "top-right",
      autoClose: 1000, // 2 seconds
    });

    // Redirect to home page after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="vendor-dashboard">
      <ToastContainer /> {/* Ensure ToastContainer is set up correctly */}

      <aside className="sidebar">
        <h2>Vendor Dashboard</h2>
        <nav>
          <button onClick={() => setActiveTab('home')}>Home</button>
          <button onClick={() => setActiveTab('postService')}>Post Service</button>
          <button onClick={() => setActiveTab('viewServices')}>View Services</button>
          <button onClick={() => setActiveTab('bookings')}>Bookings</button>
          
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>

      <main className="main-content">
        {activeTab === 'home' && <DashboardHome />}
        {activeTab === 'postService' && <ServiceForm />}
        {activeTab === 'viewServices' && <VendorServices/>}
        {activeTab === 'bookings' && <BookingsList />}
     
      </main>
    </div>
  );
};

export default VendorDashboard;
