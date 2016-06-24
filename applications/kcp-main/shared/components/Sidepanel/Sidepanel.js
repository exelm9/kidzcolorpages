import React, {PropTypes, Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterButton from '../../components/FilterButton/FilterButton'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ColorPagesActions from '../../redux/actions';
import _ from 'lodash';

export default class Sidepanel extends Component {
  constructor(props) {
    super(props);

    this.pictureSearch = this.pictureSearch.bind(this);
    this.filterPictures = this.filterPictures.bind(this);
  }

  pictureSearch(term){
    this.props.actions.searchPictures(term);
  }

  filterPictures(filter){
    this.props.actions.filterPictures(filter);
  }

  componentDidMount(){

  }

  render() {
    const pictureSearch = _.debounce((term) => { this.pictureSearch(term) }, 300);
    const filters = this.props.filters.filters
    return (
      <div className="sidepanel col-md-3 col-md-pull-9">
        <h5>Sidepanel</h5>
        <SearchBar onSearchChange={ pictureSearch }/>
        <div className="filtersWrap">
          {filters.map(filter =>{
            return(
            <FilterButton
              onClick={() => this.filterPictures(filter)}
              filterType={ filter }
            />);
           }
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filters
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
)(Sidepanel)

