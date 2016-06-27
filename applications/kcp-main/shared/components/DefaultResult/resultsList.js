// contains individual result components (dumb)
import React from 'react';
import ResultsListItem from './resultsListItem';
import ReactInfinite from 'react-infinite';

const ResultsList = (props) => {
	console.log(props)
    const categoryList = props.categoryList.map((image, idx) => {
        return <ResultsListItem image={"/media/alias/" + image.uuid} caption={image.title} showModal={props.showModal} key={idx} />
        });

    return (

            <ReactInfinite  elementHeight={200} preloadBatchSize={ReactInfinite.containerHeightScaleFactor(0.5)} useWindowAsScrollContainer={true}>
                {categoryList}
                </ReactInfinite>
        );



}

export default ResultsList;
