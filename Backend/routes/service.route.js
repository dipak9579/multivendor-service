import express from 'express';
import upload from '../config/multerConfig.js';
import { postService,getServiceById, getAllService, deleteService, getVendorServices ,getBeautyService,getHomeService,getRealEstate,searchServicesByLocation} from '../controllers/service.controller.js';
import { VendorMiddleware } from '../middlewares/VendorMiddleware.js';

const router = express.Router();

// Service Routes
router.post('/postService', VendorMiddleware, upload.single('image'), postService); // Upload a single image
router.get('/getAllService', getAllService);
router.get('/getService/:id', getServiceById);
router.get('/getHomeService', getHomeService);
router.get('/getBeauty', getBeautyService);
router.get('/getRealState', getRealEstate);
router.delete('/deleteService/:serviceId', VendorMiddleware, deleteService);
router.get('/vendorService', VendorMiddleware, getVendorServices);
router.get('/search', searchServicesByLocation);

export default router;
