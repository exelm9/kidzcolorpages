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

  componentWillMount(){

  }

  showCollectionModal({collections, colIdx}) {
    let aliases = this.props.allPictures.collections[collections[colIdx].uuid].aliases;
    this.props.actions.showModal({collectionData: this.props.allPictures.collections, collections, colIdx , aliases});
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

    let pictures = pictureList.aliases !== undefined ? pictureList.aliases : [];
    pictures = pictures.map((picture, idx) => {
      return <CollectionItem
              image={"/media/alias/" + picture}
              imgIdx={idx}
              uuid={pictureList.collection_uuid}
              key={pictureList.collection_uuid + idx}
              caption=""
              count=""
              showModal={this.showModal}
             />
    });

    if(pictures.length > 0){
      pictures = <div className="categoryItem">
                  <div className="thumbnail">
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

    if(categories.length === 0){
      categories = <h2><i>No Pics Found</i></h2>
    }

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
