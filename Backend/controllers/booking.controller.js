import Booking from '../models/booking.model.js';
import Service from '../models/service.model.js';
import Vendor from '../models/vendor.model.js';

// Book a Service
export const bookService = async (req, res) => {
    const userId = req.userId; // Assume userId is set by the authentication middleware
    const {
        serviceId,
        scheduledDate,
        paymentAmount,
        notes,
        duration,
        discountAmount,
        discountCode,
        location,
    } = req.body;

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
                status: 'Pending',
            },
            status: 'Pending',
            notes,
            duration,
            discount: {
                discountAmount,
                discountCode,
            },
            location,
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
    const { cancellationReason } = req.body; // Added cancellation reason

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
        booking.cancellationReason = cancellationReason; // Store the reason for cancellation
        await booking.save();

        res.status(200).json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to cancel booking', error });
    }
};

// Complete a Booking (for vendors)
export const completeBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { vendorId } = req.userId; // Assume vendorId is set in the authentication middleware

    try {
        // Find the booking
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if the vendor is the one assigned to the service
        if (booking.vendor.toString() !== vendorId) {
            return res.status(403).json({ message: 'You are not authorized to complete this booking' });
        }

        // Mark the booking as completed
        booking.status = 'Completed';
        booking.completedBy = vendorId; // Store the vendor who completed the service
        booking.completionDate = Date.now(); // Store the date of completion

        await booking.save();

        res.status(200).json({ message: 'Booking completed successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to complete booking', error });
    }
};
