import { FETCH_PICTURES } from '../constants/ActionTypes';

const initialState = {
	filters:[]
};

export default const filtersReducer = (filters = initialState, action) => {
  switch (action.type) {
    case FETCH_PICTURES:
      return {filters: action.payload.filters};
    default:
      return filters;
  }
};
