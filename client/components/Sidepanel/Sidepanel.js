import React, {PropTypes, Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar'

export default class Sidepanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.filters,
      pictures: props.pictures
    };

    console.log(props.actions.searchPictures('flocka'), 'sidepanel')

  }

  pictureSearch(term){
    console.log(term)
    // axios call to server possibly
      // this.setState({ 
      //   pictures:data.pictures,
      // });
  }


  render() {
    return (
      <div className="sidepanel col-md-3 col-md-pull-9">
        <h5>Sidepanel</h5>
        <SearchBar onSearchChange={ this.pictureSearch }/>
        
      </div>
    );
  }
}
