import React from 'react'
import { Route, IndexRoute } from 'react-router';
import App from './containers/App/App';
import Home from './containers/Home/Home';
import adminPlaceholder from './components/TestMiddlePanel/testRoute';
import Profile from './components/Profile/profile';
import Registration from './components/Profile/registration';
import Login from './components/Profile/login';
import PasswordReset from './components/Profile/passwordReset';


export default (
  <Route path="/" component={App}>
  	<IndexRoute component={Home}/>
    <Route path="/admin" component={adminPlaceholder} />
    <Route path="/profile" component={Profile} />
    <Route path="/registration" component={Registration} />
    <Route path="/login" component={Login} />
    <Route path="/passwordreset" component={PasswordReset} />
  </Route>
)
