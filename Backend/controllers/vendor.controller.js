import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config();
import Vendor from '../models/vendor.model.js'; 

const SECRET_KEY =process.env.JWT_SECRET;

// Vendor Registration
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

        // Create new vendor
        const newVendor = new Vendor({
            name,
            email,
            password: hashedPassword,
            contactNumber,
            businessName,
            businessAddress,
        });

        await newVendor.save();
        res.status(201).json({ message: 'Vendor registered successfully', vendor: newVendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Vendor registration failed', error });
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

// Update Vendor Profile
export const updateVendorProfile = async (req, res) => {
    const vendorId = req.vendorId; // Assume you have set vendorId in req during authentication
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
