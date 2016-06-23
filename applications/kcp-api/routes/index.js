var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

// Atlas Paths.
require(path.join(__dirname, '/../../../autoload'));
const atlas_paths = require('atlas_paths');

const MA = require('../../media-aliases/media-aliases');


module.exports = function(app){

	// make it easier to work with request date.
	app.use(bodyParser.json());

	app.get('/search/*', function(req, res, next) {


		const query = 'aladdin';
		// const searchFilters; // Filter Results by
		// const offset; // Return results from this offset
		// const size; // how many results do you want

		const index = MA.get_index();
		// const results = [];

		// var keys = Object.key(index.categories);
		// key.filter(function(key){
		// 	if( key.indexOf(query)) return true;
		// })

		// key.map(function(key){
		// 	results.push( index.categories[key] )
		// })

		// const filters = require(path.join(__dirname, '../filters'));

	  	res.send(`<pre> ${JSON.stringify(index.categories, null, "  ")} </pre>`)
	});

		// Basic Route Demos
	app.get('/', function(req, res, next) {
		const results = {};
			  results.categories = MA.get_index().categories;
			  results.filters:['ninjas', 'animals', 'furrys'];

	  	res.send(`<pre> ${JSON.stringify(index.categories, null, "  ")} </pre>`)
	});

	app.get("/err", function(req, res, next){
	  next(new Error("Some Error"));
	});
	
}