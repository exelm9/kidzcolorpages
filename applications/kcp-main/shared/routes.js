import React from 'react'
import { Route, IndexRoute } from 'react-router';
import App from './containers/App/App';
import Home from './containers/Home/Home';
import adminPlaceholder from './components/TestMiddlePanel/testRoute';


export default (
  <Route path="/browse" component={App}>
  	<IndexRoute component={Home}/>
    <Route path="/admin" component={adminPlaceholder} />
  </Route>
)

