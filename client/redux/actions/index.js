import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';

import request from 'axios';
// pull variable out to a config file
const API_URL = 'http://localhost:1337/test';

export function searchPictures(pics) {
	
	return function(dispatch) {
		request.post(API_URL,{firstName:'Ninja', lastName:'Doge'}).then(function(response){
			dispatch({ type: types.FIND_PICTURES, payload: response.data })
		})
	}
}

export function setFilter(text) {
  return { type: types.SET_FILTERS, text }
}
