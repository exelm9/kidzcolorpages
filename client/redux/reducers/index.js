import {combineReducers} from 'redux';
import pictures from './picturesReducer';
import filters from './filterReducer';
import { routerReducer as routing } from 'react-router-redux'

const rootReducer = combineReducers({
  pictures,
  filters,
  routing
});

export default rootReducer;