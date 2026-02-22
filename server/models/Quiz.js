import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    subjectId: {
        type: String,
        required: true,
        index: true
    },
    chapterId: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a quiz title'],
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    gameType: {
        type: String,
        enum: ['shooter', 'memory', 'classic'],
        default: 'shooter'
    },
    questions: [{
        id: Number,
        type: {
            type: String,
            enum: ['mcq', 'fill-in', 'true-false'],
            required: true
        },
        question: {
            type: String,
            required: true
        },
        options: [String], // For MCQ
        correctAnswer: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            default: 100
        },
        explanation: String
    }],
    timeLimit: {
        type: Number,
        default: 30 // seconds per question
    },
    passingScore: {
        type: Number,
        default: 60 // percentage
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Compound index for efficient queries
quizSchema.index({ subjectId: 1, chapterId: 1 });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;

