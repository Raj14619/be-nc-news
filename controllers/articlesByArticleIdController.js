const { fetchArticlesById } = require('../models/articlesByArticleIdModel');

const getArticlesById = async (req, res, next) => {
  let arr = Object.values(req.params);
  let value = parseInt(arr[0], 10);

  if (isNaN(value)) {
    return res.status(400).send("You have entered an article_id which is not a number");
  }

  try {
    const article = await fetchArticlesById(value);
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }
    res.status(200).json({ article });
  } catch (err) {
    next(err);
  }
}

module.exports = { getArticlesById };
