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
  	reformatedFilter['pages'] = pages
  	return reformatedFilter;
  });
}