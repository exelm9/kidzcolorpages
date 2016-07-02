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

    this.state = {
      activeFilterBtn:null,
      clearSearch:false
    };

    this.pictureSearch = this.pictureSearch.bind(this);
    this.filterPictures = this.filterPictures.bind(this);
    this.setSearchOnBlur = this.setSearchOnBlur.bind(this);
  }

  pictureSearch(term){
    this.setState({activeFilterBtn:null, clearSearch:false})
    this.props.actions.searchPictures(term.toLowerCase());
  }

  filterPictures(filter){
    this.setState({activeFilterBtn:filter.title,clearSearch:true })
    this.props.actions.filterPictures(filter.title);
  }

  setSearchOnBlur(term){
    this.props.actions.onSearchBlur(term.toLowerCase());
  }

  componentDidMount(){

  }

  render() {
    const pictureSearch = _.debounce((term) => { this.pictureSearch(term) }, 300);
    const filters = _.map(this.props.filters.filters, function(value,key){
      let filterObj = {};
      filterObj['picture'] = value.picture;
      filterObj['title'] = key;
      return filterObj;
    });
    const activeFilter = this.state.activeFilterBtn;
    return (
      <div className="sidepanel col-sx-4 col-sm-2 col-md-2">

        <SearchBar onSearchChange={ pictureSearch } onSearchBlur={ this.setSearchOnBlur } clearSearch={ this.state.clearSearch }/>
        <div className="filtersWrap">
          {filters.map((filter, idx) =>{
            return(
            <FilterButton
              onClick={() => this.filterPictures(filter)}
              filterType={ filter.title }
              key={ idx }
              activeFilter={ activeFilter }
              image={"/media/alias/" + filter.picture}
            />);
           }
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
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

