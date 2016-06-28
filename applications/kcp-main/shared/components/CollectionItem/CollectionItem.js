import React from 'react';

const CollectionItem = (props) => {
  const {image, caption, showModal, imgIdx, index} = props;

  const handleClick = (e) => {
    showModal({imgIdx:props.imgIdx, uuid: props.uuid});
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