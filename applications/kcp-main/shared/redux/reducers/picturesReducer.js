import { FETCH_PICTURES, FIND_PICTURES, SET_FILTERS, SET_SEARCH, SHOW_PICTURES } from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
	allPictures:null,
  categoryList: [],
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
        // if filter is enabled, then only add filtered content to filteredCategories
        if(filter){
          if(removeCategory(key, filter)) continue;
        }else if(state.enabledFilter){
          if(removeCategory(key, state.enabledFilter)) continue;
        }

        // if user is searching, then only add serched content to filteredCategories
        if(searchTerm){
          if(searchCategory(key, searchTerm)) continue;
        } else if(state.searchFor){
          if(searchCategory(key, state.searchFor)) continue;
        }

        let category = allCategories[key];
        filteredCategories.push(category);
      }
    }
    return filteredCategories;
  }

  const removeCategory = (category, filter) => {
    let categories = category.split("/");
    for(let i = 0; i < categories.length; i++){
      if(categories[i] === filter)
        return false;
    }
    return true;
  }

  const searchCategory = (category, searchTerm) => {
    let categories = category.split("/");
    for(let i = 0; i < categories.length; i++){
      if( categories[i].indexOf(searchTerm) > -1 ){
        return false;
      }
    }
    return true;
  }

  switch (action.type) {
    case FETCH_PICTURES:
      let categoryList = filterCategories(action.payload);
    	return {...state, allPictures: action.payload, categoryList, isFetching: false};
    case SHOW_PICTURES:
      return {...state, categoryList: action.categoryList};
    case SET_FILTERS:
      categoryList = filterCategories(state.allPictures, action.filter);
      return {...state, enabledFilter:action.filter, categoryList};
    case FIND_PICTURES:
      categoryList = filterCategories(state.allPictures, null, action.term);
      return {...state, searchFor:action.term, categoryList };
    case SET_SEARCH:
      return {...state, searchFor:action.term};
    default:
      return state;
  }
}

