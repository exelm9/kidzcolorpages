import types from '../constants/ActionTypes';

export function updatePictures(pics) {
  return { type: types.UPDATE_PICTURES, pics }
}

export function setFilter(text) {
  return { type: types.SET_FILTER, text }
}
