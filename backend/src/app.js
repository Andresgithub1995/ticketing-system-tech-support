const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');

require('dotenv').config();

const ticketRoutes = require('./routes/tickets');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Ticketing System API');
});

app.use('/api', noteRoutes);

module.exports = app;
