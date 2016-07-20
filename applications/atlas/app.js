'use strict';

const path = require('path');

// Enable ES6 and Babel.
require('babel-register')({})
// require('babel-polyfill')

// Launch the Server.
require('./config/config.js');
console.log(process.env.PRODUCTION,'production var')
process.env.ATLAS = true;
process.env.NODE_ENV = 'production';
exports = require(path.join(__dirname, './server.jsx')).default

