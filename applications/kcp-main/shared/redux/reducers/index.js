import {combineReducers} from 'redux';
import pictures from './picturesReducer';
import filters from './filterReducer';
import search from './searchReducer';
import modal from './modalReducer';
import { routerReducer as routing } from 'react-router-redux'

const rootReducer = combineReducers({
  pictures,
  filters,
  search,
  modal,
  routing
});

export default rootReducer;