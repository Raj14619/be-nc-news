const db = require('../db');

const getArticles = async (req, res, next) => {
    try {
        let query = 'SELECT * FROM articles';
        const values = [];

        // Check if topic query parameter is present
        if (req.query.topic) {
            query += ' WHERE topic = $1';
            values.push(req.query.topic);
        }

        console.log('Query:', query); // Log the generated SQL query
        console.log('Values:', values); // Log the query parameters

        const { rows } = await db.query(query, values);
        console.log('Rows:', rows); // Log the rows returned from the database

        res.json(rows);
    } catch (error) {
        console.error('Error in getArticles:', error);
        next(error);
    }
};

module.exports = {
    getArticles,
};
