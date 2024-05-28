const {fetchTopics} = require('../models/topicsModel')

const getTopics = async(req,res,next) =>{

    try{
        const topics = await fetchTopics();
        res.status(200).json(topics)
    }
    catch (err){
        next(err);
    }
}

module.exports = {getTopics}