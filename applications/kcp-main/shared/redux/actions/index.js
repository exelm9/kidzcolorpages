import { FIND_PICTURES, FETCH_PICTURES, SET_FILTERS, SHOW_MODAL } from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import request from 'axios';


export function searchPictures(term) {
	return function(dispatch) {
		request.post('/api/search',{searchQuery:term}).then(function(response){
			dispatch({ type: FIND_PICTURES, payload: response.data })
		})
	}
}

export function fetchPictures() {
	return function(dispatch) {
		request.get('/api').then(function(response){
			var data = JSON.parse(response.data);
			dispatch({ type: FETCH_PICTURES, payload: data })
		})
	}
}

export function setFilter(text) {
  return { type: SET_FILTERS, text }
}

export function showModal(modalState) => {({type: SHOW_MODAL, modalState});