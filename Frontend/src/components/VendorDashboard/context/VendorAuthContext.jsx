// VendorAuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const VendorAuthContext = createContext();

export const VendorAuthProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('vendorToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        
        if (!isExpired) {
          setVendor({ id: decodedToken.id }); // Set vendor with decoded data
        } else {
          localStorage.removeItem('vendorToken');
          setVendor(null); // Token expired
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('vendorToken');
        setVendor(null); // Invalid token
      }
    }
  }, []);

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
