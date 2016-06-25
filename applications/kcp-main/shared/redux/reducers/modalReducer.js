import { HIDE_MODAL, SHOW_MODAL } from '../constants/ActionTypes'

const initialState = {
  show: false,
  results: [],
  imgIdx: 0,
  direction: ''
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, show: action.show, results: action.results, imgIdx: action.imgIdx };
    case HIDE_MODAL:
      return { ...state, show: action.show };
    default:
      return state;
  }
}
