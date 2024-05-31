const app = require('./app.js');
const { PORT = 9090 } = process.env;
//const db = require('./db'); // Import the database pool
//const runSeed = require('./db/seeds/run-seed.js')


const devData = require('../data/development-data/index.js');
const seed = require('./seed.js');
const db = require('../connection.js');

const runSeed = () => {
    return seed(devData).then(() => db.end());
  };
  
  runSeed();
  


//new changes made
// db.query('DROP DATABASE IF EXISTS nc_news_test;')
// db.query('DROP DATABASE IF EXISTS nc_news;')
// db.query('CREATE DATABASE nc_news_test;')
// db.query('CREATE DATABASE nc_news;')




app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
