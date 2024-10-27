// Login.js
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

      // Show success toast
      toast.success(response.data.message);
      
      // Save token to localStorage or session (optional, depending on your auth setup)
      localStorage.setItem('token', response.data.token);

      // Redirect to home page
      navigate('/');
    } catch (error) {
      // Show error toast
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <ToastContainer/>
      <h2 className='mb-7 text-2xl font-bold'>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p className='login-link'>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
