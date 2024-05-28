const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topicsController');
const db = require('./db'); // Import the database pool

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/', )

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "internal server error" });
});

app.listen(4000, () => {
  console.log("server running on port 4000");
});

module.exports = app; // Export the app for testing
