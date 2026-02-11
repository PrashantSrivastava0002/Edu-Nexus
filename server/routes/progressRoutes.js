import express from 'express';
import {
    getMyProgress,
    getSubjectProgress,
    updateProgress,
    markChapterComplete
} from '../controllers/progressController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(protect, getMyProgress);

router.route('/:subjectId')
    .get(protect, getSubjectProgress);

router.route('/:subjectId/:chapterId')
    .put(protect, updateProgress);

router.route('/:subjectId/:chapterId/complete')
    .post(protect, markChapterComplete);

export default router;

