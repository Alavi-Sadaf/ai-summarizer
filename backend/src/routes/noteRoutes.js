const express = require('express');
const router = express.Router();
const {
    getNotes,
    getNoteById,
    createNote,
    summarizeNote,
    deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getNotes).post(createNote);
router.route('/:id').get(getNoteById).delete(deleteNote);
router.route('/:id/summarize').post(summarizeNote);

module.exports = router;
