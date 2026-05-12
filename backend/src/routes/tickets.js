const express = require('express');
const router = express.Router();

const {
    getTickets,
    createTicket,
    closeTicket
} = require('../controllers/ticketController');

router.get('/', getTickets);
router.post('/', createTicket);
router.put('/:id/close', closeTicket);

module.exports = router;