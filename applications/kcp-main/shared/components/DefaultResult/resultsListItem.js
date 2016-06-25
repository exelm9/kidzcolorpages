// result component(functional)
import React from 'react';

const ResultsListItem = ({image, caption, idx, showModal}) => {
  const handleClick = (e) => {
    console.log(e.target);
    showModal({idx});
  }
  
  return (
    <div className="resultListItem">
      <div className="thumbnail">
        <img src={image} alt="This is an image." width={200} height={200} className="img-rounded" onClick={(e) => handleClick(e)}/>
        <div className="caption">
          <p>{caption}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsListItem;
