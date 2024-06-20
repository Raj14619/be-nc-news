const db = require ('../db');

const fetchArticles = async (sortCriteria = 'created_at', sortOrder = 'desc') => {
  const client = await pool.connect();

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

    const result = await client.query(`
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
    `);

    return result.rows;
  } finally {
    client.release();
  }
};

module.exports = { fetchArticles };
