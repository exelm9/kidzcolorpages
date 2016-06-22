import React, {PropTypes, Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar'

export default class Sidepanel extends Component {
  constructor(props) {
    super(props);

    

  }
  componentDidMount(){
    console.log('lol')
    //console.log(this)
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
      <div className="sidepanel">
        <h5>Sidepanel</h5>
        <SearchBar onSearchChange={ this.pictureSearch }/>
      </div>
    );
  }
}
