import * as actions from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import request from 'axios';
import _ from 'lodash';

export const searchPictures = (term) => {
	return { type: actions.FIND_PICTURES, term: term };
};

export const onSearchBlur = (term) => ({ type: actions.SET_SEARCH, term: term  });

export const fetchPictures = () => (dispatch) =>
		request.get('/api').then((response) => {
      var data = JSON.parse(response.data);
      console.log(data,'here we are')
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

export const hideModal = (show) => {
  return { type: actions.HIDE_MODAL, show };
};
