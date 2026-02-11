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
    class: {
        type: String,
        default: 'Class 11'
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

