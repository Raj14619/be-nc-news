const {insertCommentsForAnArticleControillers} = require('../models/articlesModel')

const getArticles = async(req,res,next) =>{

   // console.log("Hi")

    try{
        const Articles = await fetchArticles();
        res.status(200).send(Articles)
    }
    catch (err){
        next(err);
    }
    
}

module.exports = {getArticles}