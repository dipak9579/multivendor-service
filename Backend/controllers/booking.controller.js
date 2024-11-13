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

// Get all bookings for the authenticated user
export const getBookings = async (req, res) => {
    const userId = req.userId; // Assume userId is set by authentication middleware

    try {
        // Fetch all bookings where the user is either the creator or involved
        const bookings = await Booking.find({ user: userId })
            .populate('service', 'name') // Populate the service name for each booking
            .populate('vendor', 'name')  // Populate the vendor name for each booking
            .populate('review')          // Optionally populate review if needed
            .sort({ createdAt: -1 });    // Sort bookings by the most recent

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }

        // Return the bookings
        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Failed to fetch bookings', error });
    }
};


export const cancelBooking = async (req, res) => {
    const userId = req.userId;
    const { bookingId } = req.params;
    const { cancellationReason } = req.body;

    try {
        // Find the booking
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
        booking.cancellationReason = cancellationReason; 
        await booking.save();

        res.status(200).json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        console.error('Error in cancelBooking:', error);
        res.status(500).json({ message: 'Failed to cancel booking', error: error.message });
    }
};

export const completeBooking = async (req, res) => {
    const { bookingId } = req.params;
    const vendorId = req.vendorId;

    try {
        // Find the booking
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        console.log(`Authenticated Vendor ID: ${vendorId}`); // Debug log
        console.log(`Booking Vendor ID: ${booking.vendor.toString()}`); // Debug log

        // Check if the vendor is the one assigned to the service
        if (booking.vendor.toString() !== vendorId) {
            return res.status(403).json({ message: 'You are not authorized to complete this booking' });
        }

        // Mark the booking as completed
        booking.status = 'Completed';
        booking.completedBy = vendorId;
        booking.completionDate = Date.now();

        await booking.save();

        res.status(200).json({ message: 'Booking completed successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to complete booking', error });
    }
};

export const getVendorBookings = async (req, res) => {
    const vendorId = req.vendorId; // Assume vendorId is set by the authentication middleware

    try {
        // Fetch all services created by this vendor
        const services = await Service.find({ vendor: vendorId });

        console.log("Services found for vendor:", services);  // Debugging the services

        if (!Array.isArray(services) || services.length === 0) {
            // No services found for the vendor, so fetch all bookings
            console.log('No services found for this vendor');
            const bookingsWithoutServices = await Booking.find({ vendor: vendorId })
                .populate('user', 'name email')
                .populate('service', 'title category')
                .populate('payment')
                .populate('review')
                .sort({ scheduledDate: 1 });

            if (!Array.isArray(bookingsWithoutServices) || bookingsWithoutServices.length === 0) {
                return res.status(404).json({ message: 'No bookings found for this vendor' });
            }

            return res.status(200).json({ bookings: bookingsWithoutServices });
        }

        // Fetch bookings related to the vendor's services
        const bookings = await Booking.find({
            vendor: vendorId,
            service: { $in: services.map(service => service._id) }, // Only bookings for services created by the vendor
        })
            .populate('user', 'name email')
            .populate('service', 'title category')
            .populate('payment')
            .populate('review')
            .sort({ scheduledDate: 1 });

        if (!Array.isArray(bookings) || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for your services' });
        }

        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching vendor bookings:', error);
        res.status(500).json({ message: 'Failed to fetch vendor bookings', error: error.message });
    }
};




// Controller function to handle booking rating
export const rateBooking = async (req, res) => {
    const { rating } = req.body;
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // Ensure only completed services can be rated
        if (booking.status !== 'Completed') {
            return res.status(400).json({ message: 'Service must be completed to add a rating' });
        }

        booking.rating = rating;
        await booking.save();

        res.json({ message: 'Rating submitted successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
