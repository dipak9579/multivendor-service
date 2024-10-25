import React, { useState,useEffect } from 'react'
import "./Navbar.css"
import account from "../../assets/user.png"
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
        <li>Home</li>
        <li>Services</li>
        <li>About Us</li>
      </ul>
      
      <div>
        <img className="profile-image" onClick={handleMenu} src={account} alt="account" />
          {isMenuOpen &&(
            <div className="menu">
              <button className='login-btn'>Login</button>
              <button className='signup-btn'>Sign up</button>
            </div>
          )}
      </div>
    </div>
  )
}

export default Navbar
