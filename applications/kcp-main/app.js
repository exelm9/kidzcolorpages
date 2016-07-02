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
				   	<link rel="stylesheet" href="/kcp/styles/font-awesome.css">
				   	<link rel="stylesheet" href="/kcp/styles/style.css">
				   	<link rel="stylesheet" href="/kcp/styles/animate.css">
				   </head>
				   <body>
				   	<div class="container"></div>
				   	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
				   	<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
				   	<script src="/kcp/dist/bundle.js"></script>
				   	<script> 
				   		      window.apply_styles = function(){
						        setTimeout(function(){
						            var link = window.frames[0].document.createElement("link");
						            var head = window.frames[0].document.getElementsByTagName("head")[0];
						                link.setAttribute("rel", "stylesheet");
						                link.setAttribute("type", "text/css");
						                link.setAttribute("href", "/kcp/styles/preview.css");
						                head.appendChild(link);
						        },1);
						      }

				   	</script>
				   </body>
				</html>`
			);
})
module.exports = app;
