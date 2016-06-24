// contains all of the results components (smart)
import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ColorPagesActions from '../../redux/actions';
import ResultsList from '../../components/DefaultResult/resultsList';
// import ResultsJumbotron from '../../components/FeaturedResult/resultsJumbotron';
import Footer from '../../components/footer';
import _ from 'lodash';

export default class ResultsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){

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
        <ResultsList images={this.props.pictures}/>
        <Footer />
      </div>

    );
  }
};

ResultsContainer.defaultProps = {
  isFetching: true
}

const mapStateToProps = ({pictures}) => {
  let flatPicsArr = [];
  let pics = filterPictures(pictures)

  if(pics){
    let allNestedPictures = pics.categories;
    for(let key in allNestedPictures){
      let categoryPictures = allNestedPictures[key];
      for(let i = 0; i < categoryPictures.length; i++){
        let individualPicture = categoryPictures[i]
        flatPicsArr.push(individualPicture);
      }
    }
  }

  return {
    pictures: flatPicsArr,
    isFetching: pictures.isFetching,
    enabledFilters:pictures.enabledFilters
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ColorPagesActions, dispatch)
  }
}

// helper functions
const filterPictures = (filters) => {
  console.log(filters)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer)

