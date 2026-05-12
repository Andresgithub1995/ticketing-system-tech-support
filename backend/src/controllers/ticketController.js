const db = require('../config/db');

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

module.exports = {
    getTickets
}