// contains individual result components (dumb)
import React from 'react';
import ResultsListItem from './resultsListItem';
import ReactInfinite from 'react-infinite';

const ResultsList = (props) => {
    //creates array of list items
    let results = {};
    results.complete = props.images;
    console.log("full results: ", results.complete);
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
