import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    subjectId: {
        type: String,
        required: true
    },
    chapterId: {
        type: String,
        required: true
    },
    answers: [{
        questionId: Number,
        userAnswer: String,
        isCorrect: Boolean,
        pointsEarned: Number,
        timeTaken: Number // seconds
    }],
    score: {
        type: Number,
        required: true
    },
    totalPoints: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    xpEarned: {
        type: Number,
        default: 0
    },
    streakBonus: {
        type: Number,
        default: 0
    },
    passed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index for user quiz history
quizAttemptSchema.index({ userId: 1, quizId: 1, completedAt: -1 });

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);

export default QuizAttempt;

