import React, { useState } from 'react';
import { useVendorAuth } from '../../components/VendorDashboard/context/VendorAuthContext'; // Import vendor auth context
import { useNavigate } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import ServiceForm from './ServiceForm';
import ServiceList from './ServiceList';
import BookingsList from './BookingsList';
import VendorProfile from './VendorProfile';

import './styles/VendorDashboard.css';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { vendor, logout } = useVendorAuth(); // Access vendor and logout function
  const navigate = useNavigate();

  // Redirect to vendor login if not authenticated
  if (!vendor) {
    navigate('/vendorLogin');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="vendor-dashboard">

      
        <aside className="sidebar">
          <h2>Vendor Dashboard</h2>
          <nav>
            <button onClick={() => setActiveTab('home')}>Home</button>
            <button onClick={() => setActiveTab('postService')}>Post Service</button>
            <button onClick={() => setActiveTab('viewServices')}>View Services</button>
            <button onClick={() => setActiveTab('bookings')}>Bookings</button>
            <button onClick={() => setActiveTab('profile')}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </aside>

        <main className="main-content">
          {activeTab === 'home' && <DashboardHome />}
          {activeTab === 'postService' && <ServiceForm />}
          {activeTab === 'viewServices' && <ServiceList />}
          {activeTab === 'bookings' && <BookingsList />}
          {activeTab === 'profile' && <VendorProfile />}
        </main>
      </div>
   
  );
};

export default VendorDashboard;
