const fs    = require('fs');
const path  = require('path');
const url 	= require('url');
const MD5 = require('MD5');


const express = require('express');
const router  = express.Router();
require(path.join(__dirname, '/../../autoload'));

const atlas_paths = require('atlas_paths');

const MA = require('./media-aliases');
// const MQ = require('./media-queries');

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

	    index = require(path.join(__dirname, '../../media/meta/index.json'));

			Object.keys(index.categories).map(function(category){
				var images = '';

				Object.keys(index.categories[category].collections).map(function(collection){
					index.collections[MD5(collection)].aliases.map(function(alias_uuid){
					images += `<a style="maring-left:10px; margin-right:10px; float:left;" href="/media/alias/${index.aliases[alias_uuid].uuid}"> ${index.aliases[alias_uuid].alias_title} </a>`;
					})
				})
					markup += `<div id="${category}" class="category">`;
					markup += `<h3 style="width:100%; float:left;">${category} </h3> `;
					markup += 	images;
					markup += `</div>`;
			})

		res.send(markup);

});

app.get('*', function (req, res, next) {

	index = require(path.join(__dirname, '../../media/meta/index.json'));
	
	// Are we dealing with a Media Query

	var file_hash = req.params[0].split('/alias/').pop();
	var alias_details = index.aliases[file_hash];
	var alias_dir = atlas_paths._MEDIA_ + '/files/';

	var file_query_format = req.query.format;

	if( file_query_format ){

		var query_file  = path.join(alias_dir, file_hash, "/" + file_query_format + alias_details.uuid_file_ext );

		if( fs.existsSync(query_file) ){
			var file = query_file;
		} else {
			var file = path.join(alias_dir, file_hash, "/original" + alias_details.uuid_file_ext );
			var dims = file_query_format.split('x');
			// rework to make it so it will build the files on first request
			// MQ.format_image(file, query_file, dims[0])
			res.sendfile(query_file)
		}
		
	} else {

		var file = path.join(alias_dir, file_hash, "/original" + alias_details.uuid_file_ext );

	}

	// Serve the File
  	if(file){
  		res.sendfile(file)
  	} else { 
  		next();
  	}




	

});

module.exports = app;