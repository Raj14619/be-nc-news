const app = require('./app.js');
const { PORT = 9090 } = process.env;
const db = require('./db'); // Import the database pool
const runSeed = require('./db/seeds/run-seed.js')



// New changes made
db.query('DROP DATABASE IF EXISTS nc_news_test;')
  .then(() => db.query('DROP DATABASE IF EXISTS nc_news;'))
  .then(() => db.query('CREATE DATABASE nc_news_test;'))
  .then(() => db.query('CREATE DATABASE nc_news;'))
  .then(() => {
    // After creating databases, run the seed function
    return runSeed();
  })
  .then(() => {
    // Start the server after seeding the database
    app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error setting up databases and seeding:', error);
    process.exit(1); // Exit the process with a non-zero status code
  });