import React from 'react'
import { Route } from 'react-router'
import App from './containers/App/App'
import adminPlacholder from './components/SearchBar/SearchBar'

export default (
  <Route path="/" component={App}>
    <Route path="/admin-panel" component={adminPlacholder} />
  </Route>
)
