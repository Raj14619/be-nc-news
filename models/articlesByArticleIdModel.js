const db = require ('../db');

const fetchArticlesById = async (input) =>{
    const result = await db.query(`SELECT * FROM articles WHERE article_id = $1`, [input]);

   // console.log(result.rows)

    return result.rows
}

module.exports = {fetchArticlesById};