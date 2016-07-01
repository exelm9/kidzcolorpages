/**

	This script will assist you in cataloging a directory of folders
	and files. It will produce a tree of the directory structure and 
	it's files

	You can then use that tree to build alias files and import the 
	files along with their media aliases.

*/
const fs = require('fs.extra');
const path = require('path');

const dirTree = require('directory-tree');
const uuid 	= require('node-uuid');
const hasher = require('MD5');

const media_queries = require(path.join(__dirname, 'media-quieries'));
const media_alias = require( path.join(__dirname, 'media-aliases.js'));

var tree,
	alias_template,
	_pwd = __dirname, 
	source_dir = path.join(__dirname, '../../media/incoming'),
	target_dir,
	aliases_dir = path.join(__dirname, '../../media/aliases'),
	ignore_exts = {
				'.DS_Store': 'Sys files',
				'..DS_Store': 'Sys files',
				'.zip': 'Archives',
				'.php': 'PHP Scripts',
				'.tmb': 'Sys Thumbs DB',
				'.flp': 'FlipBook',
				'.db': 'DataBases',
				'.alias': 'File Alias Files',
				'.jbf': 'Something Not Needed',
				'..stub': 'version control artifact'
	}

var _count = 0;

	/*
		Traverse a directory building up a
		tree of it's structure.

	*/
	function catalog_files(_path){
		tree = dirTree(_path);
		flatten_tree(tree);
		_aliases = tree;
	}

	/*
		print out the structure of a tree.

	*/
	function flatten_tree(t){
		_count++;
		for( child in t.children){
			flatten_tree(t.children[child])
		}
	}

	function get_count(){
		return _count;
	}

	/*
		Using the tree we will walk the tree, creating file aliases
		for each file in the tree.
	*/
	function make_alias_files(destination){
		destination = destination || target_dir;
		console.log('Making Alias Files')
		if( !tree ) return 'You need to build a tree first';

		var aliases = []

		function walk_tree (t){
			var alias = make_alias_profile(t);
			aliases.push(alias);
			for(child in t.children){
				walk_tree(t.children[child]);
			}
		}

		walk_tree(tree);
		_aliases = aliases;

		if(!destination){
			console.log(_aliases);
		} else {
			console.log('importing files...');
			_aliases.map(function(alias){
				if(alias.type === 'file'){
					import_file_and_make_alias (alias)
				} else {
					console.log('skipping directory ' + alias.uuid )
				}
			});
		}

	}

	/*
		Import a source file, create a file alias for it and save/move them into place
	*/
	function import_file_and_make_alias (alias){

		// Check that the file is not in the excludes list.
		if(!ignore_exts[alias.uuid_file_ext]){

			console.log('importing ' + alias.uuid );

			// Make File Alias

				const base_dir = base_dir || path.join(__dirname, '../../media')
				const aliases_dir = path.join( base_dir, '/aliases' , alias.uuid + alias.uuid_file_ext + '.alias' )

				fs.writeFile(aliases_dir, JSON.stringify(alias, null, 4), function(err) {
				    if(err) {
				      console.log(err);
				    } else {
				      console.log("Alias created at " + aliases_dir);
				    }
				}); 

			// Setup File's Directory
				const target_dir = path.join( base_dir, '/files/', alias.uuid);
				if (!fs.existsSync(target_dir)) fs.mkdirSync(target_dir);

			// Import and rename source file.
				const destination = path.join( target_dir, 'original' + alias.uuid_file_ext )
				const source = path.join(source_dir,  alias.source_path)

			fs.move(source, destination, function (err) {
			  if (err) {
			    console.log('File Import: ', err)
			    throw err;
			  } else {
			  	console.log("Alias file imported to " + destination);
			  }
			});
		}
	}

	function make_alias_profile( fd ){

		if( fd.path ){

			if( !alias_template ) alias_template = require('./alias_template.json');

			const 	alias = Object.assign({}, alias_template);
					alias.src = 'local';
					alias.uuid = uuid.v1();
					alias.source_name = fd.name;
					alias.source_path = fd.path;
					alias.source_dirname = path.dirname(fd.path.split(source_dir).pop())
			
			
			if( fd.children ){ // is folder
			
				alias.type = 'folder';	
			
			} else { // is file
			
				alias.type = 'file';
				alias.uuid_file_size = fd.size;

				if(alias.source_name.charAt(0) !== '.'){
					alias.uuid_file_ext = '.' + alias.source_name.split('.').pop() || 'unknown';	
				} else {
					alias.uuid_file_ext = '.' + alias.source_name;
				}
			}
			
			return alias;
		} 
		return false;
	
	}

	function make_index(){

		var index = {
			aliases: {},
			categories:{},
			collections:{},
			filters: {},
			segments: {}
		};

		var _list = dirTree(aliases_dir);

		_list.children.map(function(alias){

			var _alias = media_alias.load_alias_details(alias.path);

			if( _alias && _alias.uuid ){ // we have a valid alias object
			
				// extract Taxonomies
				index.aliases[_alias.uuid] = _alias;

				var _Paths = path.parse(index.aliases[_alias.uuid].source_path);
				var _mPath = _Paths.dir.split('/media/incoming/').slice(1);
				var _Collection = _mPath[0].split('/').pop();
				var _Category = _mPath[0].replace('/'+_Collection, '');
				var _Title = _Paths.name;

				// All Containers
				(_Category + '/' + _Collection).split('/').map(function(part){
					if(! index.segments[part]){
						index.segments[part] = 1;
					} else {
						index.segments[part]++;
					}
				})

				// All Containers
				_Category.split('/').map(function(part){
					if(! index.filters[part]){
						index.filters[part] = 1;
					} else {
						index.filters[part]++;
					}
				})

				// Update the Alias Details 
				_alias = index.aliases[_alias.uuid];
				_alias.alias_title 	 = _Title; // This will need to be cleaned up later
				_alias.alias_alt_tag = _Title; // This will need to be cleaned up later
				_alias.alias_details = _Title; // This will need to be cleaned up later

				// Register Category
				if(!index.categories[_Category]){

					var _cat = {
						category_title: _Category.split('/').pop(),
						category_mPath: _Category,
						category_uuid: hasher(_Category), // this will always be the same, if the _Category is the same.
						collections: {},
						collections_count: 1
					};
					
					index.categories[_Category] = _cat;

				} else {
					var _cat = index.categories[_Category];
				}

				// Manage Collection Details
				var collection = {
					collection_title: _Collection,
					collection_uuid: hasher(_Collection),
					collection_mPath: _mPath[0],
					alias_count: 1,
					aliases: []
				}

				if( ! index.categories[_Category].collections[collection.collection_title] ){
					index.categories[_Category].collections[collection.collection_title] = ({title: collection.collection_title, uuid: collection.collection_uuid, collection_thumb: _alias.uuid });
					index.categories[_Category].collections[collection.collection_title].alias_count = 1;
				} else {
					index.categories[_Category].collections[collection.collection_title].alias_count++;
				}
				
				// Save to Collection
				if( !index.collections[collection.collection_uuid] ){
					index.collections[collection.collection_uuid] = collection;
				} 

				index.collections[collection.collection_uuid].aliases.push(_alias.uuid);
				index.collections[collection.collection_uuid].alias_count++;

			}

		});


		fs.writeFile( path.join(aliases_dir, '../meta/index.json'), JSON.stringify(index, null, 4), function(err) {
		    if(err) {
		      console.log(err);
		    } else {
		      console.log("Aliases Index created at " + aliases_dir);
		    }
		});

	}

	function process_incoming(root, source) {
		root = root || path.join(__dirname, '../../media');
	 	if(root){
	 		source = source || path.join(root, '/incoming');
			console.log('setting root to ' + path.join(__dirname, root));
			console.log('setting source to ' + path.join(__dirname, source));
			console.log('pwd is ' + _pwd );
	 	}

	 	console.log('indexing source files', source);
	 		catalog_files(source);
	 	console.log('making Aliases', source);
			make_alias_files(source);
		console.log('making index')
			setTimeout(function(){
				make_index();
			},1000)
	}

	// helper functions...
	function pwd(){
		return _pwd;
	}

	function paths(){
		return [_pwd, target_dir, source_dir];
	}

	function set_root(relative_path){
		target_dir = path.join(__dirname, relative_path);
		return target_dir
	}

	function set_source(relative_path){
		source_dir = path.join(__dirname, relative_path);
		return source_dir;
	}

// exports... 
module.exports.count = get_count;
module.exports.pwd = pwd;
module.exports.paths = paths;
module.exports.set_root = set_root;
module.exports.set_source = set_source;
module.exports.process_incoming = process_incoming;
module.exports.make_index = make_index;