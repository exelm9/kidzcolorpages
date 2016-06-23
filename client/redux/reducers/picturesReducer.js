import { FIND_PICTURES } from '../constants/ActionTypes'
import memes from '../../../images/memes'
import lessMemes from '../../../images/lessMemes'

const initialState = memes;
const changedState = lessMemes;

export default function picturesReducer(pictures = initialState, action) {
  switch (action.type) {
    case FIND_PICTURES:
      return changedState;
    default:
      return pictures;
  }
}
