const express = require('express');
const app = express();
const db = require('./db'); // Import the database pool
app.use(express.json());

const { getTopics } = require('./controllers/topicsController');
const { getAPI } = require('./controllers/apiController');
const { getArticlesById } = require('./controllers/articlesByArticleIdController');
const {getArticles} = require('./controllers/articlesController')

app.get('/api/topics', getTopics);

app.get('/api/', getAPI);


app.get('/api/articles/', getArticles)

app.get('/api/articles/:article_id', getArticlesById);



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "internal server error" });
});

app.listen(4000, () => {
  console.log("server running on port 4000");
});

module.exports = app; // Export the app for testing
