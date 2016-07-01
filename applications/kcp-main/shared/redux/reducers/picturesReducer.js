import { FETCH_PICTURES, FIND_PICTURES, SET_FILTERS, SET_SEARCH, SHOW_PICTURES } from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
	allPictures:null,
  categoryList: [],
  pictureList:[],
	isFetching:true,
	enabledFilter:null,
  searchFor:null
}

export default function picturesReducer(state = initialState, action) {
  const filterCategories = (allData, filter, searchTerm) => {
    // turn nested picture data into a flat array
    //console.log(state.enabledFilter, state.searchFor, allData,'should be all')
    let filteredCategories = [];

    if(allData){
      let allCategories = allData.categories;
      // iterate through every category that has nested pictures
      for(let key in allCategories){
        let collection = allCategories[key].collections
        // if filter is enabled, then only add filtered content to filteredCategories
        if(filter){
          if(removeCategory(key, filter)) continue;
        }else if(state.enabledFilter){
          if(removeCategory(key, state.enabledFilter)) continue;
        }

        let category = allCategories[key];
        filteredCategories.push(category);
      }
    }
    return filteredCategories;
  }

  const searchCollections = (allData, searchTerm) => {
    let searchedCollections = {
      pictures:[],
      category:[]
    };

    if(allData){
      let allCategories = allData.categories;
      let allCollections = allData.collections
      // iterate through every category that has nested pictures
      for(let key in allCategories){
        let collections = allCategories[key].collections
        let foundCollections = null;
        let category = allCategories[key];
        // if user is searching, then only add searched content to searchedCollections
        if(searchTerm){
          foundCollections = findCollections(searchTerm, collections);
          if(foundCollections.length === 0) continue;
        }

        foundCollections = filterCollections(allCollections, foundCollections);
        for(let i = 0; i < foundCollections.length; i++){
          searchedCollections.pictures.push(foundCollections[i]);
        }
        
        searchedCollections.category.push(category);
      }
    }
    return searchedCollections;
  }

  const removeCategory = (category, filter) => {
    let categories = category.split("/");
    for(let i = 0; i < categories.length; i++){
      if(categories[i] === filter)
        return false;
    }
    return true;
  }

  const findCollections = (searchTerm, collections) => {
    var results = [];
    for(var key in collections){
      let collectionsItem = collections[key];
      if( key.indexOf(searchTerm) > -1 ){
        results.push(collectionsItem);
      }
    }
    return results;
  }

  const filterCollections = (allCollections, collections) => {
    let results = []
    for(let key in collections){
      let collection = collections[key];
      let uuid = collection.uuid;
      results.push(allCollections[uuid]);
    }
    return results;
  }

  switch (action.type) {
    case FETCH_PICTURES:
      let categoryList = filterCategories(action.payload);
    	return {...state, allPictures: action.payload, categoryList, isFetching: false};
    case SHOW_PICTURES:
      return {...state, categoryList: action.categoryList};
    case SET_FILTERS:
      categoryList = filterCategories(state.allPictures, action.filter);
      return {...state, enabledFilter:action.filter, categoryList, pictureList:[]};
    case FIND_PICTURES:
      let picsWithCategory = searchCollections(state.allPictures, action.term);
      let pictureList = picsWithCategory.pictures;
      categoryList = picsWithCategory.category;
      return {...state, searchFor:action.term, pictureList, categoryList };
    case SET_SEARCH:
      return {...state, searchFor:action.term};
    default:
      return state;
  }
}

