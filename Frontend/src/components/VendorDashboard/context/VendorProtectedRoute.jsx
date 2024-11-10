import React from 'react';
import { Navigate } from 'react-router-dom';
import { useVendorAuth } from './VendorAuthContext';

const VendorProtectedRoute = ({ children }) => {
  const { vendor } = useVendorAuth(); // Get the vendor status from context

  // If the vendor is not logged in, redirect to login page
  if (!vendor) {
    return <Navigate to="/vendorLogin" replace />;
  }

  return children;
};

export default VendorProtectedRoute;
