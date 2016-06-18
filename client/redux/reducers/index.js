import {combineReducers} from 'redux';
import pictures from './picturesReducer';
//import filters from './filterReducer';
console.log(pictures)
const rootReducer = combineReducers({
  pictures,
});

export default rootReducer;