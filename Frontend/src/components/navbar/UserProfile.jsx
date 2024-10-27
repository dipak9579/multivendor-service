import React, { useState } from 'react';
import './UserProfile.css'; // Import your CSS file

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    // Implement your logout logic here
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        {isEditing ? (
          <div className='isEditing'>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
            />
            <button onClick={handleEditToggle}>Save</button>
          </div>
        ) : (
          <div>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <button onClick={handleEditToggle}>Edit Profile</button>
          </div>
        )}
      </div>
    <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default UserProfile;
