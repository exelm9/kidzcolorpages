import { HIDE_MODAL, SHOW_MODAL, CHANGE_IMAGE, CHANGE_COLLECTION } from '../constants/ActionTypes'

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
    case CHANGE_IMAGE:
      return { ...state, imgIdx: action.imgIdx };
    case CHANGE_COLLECTION:
      return { ...state, imgIdx: 0, colIdx: action.colIdx};
    default:
      return state;
  }
}
