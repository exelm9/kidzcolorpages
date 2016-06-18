import { SET_FILTER } from '../constants/ActionTypes'

const initialState = {
  filters: ['ninjas, animals, furrys']
};

export default function picturesReducer(filters = initialState, action) {
  switch (action.type) {
    case SET_FILTER :
      return filters.push(action.payload);
    default:
      return filters;
  }
}