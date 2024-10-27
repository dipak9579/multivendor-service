import express from 'express';
import {
    registerVendor,
    loginVendor,
    updateVendorProfile,
    logoutVendor,
} from '../controllers/vendor.controller.js'; 
import { VendorMiddleware} from '../middlewares/VendorMiddleware.js'; 

const router = express.Router();

// Vendor Routes
router.post('/register', registerVendor); // Vendor registration
router.post('/login', loginVendor); // Vendor login
router.put('/profile', VendorMiddleware, updateVendorProfile); // Update profile
router.post('/logout', VendorMiddleware, logoutVendor); // Vendor logout

export default router;
