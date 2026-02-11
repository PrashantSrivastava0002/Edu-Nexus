import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a chapter title'],
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    topics: [{
        type: String
    }],
    content: {
        type: {
            type: String,
            enum: ['text', 'video', 'pdf'],
            default: 'text'
        },
        body: {
            type: String,
            default: ''
        },
        videoUrl: {
            type: String,
            default: ''
        }
    },
    attachments: [{
        name: String,
        url: String,
        type: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    teacherNote: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    },
    isPublished: {
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
chapterSchema.index({ subjectId: 1, id: 1 });

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;

