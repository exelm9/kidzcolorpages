// action
export const SET_FILTER = 'SET_FILTER';

const initialState = {
  filters: ['ninjas, animals, furrys']
};

export default function picturesReducer(filters = initialState, action) {
  switch (action.type) {
    case "SET_FILTER":
      return filters.push(action.payload);
    default:
      return filters;
  }
}