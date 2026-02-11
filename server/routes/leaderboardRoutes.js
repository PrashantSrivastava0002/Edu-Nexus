import express from 'express';
import { getLeaderboard, getMyRank } from '../controllers/leaderboardController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(protect, getLeaderboard);

router.route('/my-rank')
    .get(protect, getMyRank);

export default router;

