// result component(functional)
import React from 'react';

const ResultsListItem = ({image, idx, showImage}) => {
  const handleClick = (e) => showImage(image, idx);
  
  return (
    <div className='thumbWrap'>
      <figure>
        <img
          src={image}
          className='collectionItem'
          onClick={(e) => handleClick(e)}
        />
      </figure>
    </div>
  );
};

export default ResultsListItem;
