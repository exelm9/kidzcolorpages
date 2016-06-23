const        express = require("express");
const 	        http = require('http');
const    http_server = require('express')();

const app = express();



http_server.listen(1337, function () {
  console.log('Example app listening on port 1337!');
});



