// contains individual result components (dumb)
import React from 'react';
import ResultsListItem from './resultsListItem';

const ResultsList = (props) => {
    //creates array of list items
    let pages = 1;
    let results = props.images.slice(0,12);

    const handleClick = function (picture) {

    }


    const resultImages = results[1].map((image) => {
        return <ResultsListItem image={"/media/alias/" +image.uuid} caption={image.title} key={image.generatorID}/>
    });

    return (
        <div className="row">{resultImages}</div>
    );
}

export default ResultsList;
