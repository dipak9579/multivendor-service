import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Hero from './components/Hero/Hero';
import FeatureService from './components/FeaturedService/FeatureSevice';
import Category from './components/categories/Category';
import Testimonials from './components/Testimonials/Testimonials';
import Benefits from './components/Benefits/Benefits';
import TrustBadges from './components/TrustBadge/TrustBadges';
import ContactUs from './components/contact/ContactUs';
import Endorsements from './components/Endorsement/Endorsements';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import SignUp from './components/signUp/SignUp'; // Import SignUp component
import Login from './components/Login/Login'; // Import Login component
import VendorRegister from './components/vendorDashboard/VendorRegister';
import VendorLogin from './components/vendorDashboard/VendorLogin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import VendorServices from './components/vendorDashboard/VendorServices';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Route for the main page */}
        <Route path="/" element={
          <>
            <Hero />
            <FeatureService />
            <Category />
            <Testimonials />
            <Benefits />
            <TrustBadges />
            <ContactUs />
            <Endorsements />
            <FAQ />
            <Footer />
          
          </>
        } />
        <Route path="/vendorRegister" element={<VendorRegister/>}/>
        <Route path="/vendorLogin" element={<VendorLogin/>}/>
        <Route path="/vendorServices" element={<VendorServices/>}/>

     
        {/* Route for Sign Up */}
        <Route path="/signup" element={<SignUp />} />
        {/* Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* admin routes */}
        <Route path="/admin" element={<AdminDashboard/>} />

      </Routes>
    </Router>
  );
};

export default App;
