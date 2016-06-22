import * as types from '../constants/ActionTypes'
import memes from '../../../images/memes'
import lessMemes from '../../../images/lessMemes'

const initialState = memes;
const changedState = lessMemes

export default function picturesReducer(state = {pictures:null, isFetching:true}, action) {
  switch (action.type) {
    case types.FETCH_PICTURES:
    	return {pictures: initialState, isFetching:false};
    case types.FIND_PICTURES:
      return {pictures: changedState, isFetching:false};
    default:
      return state;
  }
}
