import {combineReducers} from 'redux';
import pictures from './picturesReducer';
import filters from './filterReducer';
import modal from './modalReducer';
import { routerReducer as routing } from 'react-router-redux'

const rootReducer = combineReducers({
  pictures,
  filters,
  // modal,
  routing
});

export default rootReducer;