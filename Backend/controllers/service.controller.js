import Service from '../models/service.model.js';
import Vendor from '../models/vendor.model.js';
import Booking from '../models/booking.model.js';

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


export const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service details:', error);
    res.status(500).json({ message: 'Error fetching service details' });
  }
};


// Get all services with average rating from completed bookings
export const getAllService = async (req, res) => {
  try {
      const services = await Service.find(); // Find all services

      // For each service, calculate the average rating from completed bookings
      const servicesWithRatings = await Promise.all(
          services.map(async (service) => {
              // Find all completed bookings for this service
              const bookings = await Booking.find({ service: service._id, status: 'Completed' });

              // Extract ratings from completed bookings
              const ratings = bookings.map((booking) => booking.rating).filter((rating) => rating !== undefined);
              const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;

              return {
                  ...service.toObject(),
                  averageRating: averageRating, // Add the average rating to the service
              };
          })
      );

      res.json({ services: servicesWithRatings });
  } catch (error) {
      console.error('Error fetching services with ratings:', error);
      res.status(500).json({ message: 'Error fetching services with ratings' });
  }
};

// Controller to get home services with average rating
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

    // Calculate the average rating for each service
    const servicesWithRatings = await Promise.all(
      services.map(async (service) => {
        // Find all completed bookings for this service
        const bookings = await Booking.find({ service: service._id, status: 'Completed' });

        // Extract ratings from completed bookings
        const ratings = bookings.map((booking) => booking.rating).filter((rating) => rating !== undefined);
        const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;

        return {
          ...service.toObject(),
          averageRating: averageRating, // Add the average rating to the service
        };
      })
    );

    // Return the services with average ratings
    res.status(200).json({
      success: true,
      services: servicesWithRatings,
    });
  } catch (error) {
    console.error('Error fetching home services:', error);
    res.status(500).json({ message: 'Server error. Could not fetch services.' });
  }
};


// Controller to get real estate agent services with average rating
export const getRealEstate = async (req, res) => {
  try {
    // Get the subCategory from the query parameter (e.g. ?subCategory=Agent)
    const { subCategory } = req.query;

    // Build the query object for "Real Estate" category
    let query = { category: 'Real Estate' };

    // If subCategory is provided, add it to the query
    if (subCategory) {
      query.subCategory = subCategory;
    }

    // Fetch the services from the database that match the query
    const services = await Service.find(query);

    // Check if services are found
    if (services.length === 0) {
      return res.status(404).json({ message: 'No real estate agent services found.' });
    }

    // Calculate the average rating for each service
    const servicesWithRatings = await Promise.all(
      services.map(async (service) => {
        // Find all completed bookings for this service
        const bookings = await Booking.find({ service: service._id, status: 'Completed' });

        // Extract ratings from completed bookings
        const ratings = bookings.map((booking) => booking.rating).filter((rating) => rating !== undefined);
        const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;

        return {
          ...service.toObject(),
          averageRating: averageRating, // Add the average rating to the service
        };
      })
    );

    // Return the services with average ratings
    res.status(200).json({
      success: true,
      services: servicesWithRatings,
    });
  } catch (error) {
    console.error('Error fetching real estate agent services:', error);
    res.status(500).json({ message: 'Server error. Could not fetch services.' });
  }
};

  

// Controller to get beauty services with average rating
export const getBeautyService = async (req, res) => {
  try {
    // Get the subCategory from the query parameter (e.g. ?subCategory=Haircut)
    const { subCategory } = req.query;

    // Build the query object for "Beauty" category
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

    // Calculate the average rating for each service
    const servicesWithRatings = await Promise.all(
      services.map(async (service) => {
        // Find all completed bookings for this service
        const bookings = await Booking.find({ service: service._id, status: 'Completed' });

        // Extract ratings from completed bookings
        const ratings = bookings.map((booking) => booking.rating).filter((rating) => rating !== undefined);
        const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;

        return {
          ...service.toObject(),
          averageRating: averageRating, // Add the average rating to the service
        };
      })
    );

    // Return the services with average ratings
    res.status(200).json({
      success: true,
      services: servicesWithRatings,
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
export const searchServicesByLocation = async (req, res) => {
  try {
    const { city, state, country } = req.query;

    // Build query based on provided location fields
    const locationQuery = {};
    if (city) locationQuery['location.city'] = city;
    if (state) locationQuery['location.state'] = state;
    if (country) locationQuery['location.country'] = country;

    // Find services based on location query
    const services = await Service.find(locationQuery);

    // For each service, calculate the average rating from completed bookings
    const servicesWithRatings = await Promise.all(
      services.map(async (service) => {
        // Find all completed bookings for this service
        const bookings = await Booking.find({ service: service._id, status: 'Completed' });

        // Extract ratings from completed bookings
        const ratings = bookings.map((booking) => booking.rating).filter((rating) => rating !== undefined);
        const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;

        return {
          ...service.toObject(),
          averageRating: averageRating, // Add the average rating to the service
        };
      })
    );

    res.status(200).json(servicesWithRatings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
