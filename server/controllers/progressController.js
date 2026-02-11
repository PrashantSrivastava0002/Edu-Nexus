import Progress from '../models/Progress.js';

// @desc    Get user's progress for all subjects
// @route   GET /api/progress
// @access  Private
export const getMyProgress = async (req, res) => {
    try {
        const progress = await Progress.find({ userId: req.user._id })
            .sort({ lastAccessedAt: -1 });

        res.json({
            success: true,
            count: progress.length,
            data: progress
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get progress for specific subject
// @route   GET /api/progress/:subjectId
// @access  Private
export const getSubjectProgress = async (req, res) => {
    try {
        const progress = await Progress.find({
            userId: req.user._id,
            subjectId: req.params.subjectId
        }).sort({ lastAccessedAt: -1 });

        res.json({
            success: true,
            count: progress.length,
            data: progress
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update chapter progress
// @route   PUT /api/progress/:subjectId/:chapterId
// @access  Private
export const updateProgress = async (req, res) => {
    try {
        const { progress, videoWatched, status } = req.body;

        const progressDoc = await Progress.findOneAndUpdate(
            {
                userId: req.user._id,
                subjectId: req.params.subjectId,
                chapterId: req.params.chapterId
            },
            {
                progress: progress || 0,
                videoWatched: videoWatched || false,
                status: status || 'in-progress',
                lastAccessedAt: new Date()
            },
            { upsert: true, new: true }
        );

        res.json({
            success: true,
            data: progressDoc
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Mark chapter as complete
// @route   POST /api/progress/:subjectId/:chapterId/complete
// @access  Private
export const markChapterComplete = async (req, res) => {
    try {
        const progressDoc = await Progress.findOneAndUpdate(
            {
                userId: req.user._id,
                subjectId: req.params.subjectId,
                chapterId: req.params.chapterId
            },
            {
                status: 'completed',
                progress: 100,
                completedAt: new Date(),
                lastAccessedAt: new Date()
            },
            { upsert: true, new: true }
        );

        res.json({
            success: true,
            data: progressDoc
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

