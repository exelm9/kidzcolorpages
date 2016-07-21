// result component(functional)
import React from 'react';

const ResultsListItem = ({image, idx, showImage, selected}) => {
  const handleClick = (e) => showImage(idx);
  
  return (
    <div className={selected ? 'thumbWrap selected ' : 'thumbWrap'} onClick={(e) => handleClick(e)}>
      <figure>
        <img
          src={image}
          className='collectionItem'
        />
      </figure>
    </div>
  );
};

export default ResultsListItem;
