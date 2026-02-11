import express from 'express';
import {
    getChaptersBySubject,
    getChapter,
    createChapter,
    updateChapter,
    addVideoToChapter,
    addAttachment,
    updateTeacherNote,
    deleteAttachment
} from '../controllers/chapterController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .post(protect, authorize('teacher', 'admin'), createChapter);

router.route('/subject/:subjectId')
    .get(protect, getChaptersBySubject);

router.route('/:subjectId/:chapterId')
    .get(protect, getChapter)
    .put(protect, authorize('teacher', 'admin'), updateChapter);

router.route('/:subjectId/:chapterId/video')
    .put(protect, authorize('teacher', 'admin'), addVideoToChapter);

router.route('/:subjectId/:chapterId/note')
    .put(protect, authorize('teacher', 'admin'), updateTeacherNote);

router.route('/:subjectId/:chapterId/attachments')
    .post(protect, authorize('teacher', 'admin'), addAttachment);

router.route('/:subjectId/:chapterId/attachments/:attachmentId')
    .delete(protect, authorize('teacher', 'admin'), deleteAttachment);

export default router;

