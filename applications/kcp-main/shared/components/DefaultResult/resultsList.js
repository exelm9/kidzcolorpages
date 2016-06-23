// contains individual result components (dumb)
import React from 'react';
import ResultsListItem from './resultsListItem';

const ResultsList = (props) => {
    //creates array of list items
    let results = {};
    results.complete = props.images.result;
    results.pages = 1;
    results[1] = [];
    results.complete.forEach(function(result){
        if (results[results.pages].length <= 12){
            results[results.pages].push(result);
        } else {
            results.pages++;
            results[results.pages] = [];
            results[results.pages].push(result);
        }

        });


    const resultImages = results[1].map((image) => {
        return <ResultsListItem image={image.imageUrl} caption={image.displayName} key={image.generatorID}/>
    });

    return (
            <div className="row">{resultImages}</div>
    );
}

export default ResultsList;
