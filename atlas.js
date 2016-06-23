const path = require('path');
process.env.ATLAS = true;
const Atlas = require(path.join(__dirname, '/applications/atlas/app.js'));
exports = Atlas;
