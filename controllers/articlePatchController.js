const db = require('../db');

async function updateArticle(req, res, next) {
    const { article_id } = req.params;
    const { inc_votes } = req.body;

    try {
        // Check if the article ID exists
        const existingArticle = await db.query('SELECT votes FROM articles WHERE article_id = $1', [article_id]);

        if (existingArticle.rows.length === 0) {
            return res.status(404).json({ error: "Article not found" });
        }

        // Check if inc_votes is provided and is a number
        if (typeof inc_votes !== 'number') {
            return res.status(400).json({ error: "Please provide a valid number for 'inc_votes'" });
        }

        // Calculate the new votes value
        const currentVotes = existingArticle.rows[0].votes;
        const newVotes = currentVotes + inc_votes;

        // Update the article's votes in the database
        const updatedArticle = await db.query('UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *', [newVotes, article_id]);

        // Return the updated article
        res.json(updatedArticle.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = { updateArticle };
