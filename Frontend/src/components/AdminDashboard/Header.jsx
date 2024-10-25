import React from 'react';
import './Header.css';
import admin from "../../assets/dipak1.jpg"

const Header = () => {
  return (
    <div className="header">
      <h1>Welcome to Admin Dashboard</h1>
      <div className="user-info">
        <span>Admin</span>
        <img src={admin} className="profile-image" />
      </div>
    </div>
  );
};

export default Header;
