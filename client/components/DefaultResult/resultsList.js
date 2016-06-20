// contains individual result components (dumb)
import React from 'react';
import ResultsListItem from './resultsListItem';

const ResultsList = (props) => {

    //creates array of list items
    const resultMemes = props.images.result.map((image) => {
        return <ResultsListItem image={image.imageUrl} caption={image.displayName} key={image.generatorID}/>
    });

    return (
            <div className="row">{resultMemes}</div>
    );
}

export default ResultsList;
