// contains individual result components (dumb)
import React from 'react';
import ResultsListItem from './resultsListItem';

const ResultsList = (props) => {
    const visiblePictures = props.visiblePictures.map((image, idx) => {
        return <ResultsListItem image={"/media/alias/" + image.uuid} caption={image.title} showModal={props.showModal} key={idx} />
    });

    return (
        <div className="row">{visiblePictures}</div>
    );
}

export default ResultsList;
