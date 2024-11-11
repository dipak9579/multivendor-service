import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assumes you're using react-router
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Start as null to differentiate from loaded state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserInfo(response.data.user);
        } else {
          navigate('/login'); // Redirect to login if no token is found
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.put('http://localhost:5000/api/users/updateProfile', userInfo, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };



  if (!userInfo) return <div>Loading...</div>; // Show loading if user data isn't yet available

  return (
    <div className={`user-profile ${isEditing ? 'expanded' : ''}`}>
      <h2>User Profile</h2>
      <div className="profile-info">
        {isEditing ? (
          <div className="isEditing">
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
              readOnly // Make email read-only if it shouldn't be edited
            />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <button onClick={handleEditToggle}>Edit</button>
          </div>
        )}
      </div>
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
};

export default UserProfile;
