import * as types from '../constants/ActionTypes'
import filterList  from '../constants/FilterList'

const initialState = {
  filters: filterList
};

export default function filtersReducer(filters = initialState, action) {
  switch (action.type) {
    case types.SET_FILTERS :
      return filters;
    default:
      return filters;
  }
}
