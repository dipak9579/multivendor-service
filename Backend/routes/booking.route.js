import express from 'express';
import { bookService, cancelBooking } from '../controllers/booking.controller.js';
import {authMiddleware} from '../middlewares/Authenticated.js';

const router = express.Router();

// Route to book a service
router.post('/book', authMiddleware, bookService);

// Route to cancel a booking
router.post('/:bookingId/cancel', authMiddleware, cancelBooking);

export default router;
