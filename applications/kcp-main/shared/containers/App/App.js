import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import Header from '../../components/header';

export default class App extends Component {
  render() {
    return (
      <div className="stage">
          <div className="application-wrap">
          <Header />
            {this.props.children}
          </div>
      </div>
    );
  }
}
