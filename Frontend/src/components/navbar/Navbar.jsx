import React, { useState,useEffect } from 'react'
import "./Navbar.css"
import account from "../../assets/user.png"
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [sticky,setSticky]=useState(false)
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY>150?setSticky(true):setSticky(false);
    })
  },[])

  const [isMenuOpen,setIsMenuOpen]=useState(false);
  const handleMenu=()=>{
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <div className={`nav ${sticky?'dark-nav':''}`}>
      <h1 className='font-extrabold text-3xl ml-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>MultiServe</h1>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to='#'>Categories</Link></li>
        <li><Link to="#">About Us</Link></li>
      </ul>
      
      <div>
        <img className="profile-image" onClick={handleMenu} src={account} alt="account" />
          {isMenuOpen &&(
            <div className="menu">
              <button className='login'><Link to="/login">Login</Link></button>
              <button className='signup'> <Link to="/signup">Sign Up</Link></button>
              <button className='vendorLogin'> <Link to="/vendorLogin">vendor Login</Link></button>
            </div>
          )}
      </div>
    </div>
  )
}

export default Navbar
