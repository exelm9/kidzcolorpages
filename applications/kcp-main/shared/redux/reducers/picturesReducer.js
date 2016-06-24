import { FETCH_PICTURES, FIND_PICTURES } from '../constants/ActionTypes'

const initialState = {
	pictures:null,
	isFetching:true,
	enabledFilters:[]
}

export default function picturesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PICTURES:
    	return {...state, pictures: action.payload, isFetching:false};
    case FIND_PICTURES:
      return {...state, pictures: action.payload, isFetching:isFetching};
    default:
      return state;
  }
}
