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

import ServiceForm from './components/VendorDashboard/ServiceForm';
import ServicePost from './components/ServiceCreate/ServicePost';
import BookingForm from './components/Booking/BookingForm';
import ConfirmationPage from './components/Booking/ConfirmationPage';
import GetBookings from './components/Booking/GetBookings';
import AboutUs from './components/navbar/AboutUs';
import { ServiceProvider } from './context/ServiceContext';
import BeautyService from './components/serviceListing/BeautyService';
import RealStateAgent from './components/serviceListing/RealStateAgent';
import ServiceSearchPage from './components/ServiceSearchPage';
import VerifyOtp from './components/VerifyOtp';
import VerifyOtpVendor from './components/VerifyOtpVendor';

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
      <Endorsements />
      <FAQ />

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <VendorAuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path="/services/search" element={<ServiceSearchPage />} />
            <Route path="/verify-otp" element={<VerifyOtp/>} />


            <Route path='/getBookings' element={<ProtectedRoute><GetBookings /></ProtectedRoute>} />

            <Route path='/book' element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
            <Route path='/confirmation' element={<ProtectedRoute><ConfirmationPage /></ProtectedRoute>} />

            <Route path="/vendorRegister" element={<VendorRegister />} />
            <Route path="/verifyOtp" element={<VerifyOtpVendor/>} />
            <Route path="/vendorLogin" element={<VendorLogin />} />

            <Route path="/vendorDashboard" element={
              <VendorProtectedRoute>
                <VendorDashboard />
              </VendorProtectedRoute>
            } />

          

            <Route path="/getAllService" element={<ServicePost />} />
            <Route path="/postService" element={<ServiceForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            {/* Service Pages wrapped in ServiceProvider */}
            <Route
              path="/home-service"
              element={
                <ServiceProvider serviceType="getHomeService">
                  <HomeService />
                </ServiceProvider>
              }
            />
            <Route
              path="/realState-service"
              element={
                <ServiceProvider serviceType="getRealState">
                  <RealStateAgent />
                </ServiceProvider>
              }
            />
            <Route
              path="/beauty-service"
              element={
                <ServiceProvider serviceType="getBeauty">
                  <BeautyService />
                </ServiceProvider>
              }
            />

            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </VendorAuthProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
