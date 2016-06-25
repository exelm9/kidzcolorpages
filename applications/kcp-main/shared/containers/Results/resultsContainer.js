// contains all of the results components (smart)
import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ColorPagesActions from '../../redux/actions';
import ResultsList from '../../components/DefaultResult/resultsList';
// import ResultsJumbotron from '../../components/FeaturedResult/resultsJumbotron';

import _ from 'lodash';
import ResultModal from '../ResultModal/ResultModal';

export default class ResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.showModal =  this.showModal.bind(this);
  }

  componentWillMount(){

  }

  showModal(imgIdx) {
    this.props.actions.showModal({ show: true, imgIdx, results: this.props.visiblePictures });
  }

  render() {
    const {
      isFetching
    } = this.props;

    if (isFetching) {
      return <h2><i>Loading Pics</i></h2>
    }

    return (
      <div className="col-md-9 col-md-push-3">
        {/*<ResultsJumbotron images={this.props.pictures} />*/}
        <ResultsList visiblePictures={this.props.visiblePictures} showModal={this.showModal} />
        <ResultModal visiblePictures={this.props.visiblePictures} />
      </div>
    );
  }
};

ResultsContainer.defaultProps = {
  isFetching: true
};

// redux
const mapStateToProps = ({pictures}) => {
  return {
    allPictures: pictures.allPictures,
    pictures: pictures.filteredPictures,
    visiblePictures: pictures.visiblePictures,
    isFetching: pictures.isFetching,
    enabledFilter:pictures.enabledFilter,
    searchFor: pictures.searchFor
  }
};

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(ColorPagesActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer);
