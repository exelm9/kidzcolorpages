// contains individual result components (dumb)
import React from 'react';
import ResultsListItem from './resultsListItem';
import ReactInfinite from 'react-infinite';

const ResultsList = (props) => {
    //creates array of list items
<<<<<<< HEAD
    let pages = 1;
    let results = props.images.slice(0,12);

    const handleClick = function (picture) {

    }

        //changing to populate all images




    let resultImages = results.complete.map((image) => {
        return <ResultsListItem image={"/media/alias/" +image.uuid} caption={image.title} key={image.uuid}/>
    });

    return (

        <Infinite  elementHeight={200} preloadBatchSize={1} useWindowAsScrollContainer="true">
            {resultImages}
            </Infinite>
    );
}

export default ResultsList;
