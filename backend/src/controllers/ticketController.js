const db = require('../config/db');

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query(
            'SELECT * FROM tickets WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Ticket no encontrado'
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error obteniendo ticket'
        });
    }
};

const getTickets = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tickets');
        res.json(rows);    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error obteniendo tickets'
        });
    }
};

const createTicket = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority
        } = req.body;

        const [result] = await db.query(
            `INSERT INTO tickets 
            (title, description, status, priority) 
            VALUES (?, ?, ?, ?)`,
            [
                title,
                description,
                status || 'open',
                priority || 'medium'
            ]
        );

        res.status(201).json({
            message: 'Ticket creado correctamente',
            ticketId: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creando ticket'
        });
    }
};

const closeTicket = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            'UPDATE tickets SET status = ? WHERE id = ?',
            ['closed', id]
        );

        res.json({
            message: 'Ticket cerrado correctamente'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error cerrando ticket'
        });
    }
};

module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    closeTicket
};