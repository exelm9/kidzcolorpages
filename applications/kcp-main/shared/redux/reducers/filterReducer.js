import { SET_FILTERS } from '../constants/ActionTypes'
import filterList  from '../constants/FilterList'

const initialState = {
  filters: filterList
};

export default function filtersReducer(filters = initialState, action) {
  switch (action.type) {
    case SET_FILTERS :
      return filters;
    default:
      return filters;
  }
}
