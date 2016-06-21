import * as types from '../constants/ActionTypes';

export function searchPictures(pics) {
	return function(dispatch) {
		//console.log(dispatch,'what')
	}
  //return { type: types.FIND_PICTURES, pics }
}

export function setFilter(text) {
  return { type: types.SET_FILTERS, text }
}
