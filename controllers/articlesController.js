const { fetchArticles } = require('../models/articlesModel');
const getArticles = async (req, res, next) => {
  const { topic } = req.query;
  try {
    const articles = await fetchArticles(topic);
    res.status(200).json({ articles });
  } catch (err) {
    next(err);
  }
};
module.exports = { getArticles };