import Service from '../models/service.model.js';
import Vendor from '../models/vendor.model.js';

// Post Service - Create a new service after vendor login
export const postService = async (req, res) => {
    const vendorId = req.vendorId; // Assume vendorId is set by the authentication middleware
    const { title, description, category, pricing, location, availability, images } = req.body;

    try {
        // Check if the vendor exists in the database
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Create the new service associated with the vendor
        const newService = new Service({
            vendor: vendor._id,
            title,
            description,
            category,
            pricing,
            location,
            availability,
            images,
        });

        await newService.save();
        res.status(201).json({ message: 'Service posted successfully', service: newService });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Service posting failed', error });
    }
};

// Delete Service - Delete a service after vendor login, with vendor verification
export const deleteService = async (req, res) => {
    const { serviceId } = req.params; // Assume serviceId is passed as a parameter
    const vendorId = req.vendorId; // Assume vendorId is set by the authentication middleware

    try {
        // Find the service and verify the vendor is the owner
        const service = await Service.findById(serviceId);
        
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        if (service.vendor.toString() !== vendorId) {
            return res.status(403).json({ message: 'You are not authorized to delete this service' });
        }

        await Service.findByIdAndDelete(serviceId);
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Service deletion failed', error });
    }
};
