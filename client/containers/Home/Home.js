import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import Sidepanel from '../../components/Sidepanel/Sidepanel';
import ResultsContainer from '../Results/resultsContainer';
import * as ColorPagesActions from '../../redux/actions';
import { connect } from 'react-redux';

export default class Home extends Component {
  render() {
    return (
      <div>
        <ResultsContainer pictures={this.props.pictures} />
        <Sidepanel />
      </div>
    );
  }
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
)(Home)