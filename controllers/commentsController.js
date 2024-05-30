// commentsController.js

const db = require('../db');

async function postComment(req, res, next) {
    const { article_id } = req.params;
    const { username, body } = req.body;

    try {
        // Check if required data is provided
        if (!article_id || !username || !body) {
            return res.status(400).json({ error: "Please provide article_id, username, and body in the request body" });
        }

        // Add the comment to the database using db.query
        const queryText = 'INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *';
        const values = [article_id, username, body];
        const newComment = await db.query(queryText, values);

        // Return the posted comment
        res.status(201).json(newComment.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = { postComment };
