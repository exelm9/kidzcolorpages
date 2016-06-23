import { FETCH_PICTURES, FIND_PICTURES } from '../constants/ActionTypes'
import memes from '../../../images/memes'
import lessMemes from '../../../images/lessMemes'

const initialState = {
	pictures:null,
	isFetching:true,
	enabledFilters:[]
}
const initialPics = memes;
const changedPics = lessMemes


export default function picturesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PICTURES:
    	return {pictures: initialState, isFetching:false};
    case FIND_PICTURES:
      return {pictures: changedState, isFetching:false};
    default:
      return state;
  }
}
