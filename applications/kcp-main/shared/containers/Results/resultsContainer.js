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

// helper functions
const removeCategory = (category, filter) => {
  let categories = category.split("/");
  for(let i = 0; i < categories.length; i++){
    if(categories[i] === filter)
      return false;
  }
  return true;
}

const searchCategory = (category, searchTerm) => {
  let categories = category.split("/");
  for(let i = 0; i < categories.length; i++){
    if( categories[i].indexOf(searchTerm) > -1 )
      return false;
  }
  return true;

}

// redux

const mapStateToProps = ({pictures}) => {
  // turn nested picture data into a flat array
  let flatPicsArr = [];
  let pics = pictures.pictures

  if(pics){
    let allNestedPictures = pics.categories;
    for(let key in allNestedPictures){
      // if filter is enabled, then only add filtered content to flatPicsArr
      if(pictures.enabledFilter){
        if(removeCategory(key, pictures.enabledFilter)) continue;
      }

      // if user is searching, then only add serched content to flatPicsArr
      if(pictures.searchFor){
        if(removeCategory(key, pictures.searchFor)) continue;
      }

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
    enabledFilter:pictures.enabledFilter,
    searchFor: pictures.searchFor
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ColorPagesActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer)

