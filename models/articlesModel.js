const db = require ('../db');

const fetchArticles = async () =>{

    console.log("hello")
    const result = await db.query(`SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles ORDER BY created_at DESC`);

    return result.rows
}

module.exports = {fetchArticles};