import {combineReducers} from 'redux';
import pictures from './picturesReducer';
import filters from './filterReducer';

const rootReducer = combineReducers({
  pictures,
  filters
});

export default rootReducer;