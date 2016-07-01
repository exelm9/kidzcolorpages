var assert 	= require('assert'),
    fs 		= require('fs.extra'),
    path 	= require('path'),
    dirTree = require('directory-tree'),
    im 		= require('imagemagick'),
    QT 		= require('quickthumb'),
    sizes 	= [
			    { width: 100, height: 100},
			    { width: 200, height: 200},
			];

exports.make_thumbs = function make_thumbs(_dir){
	tree = dirTree(_dir);

	tree.children.map(function(child){
		if(child.children){
			for(kid in child.children){
				if(child.children[kid].name.charAt(0) !== '.'){

					var from = child.children[kid].path;

					sizes.forEach(function(options){

						var to = child.children[kid].path.replace(child.children[kid].name, '') + options.width + 'x' + options.height + '.' +child.children[kid].name.split('.').pop();

					    var opt = {
					    	type : 'resize',
					        src : from,
					        dst : to,
					        width : options.width,
					        height : options.height,
					        quality : 1,
					    };

					    console.log('From:', opt.src)
					    console.log('To:', opt.dst)
					    // QT.convert( opt, function(err, image){

					    // 	if(err){
					    // 		console.log('oops', err);
					    // 	}
					     	
					    // });

					});
				}
			}
		}
	})
}