import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const VendorMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized access' });

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.vendorId = decodedData.id; // Set the vendorId to req for later use
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
