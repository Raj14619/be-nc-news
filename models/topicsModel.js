const db = require ('../db');

const fetchTopics = async () =>{
    const result = await db.query(`SELECT * FROM topics`);

    return result.rows
}

module.exports = {fetchTopics};