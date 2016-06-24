import { FETCH_PICTURES, FIND_PICTURES } from '../constants/ActionTypes'

// Need to Refactor to use /kcp-api/
// import memes from '../../../images/memes'
// import lessMemes from '../../../images/lessMemes'

const initialState = {
	pictures:null,
	isFetching:true,
	enabledFilters:[]
}
const initialPics = null; // = memes;    Refactor to use API
const changedPics = null; // = lessMemes   Refactor to use API


export default function picturesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PICTURES:
    	return {pictures: action.payload, isFetching:false};
    case FIND_PICTURES:
      return {pictures: changedPics, isFetching:false};
    default:
      return state;
  }
}
