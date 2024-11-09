import React, { useState } from 'react';
import DashboardHome from './DashboardHome';
import ServiceForm from './ServiceForm';
import ServiceList from './ServiceList';
import BookingsList from './BookingsList';
import VendorProfile from './VendorProfile';
import './styles/VendorDashboard.css';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

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
