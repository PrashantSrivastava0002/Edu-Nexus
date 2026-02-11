import express from 'express';
import {
    getAllTeachers,
    assignSubjectToTeacher,
    removeSubjectFromTeacher,
    getAllStudentsWithProgress,
    getStudentProgress,
    getDashboardStats
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// Teacher management
router.get('/teachers', getAllTeachers);
router.post('/teachers/:teacherId/assign-subject', assignSubjectToTeacher);
router.delete('/teachers/:teacherId/remove-subject/:subjectId', removeSubjectFromTeacher);

// Student progress
router.get('/students', getAllStudentsWithProgress);
router.get('/students/:studentId/progress', getStudentProgress);

// Dashboard stats
router.get('/stats', getDashboardStats);

export default router;

