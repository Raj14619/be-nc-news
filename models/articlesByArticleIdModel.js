const db = require('../db');

const fetchArticlesById = async (input) => {
  const result = await db.query(`
    SELECT 
      article.article_id, 
      article.title, 
      article.topic, 
      article.author, 
      article.created_at, 
      article.votes, 
      article.article_img_url, 
      COALESCE(comment.comment_count, 0) AS comment_count
    FROM 
      articles article
    LEFT JOIN 
      (SELECT article_id, COUNT(*) AS comment_count 
       FROM comments 
       WHERE article_id = $1
       GROUP BY article_id) AS comment
    ON 
      article.article_id = comment.article_id
    WHERE 
      article.article_id = $1
  `, [input]);

  return result.rows[0];
}

module.exports = { fetchArticlesById };
