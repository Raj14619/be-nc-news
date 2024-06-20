// Assuming your db.js or similar setup handles database connections and queries internally
const db = require('../db');

const fetchArticles = async (sortCriteria = 'created_at', sortOrder = 'desc') => {
  const validSortCriteria = ['created_at', 'comment_count', 'votes'];
  const validSortOrder = ['asc', 'desc'];

  if (!validSortCriteria.includes(sortCriteria)) {
    sortCriteria = 'created_at';
  }

  if (!validSortOrder.includes(sortOrder)) {
    sortOrder = 'desc';
  }

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
       GROUP BY article_id) AS comment
    ON 
      article.article_id = comment.article_id
    ORDER BY 
      ${sortCriteria} ${sortOrder}
  `);

  return result.rows;
};

module.exports = { fetchArticles };
