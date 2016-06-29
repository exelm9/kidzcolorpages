// contains all of the results components (smart)
import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ColorPagesActions from '../../redux/actions';
import CollectionItem from '../../components/CollectionItem/CollectionItem'
import CategoryItem from '../../components/CategoryItem/CategoryItem';
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

  showModal({imgIdx, uuid}) {
    console.log(`imgIdx ${imgIdx}`);
    console.log(`uuid ${uuid}`);
    this.props.actions.showModal({ uuid, colIdx: imgIdx, aliases: this.props.allPictures.collections[uuid].aliases });
  }

  render() {
    const {
      isFetching,
      categoryList,
      pictureList
    } = this.props;

    if (isFetching) {
      return(
        <div className='row show-grid'>
           <div className='col-md-6 col-md-offset-3'>
             <div className='spinnerWrap'>
               <div className=''>Pictures Coming Soon!!!</div>
               <i className='fa fa-spinner fa-spin fa-5x fa-fw margin-bottom' aria-hidden='true'></i>
             </div>
           </div>
        </div>
      )
    }

    
    let categories = categoryList.map((category, idx) => {
      return (<CategoryItem
              collections={category.collections}
              caption={category.category_title}
              key={idx}
              showModal={this.showModal} 
            />)
    });

    let pictures = pictureList.aliases !== undefined ? pictureList.aliases : [];
    pictures = pictures.map((picture, idx) => {
      console.log(pictureList,'each')
      return <CollectionItem
              image={"/media/alias/" + picture}
              imgIdx={idx}
              uuid={pictureList.collection_uuid}
              key={pictureList.collection_uuid + idx}
              caption=""
              showModal={this.showModal}
             />
    });

    if(categories.length === 0){
      categories = <h2><i>No Pics Found</i></h2>
    }
    console.log(pictures,'huh')
    //console.log(pictureList,'picture data',categoryList,'category')
    return (
      <div className="col-md-9 col-md-push-3">
        {/*<ResultsJumbotron images={this.props.pictures} />*/}
        {pictures}
        {categories}
        <ResultModal />

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
    pictureList: pictures.pictureList,
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
