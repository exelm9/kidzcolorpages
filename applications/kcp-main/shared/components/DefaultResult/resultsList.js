// contains individual result components (dumb)
import React from 'react';
import ResultsListItem from './resultsListItem';
import ReactInfinite from 'react-infinite';

export default class ResultsList extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }


    //creates array of list items

    let pages = 1;
    // let results = props.images.slice(0,12);
    let results = props.images;

    const handleClick = function (picture) {

    }

        //changing to populate all images

    let resultImages = results.map((image) => {
        return <ResultsListItem image={"/media/alias/" +image.uuid} caption={image.title} key={image.uuid}/>
    });
    render() {
        return (

            <Infinite  elementHeight={200} preloadBatchSize={Infinite.containerHeightScaleFactor(0.5)} useWindowAsScrollContainer={true}>
                {resultImages}
                </Infinite>
        );

    }


}
