import express from 'express';
import { updateProfile, getUserStats } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/profile')
    .put(protect, updateProfile);

router.route('/stats')
    .get(protect, getUserStats);

export default router;

