// contains all of the results components (smart)
import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ColorPagesActions from '../../redux/actions';
import ResultsList from '../../components/DefaultResult/resultsList';
// import ResultsJumbotron from '../../components/FeaturedResult/resultsJumbotron';
import Footer from '../../components/footer';
import ResultModal from '../'

export default class ResultsContainer extends Component {
  constructor (props) {
    super(props);
  };
  
  render () {
    return (
      <div className="col-md-9 col-md-push-3">
        {/*<ResultsJumbotron images={this.props.pictures} />*/}
        <ResultsList images={this.props.pictures}/>
        <Footer />
        {/*<ResultModal />*/}
      </div>
    );
  };
};

const mapStateToProps = ({pictures}) => ({pictures});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ColorPagesActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer);

