import express from 'express';
import {
    postService,
    getAllService,
    deleteService,
    getVendorServices
} from '../controllers/service.controller.js'; 
import { VendorMiddleware } from '../middlewares/VendorMiddleware.js'; 

const router = express.Router();

// Service Routes
router.post('/postService', VendorMiddleware, postService); // Vendor posts a new service
router.get('/getAllService',getAllService)
router.delete('/deleteService/:serviceId', VendorMiddleware, deleteService); // Vendor deletes a service
router.get('/vendorService',VendorMiddleware,getVendorServices);

export default router;
