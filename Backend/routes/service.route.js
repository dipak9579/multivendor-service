import express from 'express';
import {
    postService,
    deleteService,
} from '../controllers/service.controller.js'; 
import { VendorMiddleware } from '../middlewares/VendorMiddleware.js'; 

const router = express.Router();

// Service Routes
router.post('/postService', VendorMiddleware, postService); // Vendor posts a new service
router.delete('/deleteService/:serviceId', VendorMiddleware, deleteService); // Vendor deletes a service


export default router;
