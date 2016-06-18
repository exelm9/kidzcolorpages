// result component(functional)
import React from 'react';

const ResultsListItem = ({image, caption}) => {



  return (
    <div className="col-md-3" >
      <div className="thumbnail">
        <img src={image} alt="This is a meme." width={200} height={200} className="img-rounded"/>
        <div className="caption">
          <p>{caption}</p>
        </div>
      </div>
    </div>

  );
} ;

export default ResultsListItem;
