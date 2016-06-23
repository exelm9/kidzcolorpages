import * as types from '../constants/ActionTypes'
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
    case types.FETCH_PICTURES:
    	return {pictures: initialPics, isFetching:false};
    case types.FIND_PICTURES:
      return {pictures: changedPics, isFetching:false};
    default:
      return state;
  }
}
