const {fetchArticlesById} = require('../models/articlesByArticleIdModel')

const getArticlesById = async(req,res,next) =>{



    let arr = Object.values(req.params);

    let value = parseInt(arr[0], 10)

    console.log(value)

   if(isNaN(value)){
    console.log("Hi")
    res.status(400).send("You have entered an article_id which is not a number")
   }


    // console.log(Object.values(req.params))

    try{
        const topics = await fetchArticlesById(value);
        res.status(200).json(topics)
    }
    catch (err){
        next(err);
    }
}

module.exports = {getArticlesById}