import { FIND_PICTURES, FETCH_PICTURES, SET_FILTERS, SHOW_PICTURES, SHOW_MODAL } from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import request from 'axios';
import _ from 'lodash';


export const searchPictures = (term) => 
	(dispatch) =>
		request.post('/api/search',{searchQuery:term}).then((response) =>
			dispatch({ type: FIND_PICTURES, payload: response.data })
		);

export const fetchPictures = () => 
	(dispatch) =>
		request.get('/api').then((response) => {
			var data = JSON.parse(response.data);
			dispatch({ type: FETCH_PICTURES, payload: data})
		});

export const filterPictures = (filter) => (
	{ type: SET_FILTERS, filters: filter }
);

export const showPictures = (pictures, count) => {
  var visiblePictures = pictures.slice(0, count + 12);
  visiblePictures = visiblePictures.map((picture, idx) => ({...picture, idx}));
  return { type: SHOW_PICTURES, visiblePictures }
};


export const showModal = (modalState) => (
  { type: SHOW_MODAL, ...modalState }
);

export const hideModal = (show) => (
  { type: HIDE_MODAL, show }
)