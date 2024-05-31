const app = require('./app.js');
const { PORT = 9090 } = process.env;
//const db = require('./db'); // Import the database pool
//const runSeed = require('./db/seeds/run-seed.js')


const devData = require('./db/data/development-data/index.js');
const seed = require('./db/seeds/seed.js');
const db = require('./db/connection.js');

const runSeed = async () => {
    await seed(devData);
    return await db.end();
  };
  
  runSeed();
  


//new changes made
// db.query('DROP DATABASE IF EXISTS nc_news_test;')
// db.query('DROP DATABASE IF EXISTS nc_news;')
// db.query('CREATE DATABASE nc_news_test;')
// db.query('CREATE DATABASE nc_news;')




app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
