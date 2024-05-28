const express = require ('express')

const app = express();

//const db = require('/db');


const { getTopics} = require('./controllers/topicsController')

app.use(express.json());



app.get('/api/topics', getTopics);


app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).json({error: "internal server error"});
})



app.listen(4000, () => {
    console.log("server running on port 4000");
})