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
    this.setState({activeFilterBtn:filter,clearSearch:true })
    this.props.actions.filterPictures(filter);
  }

  setSearchOnBlur(term){
    this.props.actions.onSearchBlur(term.toLowerCase());
  }

  componentDidMount(){

  }

  render() {
    const pictureSearch = _.debounce((term) => { this.pictureSearch(term) }, 300);
    const filters = _.map(this.props.filters.filters, function(value,key){
      return key;
    });
    const activeFilter = this.state.activeFilterBtn;
    return (
      <div className="sidepanel col-md-3 col-md-pull-9">

        <SearchBar onSearchChange={ pictureSearch } onSearchBlur={ this.setSearchOnBlur } clearSearch={ this.state.clearSearch }/>
        <div className="filtersWrap">
          {filters.map((filter, idx) =>{
            return(
            <FilterButton
              onClick={() => this.filterPictures(filter)}
              filterType={ filter }
              key={ idx }
              activeFilter={ activeFilter }
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

