const db = require('../config/db');

const getNotesByTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query(
            'SELECT * FROM notes WHERE ticket_id = ? ORDER BY created_at DESC',
            [id]
        );

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error obteniendo notas'
        });
    }
};

const createNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { note } = req.body;

        const [result] = await db.query(
            'INSERT INTO notes (ticket_id, note) VALUES (?, ?)',
            [id, note]
        );

        res.status(201).json({
            message: 'Nota creada correctamente',
            noteId: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error creando nota'
        });
    }
};

module.exports = {
    getNotesByTicket,
    createNote
};