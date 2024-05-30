const db = require('../db');

async function getAllUsers(req, res, next) {
  try {
    // Fetch all users from the database
    const users = await db.query('SELECT username, name, avatar_url FROM users');

    // Send the array of users as a response
    res.json(users.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUsers };
