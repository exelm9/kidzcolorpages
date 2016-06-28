const path = require('path');
const express = require("express");
const app = express();

app.locals.title = 'Kidz Coloring Pages Main';

app.use('/kcp/dist', express.static(path.join(__dirname, '/dist')));
app.use('/kcp/styles', express.static(path.join(__dirname,'/shared/styles')));
// // app.use(express.static(path.join(__dirname, '/shared')))
// app.get('/kcp/bundle.js', function(req, res, next){
// 	res.sendfile(path.join(__dirname, '/dist/bundle.js'))
// })

app.get('/browse', function(req, res, next){

	res.send(`<!DOCTYPE html>
				<html>
				   <head>
				   	<link rel="stylesheet" href="/kcp/styles/bootstrap.css">
				   	<link rel="stylesheet" href="/kcp/styles/style.css">
				   </head>
				   <body>
				   	<div class="container"></div>
				   	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
				   	<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
				   	<script src="/kcp/dist/bundle.js"></script>
				   </body>
				</html>`
			);
})
module.exports = app;
