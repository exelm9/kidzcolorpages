import { FETCH_PICTURES, FIND_PICTURES, SET_FILTERS } from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
	pictures:null,
	isFetching:true,
	enabledFilter:null,
  searchFor:null
}

export default function picturesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PICTURES:
    	return {...state, pictures: action.payload, isFetching:false};
    case SET_FILTERS:
      return {...state, enabledFilter:action.filter};
    case FIND_PICTURES:
      return {...state, searchFor:action.term};
    default:
      return state;
  }
}
