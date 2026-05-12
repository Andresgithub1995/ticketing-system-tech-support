const express = require('express');
const router = express.Router();

const {
    getTickets
} = require('../controllers/ticketController');

router.get('/', getTickets);

module.exports = router;