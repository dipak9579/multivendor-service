import React from 'react';
import './MainContent.css';

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="statistics">
        <div className="stat-card">Total Users: 100</div>
        <div className="stat-card">Active Users: 80</div>
        <div className="stat-card">Pending Approvals: 20</div>
      </div>
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          <li>User John Doe signed in</li>
          <li>User Jane Smith created a new post</li>
          <li>User Bob Johnson approved a comment</li>
        </ul>
      </div>
    </div>
  );
};

export default MainContent;
