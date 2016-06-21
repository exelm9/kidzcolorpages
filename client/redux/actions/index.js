import * as types from '../constants/ActionTypes';
import request from 'axios';

const API_URL = 'http://localhost:1337/test';

export function searchPictures(pics) {
	
	return function(dispatch) {
		// request.get(API_URL).then(function(response){
		// 	console.log(response)
		// })

		request.post(API_URL,{firstName:'Ninja', lastName:'Doge'}).then(function(response){
			dispatch({ type: types.FIND_PICTURES, payload: response.data })
		})
		//console.log(dispatch,'what')
	}
}

export function setFilter(text) {
  return { type: types.SET_FILTERS, text }
}
