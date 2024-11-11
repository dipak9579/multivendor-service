import express from 'express';
import { bookService, cancelBooking, completeBooking ,getBookings} from '../controllers/booking.controller.js';
import { authMiddleware } from '../middlewares/Authenticated.js';

const router = express.Router();

// Route to book a service

router.post('/book', authMiddleware, bookService);

// Route to get all bookings for a user
router.get('/getBooking', authMiddleware, getBookings);

// Route to cancel a booking
router.put('/cancel/:bookingId', authMiddleware, cancelBooking);

// Route to complete a booking (for vendors)
// Added a route for vendors to mark the booking as completed
router.post('/:bookingId/complete', authMiddleware, completeBooking);

export default router;
