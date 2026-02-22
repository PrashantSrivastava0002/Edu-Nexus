import User from '../models/User.js';
import Subject from '../models/Subject.js';
import Progress from '../models/Progress.js';
import QuizAttempt from '../models/QuizAttempt.js';

// @desc    Get all teachers
// @route   GET /api/admin/teachers
// @access  Private/Admin
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' })
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: teachers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Assign subject to teacher
// @route   POST /api/admin/teachers/:teacherId/assign-subject
// @access  Private/Admin
export const assignSubjectToTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { subjectId } = req.body;

        const teacher = await User.findById(teacherId);
        if (!teacher || teacher.role !== 'teacher') {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }

        // Check if subject exists
        const subject = await Subject.findOne({ id: subjectId });
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'Subject not found'
            });
        }

        // Check if already assigned
        const alreadyAssigned = teacher.assignedSubjects.some(
            s => s.subjectId === subjectId
        );

        if (alreadyAssigned) {
            return res.status(400).json({
                success: false,
                message: 'Subject already assigned to this teacher'
            });
        }

        teacher.assignedSubjects.push({
            subjectId,
            assignedAt: new Date()
        });

        await teacher.save();

        res.json({
            success: true,
            message: 'Subject assigned successfully',
            data: teacher
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Remove subject from teacher
// @route   DELETE /api/admin/teachers/:teacherId/remove-subject/:subjectId
// @access  Private/Admin
export const removeSubjectFromTeacher = async (req, res) => {
    try {
        const { teacherId, subjectId } = req.params;

        const teacher = await User.findById(teacherId);
        if (!teacher || teacher.role !== 'teacher') {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }

        teacher.assignedSubjects = teacher.assignedSubjects.filter(
            s => s.subjectId !== subjectId
        );

        await teacher.save();

        res.json({
            success: true,
            message: 'Subject removed successfully',
            data: teacher
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all students with progress
// @route   GET /api/admin/students
// @access  Private/Admin
export const getAllStudentsWithProgress = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' })
            .select('-password')
            .sort({ xp: -1 });

        const studentsWithProgress = await Promise.all(
            students.map(async (student) => {
                const progress = await Progress.find({ userId: student._id });
                const quizAttempts = await QuizAttempt.find({ userId: student._id });

                return {
                    ...student.toObject(),
                    totalProgress: progress.length,
                    totalQuizzes: quizAttempts.length,
                    averageScore: quizAttempts.length > 0
                        ? quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / quizAttempts.length
                        : 0
                };
            })
        );

        res.json({
            success: true,
            data: studentsWithProgress
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get student progress details
// @route   GET /api/admin/students/:studentId/progress
// @access  Private/Admin
export const getStudentProgress = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await User.findById(studentId).select('-password');
        if (!student || student.role !== 'student') {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        const progress = await Progress.find({ userId: studentId }).populate('subjectId chapterId');
        const quizAttempts = await QuizAttempt.find({ userId: studentId }).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: {
                student,
                progress,
                quizAttempts
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalTeachers = await User.countDocuments({ role: 'teacher' });
        const totalSubjects = await Subject.countDocuments();
        const totalQuizAttempts = await QuizAttempt.countDocuments();

        // Count active students (active in last 1 minute)
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        const activeStudents = await User.countDocuments({
            role: 'student',
            lastActiveAt: { $gte: oneMinuteAgo }
        });

        res.json({
            success: true,
            data: {
                totalStudents,
                totalTeachers,
                totalSubjects,
                totalQuizAttempts,
                activeStudents
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

