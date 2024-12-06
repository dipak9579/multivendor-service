import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import User from '../models/user.model.js';
import crypto from 'crypto';
import { sendOtpEmail } from '../utils/emailUtil.js';


const secretKey=process.env.JWT_SECRET

export const registerUser = async (req, res) => {
    const { name, email, password, contactNumber, address } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate OTP and its expiry
        const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
        const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            contactNumber,
            address,
            otp,
            otpExpiry,
        });

        await newUser.save();

        // Send OTP email
        await sendOtpEmail(email, otp);

        res.status(201).json({ message: 'User registered. Please verify your email with the OTP sent.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed', error });
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find the user and check if the OTP matches
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Verify the user
        user.isVerified = true;
        user.otp = null; // Clear the OTP after verification
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully. You can now log in.' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};



export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user's email is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });

        // Return the token and success message
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed', error });
    }
};

// Controller to get the user profile
export const getProfile = async (req, res) => {
    try {
      const userId = req.userId; // The authenticated user's ID (extracted from JWT)
  
      // Find the user by their ID
      const user = await User.findById(userId).select('-password'); // Exclude the password field
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send the user data as a response
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Error fetching profile', error });
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
