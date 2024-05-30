const db = require ('../db');

const fetchAllCommentsForAnArticle = async (articleID) => {
    const query = `
        SELECT 
            comment_id,
            votes,
            created_at,
            author,
            body,
            article_id
        FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC
    `;
    return db.query(query, [articleID]);
};

module.exports = { fetchAllCommentsForAnArticle };