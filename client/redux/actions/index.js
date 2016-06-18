import * from '../constants/ActionTypes'

export function updatePictures(pics) {
  return { type: UPDATE_PICTURES, pics }
}

export function setFilter(text) {
  return { type: SET_FILTER, text }
}

