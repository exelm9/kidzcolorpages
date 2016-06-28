import { HIDE_MODAL, SHOW_MODAL } from '../constants/ActionTypes'

const initialState = {
  show: false,
  aliases: [],
  imgIdx: 0,
  colIdx: 0
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, show: true, aliases: action.aliases, colIdx: action.colIdx };
    case HIDE_MODAL:
      return { ...state, show: false };
    default:
      return state;
  }
}
