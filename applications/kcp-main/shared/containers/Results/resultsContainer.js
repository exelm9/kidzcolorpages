// contains all of the results components (smart)
import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ColorPagesActions from '../../redux/actions';
import ResultsList from '../../components/DefaultResult/resultsList';
// import ResultsJumbotron from '../../components/FeaturedResult/resultsJumbotron';
import Footer from '../../components/footer';
import ResultModal from '../ResultModal/ResultModal';

export default class ResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.showModal =  this.showModal.bind(this);
  }

  componentWillMount(){

  }
  
  showModal(modalState) {
    this.props.actions.showModal(modalState);
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
        <ResultsList images={this.props.pictures} showModal={this.showModal} />
        <Footer />
        <ResultModal />
      </div>

    );
  }
};

ResultsContainer.defaultProps = {
  isFetching: true
}

const mapStateToProps = ({pictures, visibleResults}) => {
  var pics = [];
  if(pictures.pictures){
    var allNestedPictures = pictures.pictures.categories;
    for(var key in allNestedPictures){
      var categoryPictures = allNestedPictures[key];
      for(var i = 0; i < categoryPictures.length; i++){
        var individualPicture = categoryPictures[i]
        pics.push(individualPicture);
      }
    }
  }

  return {
    pictures: pics,
    isFetching: pictures.isFetching,
    enabledFilters: pictures.enabledFilters,
    visibleResults,
    
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ColorPagesActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer)

