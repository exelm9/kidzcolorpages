var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

// Atlas Paths.
require(path.join(__dirname, '/../../../autoload'));
const atlas_paths = require('atlas_paths');

const MA = require('../../media-aliases/media-aliases');
const index = MA.get_index();

module.exports = function(app){

	// make it easier to work with request date.
	app.use(bodyParser.json());

	app.get('/search/*', function(req, res, next) {


		const query = 'aladdin';
		// const searchFilters; // Filter Results by
		// const offset; // Return results from this offset
		// const size; // how many results do you want

		const _index = index  || MA.get_index();
		// const results = [];

		// var keys = Object.key(index.categories);
		// key.filter(function(key){
		// 	if( key.indexOf(query)) return true;
		// })

		// key.map(function(key){
		// 	results.push( index.categories[key] )
		// })

		// const filters = require(path.join(__dirname, '../filters'));

	  	res.json(JSON.stringify(_index.categories))
	});

		// Basic Route Demos
	app.get('/', function(req, res, next) {
		const _index = index || MA.get_index();
		const results = {};
			  results.categories = _index.categories;
			  results.filters = 
			  ['animals',
			  'education',
			  'holidays',
			  'movie characters',
			  'projects',
			  'stories',
			  'vehicles',
			  'fun',
			  'sketchies'];

	  	res.json(JSON.stringify(results))
	});

	app.get("/err", function(req, res, next){
	  next(new Error("Some Error"));
	});
	
}