import express from 'express';
import { bookService, cancelBooking, completeBooking } from '../controllers/booking.controller.js';
import { authMiddleware } from '../middlewares/Authenticated.js';

const router = express.Router();

// Route to book a service
// Now includes extra fields like notes, duration, discount, and location
router.post('/book', authMiddleware, bookService);

// Route to cancel a booking
// Now expects a cancellationReason in the request body
router.post('/:bookingId/cancel', authMiddleware, cancelBooking);

// Route to complete a booking (for vendors)
// Added a route for vendors to mark the booking as completed
router.post('/:bookingId/complete', authMiddleware, completeBooking);

export default router;
