import _ from 'lodash';

exports.prepareFilterData = function(filters, categories){
  return _.mapValues(filters, (pages, filter, filters) => {
  	let reformatedFilter = {};
  	for(var category in categories){
  		let categoryFilter = category.split('/').pop()
  		if(categoryFilter === filter){
  			let collections = categories[category].collections;
  			reformatedFilter['picture'] = collections[Object.keys(collections)[0]].collection_thumb;
  			break;
  		}
  	}
  	// temporary hack when we have more time to fix data
  	// events and places doesn't have a category like holidays, stories
  	if(filter === 'events and places'){
  		reformatedFilter['picture'] = 'ae059557-3cfe-11e6-a2ad-eba45cecdde6';
  	}
  	reformatedFilter['pages'] = pages
  	return reformatedFilter;
  });
}