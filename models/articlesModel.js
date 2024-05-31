const db = require('../db');
const fetchArticles = async (topic) => {
  let queryStr = `
    SELECT
      article.article_id,
      article.title,
      article.topic,
      article.author,
      article.created_at,
      article.votes,
      article.article_img_url,
      CAST(comment.comment_count AS INTEGER) AS comment_count
    FROM
      articles article
    LEFT JOIN
      (SELECT article_id, COUNT(*) AS comment_count
       FROM comments
       GROUP BY article_id) AS comment
    ON
      article.article_id = comment.article_id
  `;
  const queryValues = [];
  if (topic) {
    queryStr += ' WHERE article.topic = $1';
    queryValues.push(topic);
  }
  queryStr += ' ORDER BY article.created_at DESC';
  const result = await db.query(queryStr, queryValues);
  return result.rows;
};
module.exports = { fetchArticles };