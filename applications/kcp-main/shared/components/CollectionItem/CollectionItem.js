import React from 'react';

const CollectionItem = (props) => {
  const {image, caption, attachCollections, colIdx, count, _class} = props;

  const handleClick = (e) => {
    attachCollections(colIdx);
  }

  return (
    <div className={_class}>
      <img
        src={image}
        className='collectionItem'
        onClick={(e) => handleClick(e)}
      />
      <b>{caption}</b>
      <i>{count}</i>
    </div>
  );
};

export default CollectionItem;