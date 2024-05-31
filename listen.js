const app = require('./app.js');
const { PORT = 9090 } = process.env;
const db = require('./db'); // Import the database pool
const runSeed = require('./db/seeds/run-seed.js')



//new changes made
db.query('DROP DATABASE IF EXISTS nc_news_test;')
db.query('DROP DATABASE IF EXISTS nc_news;')
db.query('CREATE DATABASE nc_news_test;')
db.query('CREATE DATABASE nc_news;')


runSeed();


app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
