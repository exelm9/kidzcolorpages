const fs = require('fs.extra');
const path = require('path');
const dirTree = require('directory-tree');
const uuid 	= require('node-uuid');
const media_alias = require( path.join(__dirname, 'media-aliases.js'));
const hasher = require('MD5');
/**
	This script will assist you in cataloging a directory of folders
	and files. It will produce a tree of the directory structure and 
	it's files

	You can then use that tree to build alias files and import the 
	files as media aliases.
*/

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
				'.jbf': 'Something Not Needed'
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

		function walktree (t){
			var alias = make_alias(t);
			aliases.push(alias);
			for(child in t.children){
				walktree(t.children[child]);
			}
		}

		walktree(tree);
		_aliases = aliases;

		if(!destination){
			console.log(_aliases);
		} else {
			console.log('importing files...');
			_aliases.map(function(alias){
				if(alias.type === 'file'){
					import_alias(alias)
				} else {
					console.log('skipping directory ' + alias.uuid )
				}
			});
		}

	/*
		Import a source file, create a file alias for it and save/move them into place
	*/
	function import_alias(alias){

		if(!ignore_exts[alias.uuid_file_ext]){

			console.log('importing ' + alias.uuid );
			/* The Base dir should have an aliases directory and a files directory. */
			var base_dir = base_dir || path.join(__dirname, '../../media');

			// Save File Alias
			var aliases_dir = path.join( base_dir, '/aliases' , alias.uuid + alias.uuid_file_ext + '.alias' )
			fs.writeFile(aliases_dir, JSON.stringify(alias, null, 4), function(err) {
			    if(err) {
			      console.log(err);
			    } else {
			      console.log("Alias created at " + aliases_dir);
			    }
			}); 

			// Import and rename source file.
			var destination = path.join( base_dir, '/files' , alias.uuid + alias.uuid_file_ext )
			var source = path.join(source_dir,  alias.source_path)
			fs.move(source, destination, function (err) {
			  if (err) {
			    throw err;
			  } else {
			  	console.log("Alias file imported to " + destination);
			  }
			});
		}
	}

	
}

function make_alias( fd ){
	if( fd.path ){

		if( !alias_template ) alias_template = require('./alias_template.json');
			console.log('FD_PATH', fd.path)
		var alias = Object.assign({}, alias_template);
			alias.src = 'local';
			alias.uuid = uuid.v1();
			alias.source_name = fd.name;
			alias.source_path = fd.path;
			alias.source_dirname = path.dirname(fd.path.split(source_dir).pop())
		
		
		if(fd.children){ // is folder
			
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

function import_files(root, source) {
 	if(root){
 		source = source || path.join(root, '/incoming');
		console.log('setting root to ' + path.join(__dirname, root));
		console.log('setting source to ' + path.join(__dirname, source));
		console.log('pwd is ' + _pwd );
 	}
 	console.log('indexing source files');
 	catalog_files(source);
 	console.log('making Aliases');
	make_alias_files(source);
}

function make_index(){
	// The shape of our data, when we are done.

	var index = {
		aliases: {},
		categories:{},
		collections:{},
		filters: {},
		segments: {}
	};

	var _list = dirTree(aliases_dir);

	_list.children.map(function(alias){

		var _alias = media_alias.loadAliasDetails(alias.path);
		if( _alias && _alias.uuid ){ // we have a valid alias object
			// extract Taxonomies
			index.aliases[_alias.uuid] = _alias;

			var _Paths = path.parse(index.aliases[_alias.uuid].source_path),
				_mPath = _Paths.dir.split('../../media/incoming/').slice(1);
				_Collection = _mPath[0].split('/').pop();
				_Category = _mPath[0].replace('/'+_Collection, '');
				_Title = _Paths.name;

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
						collections_count: 0
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
					collection_thumb: _alias.uuid,
					alias_count: 0,
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


	fs.writeFile(aliases_dir + '/index.json', JSON.stringify(index, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log("Aliases Index created at " + aliases_dir);
	    }
	});

}

function clean_aliases(){
	//
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
module.exports.index = catalog_files;
module.exports.count = get_count;
module.exports.makeAliases = make_alias_files;
module.exports.pwd = pwd;
module.exports.paths = paths;
module.exports.set_root = set_root;
module.exports.set_source = set_source;
module.exports.import_files = import_files;
module.exports.make_index = make_index;
module.exports.clean_aliases = clean_aliases;

// import_files('../../media')
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    var searchIsNaN = isNaN(searchElement);
    while (k < len) {
      currentElement = O[k];
      // SameValueZero algorithm has to treat NaN as equal to itself, but
      // NaN === NaN is false, so check explicitly
      // SameValueZero treats 0 and -0 as equal, as does ===, so we're fine there
      if (searchElement === currentElement || (searchIsNaN && isNaN(currentElement))) {
        return true;
      }
      k++;
    }
    return false;
  };
}