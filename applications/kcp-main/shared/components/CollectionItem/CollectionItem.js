import React from 'react';

const CollectionItem = (props) => {
  const {image, caption, attachCollections, colIdx} = props;

  const handleClick = (e) => {
    attachCollections(colIdx);
  }

  return (
    <div className='collectionWrap'>
      <img
        src={image}
        className='collectionItem'
        onClick={(e) => handleClick(e)}
      />
      <div>{caption}</div>
    </div>
  );
};

export default CollectionItem;