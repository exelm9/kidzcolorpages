import { FIND_PICTURES, FETCH_PICTURES, SET_FILTERS, SHOW_PICTURES, SHOW_MODAL, SET_SEARCH } from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import request from 'axios';
import _ from 'lodash';


export function searchPictures(term) {
	return { type: FIND_PICTURES, term: term };
}

export function onSearchBlur(term) {
  return { type: SET_SEARCH, term: term  };
}

export function fetchPictures(){
	return function(dispatch) {
		request.get('/api').then(function(response){
			var data = JSON.parse(response.data);
			dispatch({ type: FETCH_PICTURES, payload: data })
		})
	}
}

export function filterPictures(filter) {
	return { type: SET_FILTERS, filter: filter }
}

export function showPictures(pictures, count){
  var visiblePictures = pictures.slice(0, count + 12);
  visiblePictures = visiblePictures.map((picture, idx) => ({...picture, idx}));
  return { type: SHOW_PICTURES, visiblePictures };
};


export function showModal (modalState) {
  return { type: SHOW_MODAL, ...modalState }
}


export function hideModal(show){
  return { type: HIDE_MODAL, show }
}

