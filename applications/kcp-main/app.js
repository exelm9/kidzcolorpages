const express = require("express");
const app = express();

app.use('/dist', express.static('/dist'));

module.exports = app;
