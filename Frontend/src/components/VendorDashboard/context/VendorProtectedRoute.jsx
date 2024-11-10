import React from 'react';
import { Navigate } from 'react-router-dom';
import { useVendorAuth } from './VendorAuthContext';

// VendorProtectedRoute.js
const VendorProtectedRoute = ({ children }) => {
  const { vendor } = useVendorAuth();
  
  if (!vendor) {
    return <Navigate to="/vendorLogin" replace />;
  }

  return children;
};

export default VendorProtectedRoute;
