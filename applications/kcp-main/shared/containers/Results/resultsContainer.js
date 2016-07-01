// contains all of the results components (smart)
import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ColorPagesActions from '../../redux/actions';
import CollectionItem from '../../components/CollectionItem/CollectionItem'
import CategoryItem from '../../components/CategoryItem/CategoryItem';

import _ from 'lodash';
import ResultModal from '../ResultModal/ResultModal';

export default class ResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.showCollectionModal =  this.showCollectionModal.bind(this);
  }

  showCollectionModal({collections, colIdx, imgIdx}) {
    //console.log(collections, colIdx,'modal click')
    let aliases = this.props.allPictures.collections[collections[colIdx].uuid].aliases;
    this.props.actions.showModal({collectionData: this.props.allPictures.collections, collections, colIdx , imgIdx, aliases});
    window.apply_styles();
  }

  showSearchModal({imgIdx, uuid}) {
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
              showModal={this.showCollectionModal}
            />);
    });

    // if the search yields no results, then don't render picture list
    let pictures = [];
    if(pictureList.length > 0){
      for(let i = 0; i < pictureList.length; i++){
        let pictureCategory = pictureList[i].collection_mPath
        pictureCategory = pictureCategory.substring(0, pictureCategory.lastIndexOf('/'));
        pictures.push(buildPictureList(pictureList[i], this.props.allPictures.categories[pictureCategory], this.showCollectionModal))
      }
    }

    // console.log(categoryList, pictureList,'prior to pictures being built out')
    if(categories.length === 0){
      categories = <h2><i>No Pics Found</i></h2>
    }

    return (
      <div className="main-container col-md-10 col-md-push-2">
        {pictures}
        {categories}
        <ResultModal />
      </div>
    );
  }
};

// port to a component in future. Time crunches cause glitches in The Matrix
const buildPictureList = (pictureList, categoryList,showCollectionModal) => {
  // setting index so modal knows which collection to grab when picture clicked
  let collectionPosition = null;
  let counter = 0;
  let mappedCollections = _.map(categoryList.collections, (collection, key) => {
    if(collectionPosition === null){
      if(key === pictureList.collection_title){
        collectionPosition = counter;
      }else{
        counter++;
      }
    }
    return collection;
  });

  let attachCollections = (colIdx, imgIdx) => {
    showCollectionModal({collections: mappedCollections, colIdx, imgIdx})
  };

  let pictures = pictureList.aliases !== undefined ? pictureList.aliases : [];
  pictures = pictures.map((picture, idx) => {
    return <CollectionItem
            image={"/media/alias/" + picture}
            colIdx={collectionPosition}
            imgIdx={idx}
            uuid={pictureList.collection_uuid}
            key={pictureList.collection_uuid + idx}
            caption=""
            count=""
            attachCollections={attachCollections}
            showModal={showCollectionModal}
            _class="pictureWrap"
           />
  });

  if(pictures.length > 0){
    pictures = <div key={pictureList.collection_uuid} className="categoryItem">
                <div className="">
                  <div className="caption">
                    <h4>{pictureList.collection_title}</h4>
                  </div>
                  <div>
                    {pictures}
                  </div>
                </div>
              </div>
  }else{
    pictures = null
  }

  return pictures;
}


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
