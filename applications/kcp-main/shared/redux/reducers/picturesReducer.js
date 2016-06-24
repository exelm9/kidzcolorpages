import { FETCH_PICTURES, FIND_PICTURES, SET_FILTERS } from '../constants/ActionTypes'

const initialState = {
	pictures:null,
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
    default:
      return state;
  }
}
