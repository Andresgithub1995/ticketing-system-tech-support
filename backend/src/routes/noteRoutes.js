const express = require('express');
const router = express.Router();

const {
    getNotesByTicket,
    createNote
} = require('../controllers/noteController');

router.get('/tickets/:id/notes', getNotesByTicket);
router.post('/tickets/:id/notes', createNote);

module.exports = router;