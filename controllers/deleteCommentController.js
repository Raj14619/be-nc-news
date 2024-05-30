const db = require('../db');

async function deleteComment(req, res, next) {
    const { comment_id } = req.params;

    try {
        // Delete the comment from the database
        await db.query('DELETE FROM comments WHERE comment_id = $1', [comment_id]);

        // Respond with status 204 (No Content)
        res.status(204).end();
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
}

module.exports = { deleteComment };
