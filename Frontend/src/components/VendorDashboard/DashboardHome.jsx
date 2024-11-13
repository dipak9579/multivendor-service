import React from 'react';
import './styles/DashboardHome.css';

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <h1>Welcome to Your Vendor Dashboard!</h1>
      <p>Here, you can manage your services, view bookings, and update your profile information.</p>
      
      <div className="dashboard-overview">
        <div className="overview-card">
          <h2>My Services</h2>
          <p>View, edit, or delete services that you offer to customers.</p>
          {/* <button>Go to Services</button> */}
        </div>

        <div className="overview-card">
          <h2>Bookings</h2>
          <p>Check your latest bookings and manage customer requests.</p>
          {/* <button>View Bookings</button> */}
        </div>

       
      </div>
    </div>
  );
};

export default DashboardHome;
