import express from 'express';
import { register, login, getProfile , getMe  } from '../controllers/user.controller.js';
import{ authMiddleware } from '../middelwares/auth.middelware.js';


const router = express.Router();

// @route   POST /api/user/register
// @desc    Register a new user
router.post('/register', register);

// @route   POST /api/user/login
// @desc    Login user and return token
router.post('/login', login);

// @route   GET /api/user/profile
// @desc    Get current logged-in user's profile
// @access  Protected
router.get('/profile', authMiddleware, getProfile);


router.get("/me", authMiddleware, getMe);



export default router;