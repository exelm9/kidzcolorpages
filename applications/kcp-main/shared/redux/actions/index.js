import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import request from 'axios';


export function searchPictures(term) {
	return function(dispatch) {
		request.post('/api/search',{searchQuery:term}).then(function(response){
			dispatch({ type: types.FIND_PICTURES, payload: response.data })
		})
	}
}

export function fetchPictures() {
	return function(dispatch) {
		request.get('/api').then(function(response){
			dispatch({ type: types.FETCH_PICTURES, payload: response.data })
		})
	}
}

export function setFilter(text) {
  return { type: types.SET_FILTERS, text }
}
