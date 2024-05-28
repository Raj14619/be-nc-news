const fs = require('fs');
const path = require('path');

const getAPI = (req, res, next) => {
  const filePath = path.join(__dirname, '../endpoints.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(JSON.parse(data));
  });
};

module.exports = { getAPI };
