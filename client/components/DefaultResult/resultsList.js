// contains individual result components (dumb)
import React from 'react';
import ResultsListItem from './resultsListItem';

const ResultsList = (props) => {
    console.log("Inside resultsList", props);
    const resultMemes = props.images.result.map((meme) => {
        return <ResultsListItem image={meme.imageUrl} caption={meme.displayName} key={meme.generatorID}/>
    });
    return (
      <div className="row">
      {resultMemes}

      </div>
    );
};

export default ResultsList;
