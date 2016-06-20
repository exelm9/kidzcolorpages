// contains all of the results components (smart)
import React, { Component } from 'react';
import ResultsList from '../../components/DefaultResult/resultsList';
import ResultsJumbotron from '../../components/FeaturedResult/resultsJumbotron';
import Footer from '../../components/footer';

//test data
import memes from '../../../images/memes';



class ResultsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { images: memes };

  }
  render() {

    return (
      <div className="col-md-9 col-md-push-3">
        <ResultsJumbotron images={this.state.images} />
        <ResultsList images={this.state.images} />
        <Footer />
      </div>

    );
  }
};

export default ResultsContainer;
