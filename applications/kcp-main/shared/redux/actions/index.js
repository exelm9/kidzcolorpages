import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import request from 'axios';
import _ from 'lodash';


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
			var data = JSON.parse(response.data);
			dispatch({ type: types.FETCH_PICTURES, payload: data })
		})
	}
}

export function filterPictures(filter) {
  return { type: types.SET_FILTERS, filters: filter  }
}