import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>Dashboard</li>
        <li>Users</li>
        <li>Settings</li>
        <li>Reports</li>
        <li>Log Out</li>
      </ul>
    </div>
  );
};

export default Sidebar;
