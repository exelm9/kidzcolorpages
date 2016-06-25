// contains individual result components (dumb)
import React from 'react';
import ResultsListItem from './resultsListItem';
import ReactInfinite from 'react-infinite';

const ResultsList = (props) => {
    const visiblePictures = props.visiblePictures.map((image, idx) => {
        return <ResultsListItem image={"/media/alias/" + image.uuid} caption={image.title} showModal={props.showModal} key={idx} />
        });

    return (

            <Infinite  elementHeight={200} preloadBatchSize={Infinite.containerHeightScaleFactor(0.5)} useWindowAsScrollContainer={true}>
                {visiblePictures}
                </Infinite>
        );



}

export default ResultsList;
