const fs = require('fs.extra');
const path = require('path');
const dirTree = require('directory-tree');
const uuid 	= require('node-uuid');
const media_alias = require( path.join(__dirname, 'media-aliases.js'));

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
function catalog_files(path){
	tree = dirTree(path);
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

	if( !alias_template ) alias_template = require('./alias_template.json');
	
	var alias = Object.assign({}, alias_template);
		alias.src = 'local';
		alias.uuid = uuid.v1();
		alias.source_name = fd.name;
		alias.source_path = fd.path;
		alias.source_dirname = path.dirname(fd.path.split(source_dir).pop())
	
	// is folder?
	if(fd.children){
		alias.type = 'folder';	
	} else {
	// is file
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
	var _list = dirTree(aliases_dir);
	var index = {
		aliases: {},
		categories:{}
	};

	_list.children.map(function(alias){
		var _alias = media_alias.loadAliasDetails(alias.path);
		if( _alias && _alias.uuid ){ // we have a valid alias object
			index.aliases[_alias.uuid] = _alias;
			// extract Categories
			var _cats = path.parse(index.aliases[_alias.uuid].source_path).dir.split('../../media/incoming/').slice(1);
			_cats.map(function(category){
				if(index.categories[category]){
					index.categories[category].push({uuid:_alias.uuid, title:_alias.uuid});
				} else {
					index.categories[category] = [{uuid:_alias.uuid, title:_alias.uuid}];
				}
			})
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