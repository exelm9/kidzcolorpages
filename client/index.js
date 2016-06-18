// entry point for react app

//full ES2015 environment for application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
// will need api client
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import App from './containers/App/App';
import Sidepanel from './containers/Sidepanel/Sidepanel'


ReactDOM.render(
  <div>
	  <App/>
	  <Sidepanel filters={fBlurb} pictures={picBlurb}/>
  </div>
  , document.querySelector('.container')
);



var fBlurb = [
'Animals',
'People',
'Precolored'
]

var picBlurb = [
{url:"http//:lol.com",
id:'flockwocka'},
{url:"http//:lols.com",
id:'flockwockaz'}
]
