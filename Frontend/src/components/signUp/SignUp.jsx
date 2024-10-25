import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="signup-container">
      <h2 className="signup-title">Create an Account</h2>
      <form className="signup-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" className="signup-input" placeholder="Enter your name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="signup-input" placeholder="Enter your email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" className="signup-input" placeholder="Enter your password" />

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default SignUp;
