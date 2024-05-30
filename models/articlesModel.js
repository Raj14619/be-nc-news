const db = require ('../db');

const fetchArticles = async () =>{


    const result = await db.query(`
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
  ORDER BY 
    article.created_at DESC
  `);

  console.log("hiii")

    return result.rows
}

module.exports = {fetchArticles};