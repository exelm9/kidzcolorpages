import { SHOW_MODAL } from '../constants/ActionTypes'

export default function modalReducer(pictures, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return changedState;
    default:
      return null;
  }
}
