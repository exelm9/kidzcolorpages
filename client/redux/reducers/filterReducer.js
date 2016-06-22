import * as types from '../constants/ActionTypes'

const initialState = {
  filters: []
};

export default function filtersReducer(filters = initialState, action) {
  switch (action.type) {
  	case types.FETCH_PICTURES:
  		return {filters: action.payload.filters, isFetching:false};
    case types.SET_FILTERS :
      return filters;
    default:
      return filters;
  }
}
