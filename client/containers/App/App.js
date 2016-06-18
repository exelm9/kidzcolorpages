import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sidepanel from '../../components/Sidepanel/Sidepanel';
import * as ColorPagesActions from '../../redux/actions';

export default class App extends Component {
  render() {
    return (
      <div>
        <Sidepanel/>
      </div>
    );
  }
}

function mapStateToProps(state) {
	console.log(state,'ninjas')
  return {
    todos: state.todos
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


// <Sidepanel />
// var fBlurb = [
// 'Animals',
// 'People',
// 'Precolored'
// ]

// var picBlurb = [
// {url:"http//:lol.com",
// id:'flockwocka'},
// {url:"http//:lols.com",
// id:'flockwockaz'}
// ]