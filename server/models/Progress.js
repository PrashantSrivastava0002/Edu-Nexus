import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    subjectId: {
        type: String,
        required: true
    },
    chapterId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['not-started', 'in-progress', 'completed'],
        default: 'not-started'
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    videoWatched: {
        type: Boolean,
        default: false
    },
    quizCompleted: {
        type: Boolean,
        default: false
    },
    lastAccessedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: Date
}, {
    timestamps: true
});

// Compound unique index to prevent duplicate progress entries
progressSchema.index({ userId: 1, subjectId: 1, chapterId: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;

