import { FETCH_PICTURES, FIND_PICTURES, SET_FILTERS, SHOW_PICTURES } from '../constants/ActionTypes';

const initialState = {
	pictures:null,
  visiblePictures: null,
	isFetching:true,
	enabledFilter:null
}

export default function picturesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PICTURES:
    	return {...state, pictures: action.payload, isFetching:false};
    case SET_FILTERS:
      return {...state, enabledFilter:action.filters};
    case FIND_PICTURES:
      return {...state, pictures: action.payload};
    case SHOW_PICTURES:
      return {...state, visiblePictures: action.visiblePictures}
    default:
      return state;
  }
}
