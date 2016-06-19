// contains individual result components (dumb)
import React from 'react';
import ResultsListItem from './resultsListItem';
import ResultsJumbotron from '../FeaturedResult/resultsJumbotron';

const ResultsList = (props) => {

    //creates array of list items
    const resultMemes = props.images.result.map((image) => {
        return <ResultsListItem image={image.imageUrl} caption={image.displayName} key={image.generatorID}/>
    });

    // creates array of images for Jumbotron

    const jumboMemeArray = props.images.result.map((image) =>{
        return image;
    });
    const maxIndex = jumboMemeArray.length - 1, jumboMemes = {};
    console.log("maxIndex: ", maxIndex);

    //deposits five random and unique images into jumboMemes object

    while(Object.keys(jumboMemes).length <= 5 ){

        let tempIndex = getRandomIndex(0, maxIndex);

        if (!jumboMemes[jumboMemeArray[tempIndex].generatorID]){
            jumboMemes[jumboMemeArray[tempIndex].generatorID] = jumboMemeArray[tempIndex];
        }
    }

    console.log("Inside resultsList, jumboMemes: ", jumboMemes);

    const jumboMemeArray2 = [];


    for (let key in jumboMemes){
      jumboMemeArray2.push(jumboMemes[key]);
    }

    console.log("jumboMemeArray2: ", jumboMemeArray2);

    const jumboMemeDisplay = jumboMemeArray2.map((image) => {
      return <ResultsJumbotron image={image.imageUrl} caption={image.displayName} key={image.generatorID} />
    });

    console.log("jumboMemeDisplay: ", jumboMemeDisplay);

    return (
//         // <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
//         //
//         // <!-- Wrapper for slides -->
//         //
//         // <div class="carousel-inner" role="listbox">
//         {jumboMemeDisplay}
//
//
// {/*
//         </div>*/}
//
//         <!-- Controls -->
//         {/*<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
//           <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
//           <span class="sr-only">Previous</span>
//         </a>
//         <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
//           <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
//           <span class="sr-only">Next</span>
//         </a>
//       </div>*/}

      <div className="row">
        {resultMemes}
        {jumboMemeDisplay}
      </div>
    );




    }



export default ResultsList;

function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
