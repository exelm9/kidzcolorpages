KCP ( Kidz Coloring Pages ) on Atlas

### Project Structure

	root
	  |-- applictions
	  |		|
	  |		|	The applications is comprised of multiple express mini-applications
	  |		|	Each mini-application, when registed in /autoload/applications.json
	  |		|	will be attached to a single server instance of express.
	  |		|
	  |		|
	  |		|-- atlas
	  |		|	
	  |		|	Atlas is a mini-application that is responsible for setting up the 
	  |		|	environment that hosts all the other mini-applications
	  |		|	
	  |	    |
	  |		|-- errors
	  |		|	
	  |		|	Errors is a mini-application that provides fallbacks for the http 
	  |		|	request - response life cycles.
	  |		|
	  |		|	This allows each mini-application to handle only their error handling
	  |		|	while leaving the rest to Errors to handle
	  |		|
	  |		|-- kcp-api
	  |		|	
	  |		|	This is the mini-application that provides the api functionality for 
	  |		|	the coloring pages GUI
	  |		|	
	  |		|		
	  |		|-- kcp-main
	  |		|	
	  |		|	This is the mini-application that produces the GUI, it's structured
	  |		|	to make an isomorphic/universal application easier in the future.
	  |		|	
	  |		|-- media-aliases
	  |		
	  |			All the media images/files of the site are maped out as alias files.
	  |			This mini-application is responsible for all media alias functionality, 
	  |			serving and all other media alias tasks.
	  |		
	  |-- autoload
	  |			
	  |			Autoload allows use to hijack/tap into nodes require paths and add 
	  |			our own paths, to make requiring content/resources more flexible.
	  |			
	  |-- http_public
	  |	
	  |			Any files placed within this directory will be servered up as 
	  |			static files automaticly.
	  |
	  |-- media
	  |		
	  |			All the media files and their aliases are stored here. They are private 
	  | 		by default and must be explicitly returned.
	  |
	  |-- atlas.js
	  	  		
	  			This runs a couple command in start up, and launches the server.
	  

### Install & Setups

	1) 	clone this repo
	
	2) 	run "$ npm install" in each mini-application's folder to ensure they have all the 
		node_modules and setups they need.

	2.a) Initialize and mini-application caches or build scripts
	
	3)  run "$ npm install" in the /autoload

	4)  run "$ node atlas " in the root of this project.

	
