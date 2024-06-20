const db = require('../db'); // Import your database pool

const getArticles = async (req, res, next) => {
    try {
        let query = 'SELECT * FROM articles';
        const values = [];

        // Check if topic query parameter is present
        if (req.query.topic) {
            query += ' WHERE topic = $1';
            values.push(req.query.topic);
        }

        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getArticles,
};
