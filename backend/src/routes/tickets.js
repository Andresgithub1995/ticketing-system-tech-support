const express = require('express');
const router = express.Router();

const {
    getTickets,
    getTicketById,
    createTicket,
    closeTicket    
} = require('../controllers/ticketController');

router.get('/', getTickets);
router.get('/:id', getTicketById);
router.post('/', createTicket);
router.put('/:id/close', closeTicket);

module.exports = router;