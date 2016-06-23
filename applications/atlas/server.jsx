import 	http from 'http'
import 	path from 'path'

import 	express from 'express'
const 	http_server = express()

// Atlas Autoloading
const 	autoloader = require( path.join(__dirname, '/../../autoload') );
const 	atlas_paths = require( 'atlas_paths' );

/**
	 Mount Atlas Applications 

	 We will fetch a list of the current Atlas Application, each of which will
	 extend express, and we will add them to this express server as middleware.

	 If any of these applications fails or returns something other than a
	 valid express app, we will log it out and skip it.

**/
	const  	applications = require('applications');
	applications.forEach(function(app){
		
		// select the app's app.js file.
		let _app_ = require( atlas_paths._APPS_ + app.app_dir +  app.entry )

		// inspect the app, to ensure it's a valid express app
		if( typeof _app_ === 'function' && _app_.handle.toString() === http_server.handle.toString()){
			//It's valid, let's add it as middleware
			http_server.use( app.base_url, _app_ )
		} else {
			// It was not a valid express application, let's log it and skip.
			console.log('[ error ] ', app.app_name, 'could not be mounted.')
		}	
	});

// Mount Atlas Fallback Routes

require('./routes').default(http_server, express)

/**
	There is an Errors application, that we use to handle all non-handled errors
	in a centralized manor.
*/
http_server.use( require( path.join( atlas_paths._APPS_, '/errors/app' )))

// Launch Server
http_server.listen(1337, function () {
  console.log('Example app listening on port 1337!')
});

exports = http_server;