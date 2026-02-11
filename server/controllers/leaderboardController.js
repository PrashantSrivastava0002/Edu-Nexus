import User from '../models/User.js';

// @desc    Get global leaderboard
// @route   GET /api/leaderboard
// @access  Private
export const getLeaderboard = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;

        const users = await User.find({ role: 'student' })
            .select('name xp level streak badges')
            .sort({ xp: -1 })
            .limit(limit);

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            _id: user._id,
            name: user.name,
            xp: user.xp,
            level: user.level,
            streak: user.streak,
            badgeCount: user.badges.length
        }));

        res.json({
            success: true,
            count: leaderboard.length,
            data: leaderboard
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user's rank
// @route   GET /api/leaderboard/my-rank
// @access  Private
export const getMyRank = async (req, res) => {
    try {
        const users = await User.find({ role: 'student' })
            .select('_id xp')
            .sort({ xp: -1 });

        const rank = users.findIndex(u => u._id.toString() === req.user._id.toString()) + 1;

        res.json({
            success: true,
            data: {
                rank,
                totalUsers: users.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

