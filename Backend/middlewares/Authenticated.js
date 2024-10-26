import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const secretKey =process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Ensure you're splitting the token correctly

    if (!token) return res.status(401).json({ message: 'Unauthorized access' });

    try {
        const decodedData = jwt.verify(token, secretKey); // Ensure secretKey is correct
        req.userId = decodedData.id; // Make sure you're using the correct key to get the userId
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

