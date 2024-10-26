import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import User from '../models/user.model.js';

const secretKey=process.env.JWT_SECRET
// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password, contactNumber, address } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            contactNumber,
            address
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
};

// User login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    const userId = req.userId; // Get userId from the authenticated user
    // console.log('Received userId:', userId); // Log the userId

    const { name, contactNumber, address } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, contactNumber, address, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        // console.log('Updated User:', updatedUser); // Log the updated user object

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        // console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Profile update failed', error });
    }
};


// User logout
export const logoutUser = async (req, res) => {
    try {
        // You can clear the token client-side or add the token to a blacklist server-side
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Logout failed', error });
    }
};
