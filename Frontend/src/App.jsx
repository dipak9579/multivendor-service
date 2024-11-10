// App.js
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
import SignUp from './components/signUp/SignUp';
import Login from './components/Login/Login';
import VendorRegister from './components/vendors/VendorRegister';
import VendorLogin from './components/vendors/VendorLogin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import VendorServices from './components/vendors/VendorServices';
import VendorDashboard from './components/VendorDashboard/VendorDashboard';

import { VendorAuthProvider } from './components/VendorDashboard/context/VendorAuthContext';
import VendorProtectedRoute from './components/VendorDashboard/context/VendorProtectedRoute';

import HomeService from './components/serviceListing/HomeService';
import UserProfile from './components/navbar/UserProfile';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import Home from './components/Home';
import ServiceForm from './components/VendorDashboard/ServiceForm';



// HomePage component to use `user` inside AuthProvider context
const HomePage = () => {
  const { user } = useAuth();
  
  return (
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
      <Home/>
      <Footer />
  
      {/* {user && <UserProfile />}  */}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
           <VendorAuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page route */}
          <Route path="/vendorRegister" element={<VendorRegister />} />
          <Route path="/vendorLogin" element={<VendorLogin />} />

          <Route
              path="/vendorDashboard"
              element={
                <VendorProtectedRoute>
                  <VendorDashboard />
                </VendorProtectedRoute>
              }
            />
            <Route path="/getAllService" element={<Home/>}/>
         

            <Route path="/postService" element={<ServiceForm/>}/>
         
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/home-service" element={<HomeService />} />
          <Route path="/admin" element={<AdminDashboard />} />
        
        </Routes>
      </Router>
      </VendorAuthProvider>
    </AuthProvider>
  );
};

export default App;