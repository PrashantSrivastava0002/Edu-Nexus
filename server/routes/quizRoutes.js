import express from 'express';
import {
    getQuiz,
    createQuiz,
    submitQuiz,
    getMyAttempts,
    getAttemptDetails
} from '../controllers/quizController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .post(protect, authorize('teacher', 'admin'), createQuiz);

router.route('/attempts')
    .get(protect, getMyAttempts);

router.route('/attempts/:attemptId')
    .get(protect, getAttemptDetails);

router.route('/:subjectId/:chapterId')
    .get(protect, getQuiz);

router.route('/:subjectId/:chapterId/submit')
    .post(protect, authorize('student'), submitQuiz);

export default router;

