const fs = require('fs');
const path = require('path');

let cache;

module.exports = () => {
  if (cache) {
    return cache;
  }

  const mockPath = path.resolve('./server/db/db.json');
  const readDB = () => JSON.parse(fs.readFileSync(mockPath, 'utf8'));

  const DB = readDB();

  if (typeof DB === 'undefined') {
    console.error('DB undefined');
    return {};
  }

  cache = DB;

  return cache;
};
