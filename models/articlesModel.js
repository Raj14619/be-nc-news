// Assuming your db.js or similar setup handles database connections and queries internally
const db = require('../db');

const fetchArticles = async (sortCriteria = 'created_at', sortOrder = 'desc') => {
  try {
    let orderByClause = '';
    switch (sortCriteria) {
      case 'created_at':
        orderByClause = `ORDER BY article.created_at ${sortOrder}`;
        break;
      case 'comment_count':
        orderByClause = `ORDER BY COALESCE(comment.comment_count, 0) ${sortOrder}`;
        break;
      case 'votes':
        orderByClause = `ORDER BY article.votes ${sortOrder}`;
        break;
      default:
        orderByClause = 'ORDER BY article.created_at DESC'; // Default sort by created_at descending
        break;
    }

    const queryString = `
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
      ${orderByClause}
    `;

    const result = await db.query(queryString); // Assuming db.query handles the database query

    return result.rows;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

module.exports = { fetchArticles };
