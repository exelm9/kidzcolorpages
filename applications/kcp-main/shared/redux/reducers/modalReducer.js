import { SHOW_MODAL } from '../constants/ActionTypes'

const initialState = {
  results: [],
  imgIdx: 0,
  direction: ''
};

export default function modalReducer(pictures, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return changedState;
    default:
      return initialState;
  }
}
