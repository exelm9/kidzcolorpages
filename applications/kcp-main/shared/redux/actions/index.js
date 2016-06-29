import * as actions from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import request from 'axios';
import _ from 'lodash';

export const searchPictures = (term) => {
	return { type: actions.FIND_PICTURES, term: term };
};

export const onSearchBlur = (term) => ({ type: actions.SET_SEARCH, term: term  });

export const clearSearch = (term) => ({ type: actions.CLEAR_SEARCH, clear: true  });

export const fetchPictures = () => (dispatch) =>
		request.get('/api').then((response) => {
      var data = JSON.parse(response.data);
      console.log(data,'all data')
      dispatch({type: actions.FETCH_PICTURES, payload: data})
    });

export const filterPictures = (filter) => {
	return { type: actions.SET_FILTERS, filter: filter }
};

export const showPictures = (pictures, count) => {
  var categoryList = pictures.slice(0, count + 12);
  categoryList = categoryList.map((picture, idx) => ({...picture, idx}));
  return { type: actions.SHOW_PICTURES, categoryList };
};

export const showModal = (modalState) => {
  return { type: actions.SHOW_MODAL, ...modalState };
};

export const changeImage = (imgIdx) => {
  return { type: actions.CHANGE_IMAGE, imgIdx };
};

export const hideModal = (show) => {
  return { type: actions.HIDE_MODAL, show };
};
