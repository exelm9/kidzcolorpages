// contains all of the results components (smart)
import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ColorPagesActions from '../../redux/actions';
import CategoryItem from '../../components/DefaultResult/categoryItem';
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
    this.props.actions.showModal({ show: true, imgIdx, results: this.props.categoryList });
  }

  render() {
    const {
      isFetching,
      categoryList
    } = this.props;

    const categories = categoryList.map((category, idx) => {
      return <CategoryItem caption={category.category_title} key={idx} showModal={this.showModal} />
    });

    if (isFetching) {
      return <h2><i>Loading Pics</i></h2>
    }

    return (
      <div className="col-md-9 col-md-push-3">
        {/*<ResultsJumbotron images={this.props.pictures} />*/}
        {/*<ResultsList allPictures={allPictures.categories} categoryList={this.props.categoryList} showModal={this.showModal} />*/}
        {categories}
        {/*<ResultModal categoryList={this.props.categoryList} />*/}

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
    categoryList: pictures.categoryList,
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
