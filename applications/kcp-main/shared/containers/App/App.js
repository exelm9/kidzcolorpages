import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';


export default class App extends Component {
  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
}