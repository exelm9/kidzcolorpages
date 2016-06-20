import { SET_FILTERS } from '../constants/ActionTypes'

const initialState = {
  filters: ['ninjas', 'animals', 'furrys']
};

export default function filtersReducer(filters = initialState, action) {
  switch (action.type) {
    case SET_FILTERS :
      return filters.push(action.payload);
    default:
      return filters;
  }
}