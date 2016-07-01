// entry point of app

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import reducer from '../shared/redux/reducers';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from '../shared/routes.js';
import {fetchPictures} from '../shared/redux/actions';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer, window.devToolsExtension ? window.devToolsExtension() : f => f);
const history = syncHistoryWithStore(browserHistory, store);

// Initial request for populating pictures
store.dispatch(fetchPictures());

ReactDOM.render(
  <Provider store={store}>
      <Router history={history} routes={routes} />
  </Provider>, 
  document.querySelector('.container')
);
