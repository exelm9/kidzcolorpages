// entry point for react app

//full ES2015 environment for application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux/reducers'
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import App from './containers/App/App';


const history = browserHistory;
const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
	  <div>
		  <App/>
	  </div>
  </Provider>
  , document.querySelector('.container')
);