import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a subject title'],
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: '📚'
    },
    classes: [{
        type: String,
        default: '11'
    }],
    stream: {
        type: String, // 'Science', 'Commerce', 'Arts', or null for lower classes
        default: null
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

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;

