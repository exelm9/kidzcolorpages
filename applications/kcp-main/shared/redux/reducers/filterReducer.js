import * as types from '../constants/ActionTypes'

const initialState = {
	filters:[]
};

export default function filtersReducer(filters = initialState, action) {
  switch (action.type) {
    case types.SET_FILTERS :
      return action.filters;
    case types.FETCH_PICTURES:
      return {filters: action.payload.filters};
    default:
      return filters;
  }
}
