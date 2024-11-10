import express from 'express';
import {
    registerVendor,
    loginVendor,
    getVendorProfile,
    updateVendorProfile,
    logoutVendor,
} from '../controllers/vendor.controller.js'; 
import { VendorMiddleware} from '../middlewares/VendorMiddleware.js'; 

const router = express.Router();

// Vendor Routes
router.post('/register', registerVendor); // Vendor registration
router.post('/login', loginVendor); // Vendor login
router.get('/profile',VendorMiddleware,getVendorProfile)
router.put('/updateProfile', VendorMiddleware, updateVendorProfile); // Update profile
router.post('/logout', VendorMiddleware, logoutVendor); // Vendor logout


export default router;
