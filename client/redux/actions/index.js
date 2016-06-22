import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import request from 'axios';


export function searchPictures(pics) {
	return function(dispatch) {
		request.post('/home',{firstName:'Ninja', lastName:'Doge'}).then(function(response){
			dispatch({ type: types.FIND_PICTURES, payload: response.data })
		})
	}
}

export function fetchPictures() {
	console.log(browserHistory,'huh')
	return function(dispatch) {
		request.get('/home').then(function(response){
			dispatch({ type: types.FETCH_PICTURES, payload: response.data })
		})
	}
}

export function setFilter(text) {
  return { type: types.SET_FILTERS, text }
}
