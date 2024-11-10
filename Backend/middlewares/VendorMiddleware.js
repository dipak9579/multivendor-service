import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const VendorMiddleware = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access: No token provided' });
    }

    try {
        // Verify the token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        // Make sure the decoded token contains vendorId (or id) and set it to req
        req.vendorId = decodedData.id || decodedData.vendorId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid token or expired token
        res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
    }
};
