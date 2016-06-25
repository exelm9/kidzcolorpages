import { FETCH_PICTURES, FIND_PICTURES, SET_FILTERS, SHOW_PICTURES } from '../constants/ActionTypes';

const initialState = {
	allPictures: null,
  filteredPictures: null,
  visiblePictures: [],
	isFetching: true,
	enabledFilter: null
}

// helper functions
const flattenObject = (object) => {
  // turn nested picture data into a flat array
  let flatPicsArr = [];
  let pics = object;

  if (pics) {
    let allNestedPictures = pics.categories;
    for (let key in allNestedPictures) {
      // if(pictures.enabledFilter){
      //   if(removeCategory(key, pictures.enabledFilter)) continue;
      // }
      let categoryPictures = allNestedPictures[key];
      for (let i = 0; i < categoryPictures.length; i++) {
        let individualPicture = categoryPictures[i]
        flatPicsArr.push(individualPicture);
      }
    }
  }

  return flatPicsArr;
}

const removeCategory = (category, filter) => {
  let categories = category.split("/");
  for(let i = 0; i < categories.length; i++){
    if(categories[i] === filter)
      return false;
  }
  return true;
}

export default function picturesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PICTURES:
      let filteredPictures = flattenObject(action.payload);
      let visiblePictures = filteredPictures.slice(0, 12);
    	return {...state, allPictures: action.payload, filteredPictures, visiblePictures, isFetching: false};
    case SET_FILTERS:
      return {...state, enabledFilter: action.filters};
    case FIND_PICTURES:
      return {...state, pictures: action.payload};
    case SHOW_PICTURES:
      return {...state, visiblePictures: action.visiblePictures}
    default:
      return state;
  }
}

