import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sidepanel from '../../components/Sidepanel/Sidepanel';
//import TestMiddlePanel from '../../components/TestMiddlePanel/TestMiddlePanel';
import * as ColorPagesActions from '../../redux/actions';

import ResultsContainer from '../Results/resultsContainer';

export default class App extends Component {
  componentDidMount(){
  	console.log(this.props, this)
  }
  render() {
    return (
      <div>
        <ResultsContainer />
        <Sidepanel filters={this.props.filters} actions={this.props.actions} />
        {/*<TestMiddlePanel pictures={this.props.pictures} actions={this.props.actions} />*/}

      </div>
    );
  }
}

App.propTypes = {
  pictures: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    pictures: state.pictures,
    filters: state.filters
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ColorPagesActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

