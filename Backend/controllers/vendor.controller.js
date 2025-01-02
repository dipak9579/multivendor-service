import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import crypto from 'crypto';
import Vendor from '../models/vendor.model.js';
import { sendOtpEmail } from '../utils/emailUtil.js'; // Assumes you have this utility for sending OTP emails

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// Vendor Registration with OTP
export const registerVendor = async (req, res) => {
    const { name, email, password, contactNumber, businessName, businessAddress } = req.body;

    try {
        // Check if the vendor already exists
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: 'Vendor already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP and its expiry
        const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
        const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

        // Create new vendor
        const newVendor = new Vendor({
            name,
            email,
            password: hashedPassword,
            contactNumber,
            businessName,
            businessAddress,
            otp,
            otpExpiry,
        });

        await newVendor.save();

        // Send OTP email
        await sendOtpEmail(email, otp);

        res.status(201).json({ message: 'Vendor registered. Please verify your email with the OTP sent.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Vendor registration failed', error });
    }
};

// Vendor OTP Verification
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find the vendor by email
        const vendor = await Vendor.findOne({ email });

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Check if the OTP matches
        if (vendor.otp !== otp || vendor.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Mark vendor as verified and clear OTP
        vendor.isVerified = true;
        vendor.otp = null;
        vendor.otpExpiry = null;
        await vendor.save();

        res.status(200).json({ message: 'OTP verified successfully. You can now log in.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};

// Vendor Login
export const loginVendor = async (req, res) => {
    const { email, password } = req.body;

    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Check if the vendor's email is verified
        if (!vendor.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: vendor._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Vendor logged in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Vendor login failed', error });
    }
};

// Get Vendor Profile
export const getVendorProfile = async (req, res) => {
    try {
        const vendorId = req.vendorId; // The decoded vendor ID from the JWT
        const vendor = await Vendor.findById(vendorId).select('-password'); // Exclude password

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        res.status(200).json({ vendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch vendor profile', error });
    }
};

// Update Vendor Profile
export const updateVendorProfile = async (req, res) => {
    const vendorId = req.vendorId;
    const { name, contactNumber, businessName, businessAddress } = req.body;

    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(
            vendorId,
            { name, contactNumber, businessName, businessAddress, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        res.status(200).json({ message: 'Vendor updated successfully', vendor: updatedVendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Vendor update failed', error });
    }
};

// Vendor Logout (simple implementation)
export const logoutVendor = (req, res) => {
    res.status(200).json({ message: 'Vendor logged out successfully' });
};
