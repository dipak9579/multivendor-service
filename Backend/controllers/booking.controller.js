import Booking from '../models/booking.model.js';
import Service from '../models/service.model.js';
import Vendor from '../models/vendor.model.js';

// Book a Service
export const bookService = async (req, res) => {
    const userId = req.userId; // Assume userId is set by the authentication middleware
    const { serviceId, scheduledDate, paymentAmount } = req.body;

    try {
        // Find the service being booked
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Find the vendor offering the service
        const vendor = await Vendor.findById(service.vendor);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Create the booking
        const newBooking = new Booking({
            user: userId,
            service: serviceId,
            vendor: vendor._id,
            scheduledDate,
            payment: {
                amount: paymentAmount,
                currency: 'USD', // Or use a different currency if needed
                status: 'Pending', // Payment status should be updated based on payment confirmation
            },
            status: 'Pending',
        });

        await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create booking', error });
    }
};

// Cancel a Booking
export const cancelBooking = async (req, res) => {
    const userId = req.userId; // Assume userId is set by the authentication middleware
    const { bookingId } = req.params; // Booking ID from request parameters

    try {
        // Find the booking to cancel
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if the booking belongs to the user making the cancellation request
        if (booking.user.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to cancel this booking' });
        }

        // Update the booking status to 'Cancelled'
        booking.status = 'Cancelled';
        await booking.save();

        res.status(200).json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to cancel booking', error });
    }
};
