// contains all of the results components (smart)
import React, { Component } from 'react';
import ResultsList from '../../components/DefaultResult/resultsList';
// import ResultsJumbotron from '../../components/FeaturedResult/resultsJumbotron';
import Footer from '../../components/footer';

//test data
// import memes from '../../../images/memes';


class ResultsContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className="col-md-9 col-md-push-3">
        {/*<ResultsJumbotron images={this.props.pictures} />*/}
        <ResultsList images={this.props.pictures} />
        <Footer />
      </div>

    );
  }
};

export default ResultsContainer;
