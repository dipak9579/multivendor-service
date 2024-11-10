import React, { createContext, useContext, useState, useEffect } from 'react';

const VendorAuthContext = createContext();

export const VendorAuthProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);

  // Check if the vendor is already authenticated using the token
  useEffect(() => {
    const token = localStorage.getItem('vendorToken');
    if (token) {
      setVendor(true); // Vendor is authenticated
    }
  }, []);

  // Logout function to clear vendor token and state
  const logout = () => {
    localStorage.removeItem('vendorToken');
    setVendor(null);
  };

  return (
    <VendorAuthContext.Provider value={{ vendor, setVendor, logout }}>
      {children}
    </VendorAuthContext.Provider>
  );
};

export const useVendorAuth = () => useContext(VendorAuthContext);
