import React, {PropTypes, Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar'

export default class Sidepanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.filters,
      pictures: props.pictures
    };

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
      <div>
        <SearchBar onSearchChange={ this.pictureSearch }/>
      </div>
    );
  }
}
