import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import account from "../../assets/user.png";
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import VendorProfile from '../../components/VendorDashboard/VendorProfile'; // Assuming you have a separate component for vendor profile
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth(); // Destructure the user from the context
  const [sticky, setSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if the vendor is logged in by looking for vendorToken in localStorage
  const vendorToken = localStorage.getItem('vendorToken');

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 150 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`nav ${sticky ? 'dark-nav' : ''}`}>
      <h1 className='font-extrabold text-3xl ml-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
        MultiServe
      </h1>

      {/* Render Vendor Navbar if logged in as Vendor */}
      {vendorToken ? (
        <ul>
          <li><Link to="/vendorDashboard">Vendor Dashboard</Link></li>
          <li><Link to='/vendorServices'>Manage Services</Link></li>
          <li><Link to="/vendorBookings">Bookings</Link></li>
        </ul>
      ) : (
        // Render Default Navbar for Users
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to='/vendorServices'>Categories</Link></li>
          <li><Link to="#">About Us</Link></li>
        </ul>
      )}

      <div>
        <img className="profile-image" onClick={handleMenu} src={account} alt="account" />
        {isMenuOpen && (
          <div className="menu">
            {user || vendorToken ? (
              vendorToken ? (
                <VendorProfile /> // Render Vendor Profile for vendor
              ) : (
                <UserProfile /> // Render User Profile for logged-in users
              )
            ) : (
              <>
                <button className='login'><Link to="/login">Login</Link></button>
                <button className='signup'><Link to="/signup">Sign Up</Link></button>
                <button className='vendorLogin'><Link to="/vendorLogin">Vendor Login</Link></button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
