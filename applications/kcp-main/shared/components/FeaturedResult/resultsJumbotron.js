// A display for featured content (functional)
import React from 'react';

const ResultsJumbotron = (props) => {

  // creates array of images for Jumbotron
  const imageArray = props.images.result.map((image) =>{
        return image;
    });

  //deposits five random and unique images into jumboImages object
  const maxIndex = imageArray.length - 1;
  let jumboImages = {};
  jumboImages.storage = [];

  while(Object.keys(jumboImages).length <= 5 ){

        let tempIndex = getRandomIndex(0, maxIndex);

        if (!jumboImages[imageArray[tempIndex].generatorID]){

            jumboImages[imageArray[tempIndex].generatorID] = imageArray[tempIndex];
            jumboImages.storage.push(imageArray[tempIndex].generatorID);
        }
    }

  return (
    <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
      {/*Indicators*/}
      <ol className="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        <li data-target="#carousel-example-generic" data-slide-to="3"></li>
        <li data-target="#carousel-example-generic" data-slide-to="4"></li>
      </ol>

      {/*Wrapper for slides*/}
      <div className="carousel-inner" role="listbox">
        <div className="item active">
          <img src={jumboImages[jumboImages.storage[0]].imageUrl} alt="..."></img>
          <div className="carousel-caption">
            {jumboImages[jumboImages.storage[0]].displayName}
          </div>
        </div>
        <div className="item">
           <img src={jumboImages[jumboImages.storage[1]].imageUrl} alt="..."/>
           <div className="carousel-caption">
             {jumboImages[jumboImages.storage[1]].displayName}
           </div>
         </div>
         <div className="item">
           <img src={jumboImages[jumboImages.storage[2]].imageUrl} alt="..."/>
           <div className="carousel-caption">
             {jumboImages[jumboImages.storage[2]].displayName}
           </div>
         </div>
         <div className="item">
           <img src={jumboImages[jumboImages.storage[3]].imageUrl} alt="..."/>
           <div className="carousel-caption">
             {jumboImages[jumboImages.storage[3]].displayName}
           </div>
         </div>
         <div className="item">
           <img src={jumboImages[jumboImages.storage[4]].imageUrl} alt="..."/>
           <div className="carousel-caption">
             {jumboImages[jumboImages.storage[4]].displayName}
           </div>
         </div>

       </div>

      {/*Controls*/}
        <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
    </div>

  );
};

export default ResultsJumbotron;

function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
