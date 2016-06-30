//auth/app.js

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB
mongoose.connect('mongodb://localhost:kcpAuth/kcpAuth');
// Root Express App
// ----------------

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
router(app)

//server
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('auth server listening on: ', port);

module.exports = app;
