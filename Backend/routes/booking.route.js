import express from 'express';
import { bookService, cancelBooking, completeBooking ,getBookings,getVendorBookings,rateBooking} from '../controllers/booking.controller.js';
import { authMiddleware } from '../middlewares/Authenticated.js';
import {VendorMiddleware} from "../middlewares/VendorMiddleware.js"
const router = express.Router();

// Route to book a service

router.post('/book', authMiddleware, bookService);

// Route to get all bookings for a user
router.get('/getBooking', authMiddleware, getBookings);

// Route to cancel a booking
router.put('/cancel/:bookingId', authMiddleware, cancelBooking);

// Route to get all bookings for a vendor's services
router.get('/getVendorbooking',VendorMiddleware, getVendorBookings);

// Route to rate a booking
router.put('/rate/:bookingId', authMiddleware, rateBooking);

router.put('/complete/:bookingId',VendorMiddleware, completeBooking);

export default router;
