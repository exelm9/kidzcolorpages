const fs = require('fs');
const path = require('path');
const url 	= require('url');

const express = require('express');
const router = express.Router();
require(path.join(__dirname, '/../../autoload'));
const atlas_paths = require('atlas_paths');


const MA = require('./media-aliases');

// Basic Route Demos
// -----------------
var index;
var app = express();
console.log('loaded media aliases')

app.get('/', function (req, res, next) {
	
	var markup = `<style> 
					.category {
					    margin-top: 15px;
					    margin-bottom: 15px;
					}

					.category img {
					    width: 100px;
					    height: 120px;
					    margin: 10px;
					}
				  </style>`,

		index = require(path.join(__dirname, '../../media/aliases/index.json'));

			Object.keys(index.categories).map(function(category){
				var images = '';
				index.categories[category].map(function(image){
					images += `<a href="/media/alias/${image.uuid}"> <img src="/media/alias/${image.uuid}" /> </a>`;
				});
					markup += `<div id="${category}" class="category">`;
					markup += `<h3>${category} <i style=" padding-left:20px; font-size:10px"> ${index.categories[category].length} images </i> </h3> `;
					markup += 	images;
					markup += `</div>`;
			})


		res.send(markup);

});


app.get('*', function (req, res, next) {

	index = require(path.join(__dirname, '../../media/aliases/index.json'));

	// We already know the file alias
	if( index.aliases[req.originalUrl.split('/media/alias/').pop()] ){
	    var alias = index.aliases[req.originalUrl.split('/media/alias/').pop()];
	    var uuid  = atlas_paths._MEDIA_ + '/files/' + alias.uuid + alias.uuid_file_ext;

	} else { // ok let's see if we can find it

		var media = MA.getAliasPath(url.parse(req.originalUrl).pathname, req.query);
		var alias = MA.loadAliasDetails(media[0])
		var uuid  = atlas_paths._MEDIA_ + '/files/' + alias.uuid + alias.uuid_file_ext;

	}

  	if(alias.uuid){
  		res.sendfile(uuid)
  	} else {
  		next();
  	}

});

module.exports = app;

