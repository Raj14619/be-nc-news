const {fetchAllCommentsForAnArticle} = require('../models/AllCommentsForAnArticleModel')

const getAllCommentsForAnArticle = async(req,res,next) =>{


    const { article_id } = req.params;

    // Validate article_id
    if (isNaN(article_id)) {
        return res.status(400).json({ error: 'Invalid article ID' });
    }

    try {
        const result = await fetchAllCommentsForAnArticle(article_id);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No comments found for this article' });
        }
        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
};

module.exports = {getAllCommentsForAnArticle}