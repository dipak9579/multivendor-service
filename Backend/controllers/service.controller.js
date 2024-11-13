import Service from '../models/service.model.js';
import Vendor from '../models/vendor.model.js';

// Post Service - Create a new service after vendor login
export const postService = async (req, res) => {
    const vendorId = req.vendorId; // Assume vendorId is set by VendorMiddleware
    const { title, description, category, subCategory, pricing, location, availability } = req.body;

    try {
        // Check if the vendor exists
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Check if an image was uploaded
        let image = {};
        if (req.file) {
            image = {
                url: req.file.path,
                altText: `${title} - Service Image`,
            };
        }

        // Create and save the new service
        const newService = new Service({
            vendor: vendor._id,
            title,
            description,
            category,
            subCategory, // Add subCategory here
            pricing: {
                amount: pricing.amount,
                currency: pricing.currency,
            },
            location,
            availability,
            images: [image], // Save image as an array with a single object
        });

        await newService.save();
        res.status(201).json({ message: 'Service posted successfully', service: newService });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Service posting failed', error });
    }
};


// Controller to get all services
export const getAllService = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch services', error });
    }
};

// Controller to get home services
export const getHomeService = async (req, res) => {
    try {
      // Get the subCategory from the query parameter
      const { subCategory } = req.query; // e.g. ?subCategory=Plumbing
  
      // Build the query object for "Home" category
      let query = { category: 'Home' };
  
      // If subCategory is provided, add it to the query
      if (subCategory) {
        query.subCategory = subCategory;
      }
  
      // Fetch the services from the database that match the query
      const services = await Service.find(query);
  
      // Check if services are found
      if (services.length === 0) {
        return res.status(404).json({ message: 'No home services found.' });
      }
  
      // Return the found services
      res.status(200).json({
        success: true,
        services,
      });
    } catch (error) {
      console.error('Error fetching home services:', error);
      res.status(500).json({ message: 'Server error. Could not fetch services.' });
    }
  };
  


// Controller to get beauty services
export const getBeautyService = async (req, res) => {
  try {
    // Get the subCategory from the query parameter
    const { subCategory } = req.query; // e.g. ?subCategory=Haircut

    // Build the query object
    let query = { category: 'Beauty' };

    // If subCategory is provided, add it to the query
    if (subCategory) {
      query.subCategory = subCategory;
    }

    // Fetch the services from the database that match the query
    const services = await Service.find(query);

    // Check if services are found
    if (services.length === 0) {
      return res.status(404).json({ message: 'No beauty services found.' });
    }

    // Return the found services
    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    console.error('Error fetching beauty services:', error);
    res.status(500).json({ message: 'Server error. Could not fetch services.' });
  }
};


// Controller to get all services for a specific vendor
export const getVendorServices = async (req, res) => {
    const vendorId = req.vendorId; // Assume vendorId is set by authentication middleware

    try {
        // Fetch services created by this vendor only
        const services = await Service.find({ vendor: vendorId });
        res.status(200).json({ services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch services', error });
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