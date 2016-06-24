import { FETCH_PICTURES } from '../constants/ActionTypes';

const initialState = {
	filters:[]
};

const filtersReducer = (filters = initialState, action) => {
  switch (action.type) {
    case FETCH_PICTURES:
      return {filters: action.payload.filters};
    default:
      return filters;
  }
};

export default filtersReducer;