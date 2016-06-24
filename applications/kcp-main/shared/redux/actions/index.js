import { FIND_PICTURES, FETCH_PICTURES, SET_FILTERS, SHOW_PICTURES, SHOW_MODAL } from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import request from 'axios';


export const searchPictures = (term) => 
	(dispatch) =>
		request.post('/api/search',{searchQuery:term}).then((response) =>
			dispatch({ type: FIND_PICTURES, payload: response.data })
		);

export const fetchPictures = () => 
	(dispatch) =>
		request.get('/api').then((response) => {
			var data = JSON.parse(response.data);
			dispatch({ type: FETCH_PICTURES, payload: data })
		});

export const showPictures = (pictures, count) =>
  (dispatch) =>
    dispatch({ type: SHOW_PICTURES, payload: pictures.slice(0, count + 12) })

export const setFilter = (text) => 
  (dispatch) => 
    dispatch({ type: SET_FILTERS, text });

export const showModal = (modalState) => 
  (dispatch) => 
    dispatch({ type: SHOW_MODAL, modalState });