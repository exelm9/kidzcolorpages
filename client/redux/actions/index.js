import * as types from '../constants/ActionTypes'

export function updatePictures(pics) {
  return { type: types.ADD_TODO, pics }
}