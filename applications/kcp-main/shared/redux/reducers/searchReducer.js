import { CLEAR_SEARCH } from '../constants/ActionTypes';

const initialState = {
	clearSearch:false
};

const searchReducer = (search = initialState, action) => {
  switch (action.type) {
    case CLEAR_SEARCH:
      return {clearSearch: action.clear};
    default:
      return search;
  }
};

export default searchReducer;