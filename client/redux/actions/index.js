import * as types from '../constants/ActionTypes';

export function findPictures(pics) {
  return { type: types.FIND_PICTURES, pics }
}

export function setFilter(text) {
  return { type: types.SET_FILTERS, text }
}
