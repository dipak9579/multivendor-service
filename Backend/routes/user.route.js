import express from 'express';
import { registerUser, loginUser,getProfile ,updateUserProfile, logoutUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/Authenticated.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

router.get('/profile',authMiddleware,getProfile);

// Update user profile route (protected)
router.put('/updateProfile', authMiddleware, updateUserProfile);

// User logout route
router.post('/logout', logoutUser);

export default router;
