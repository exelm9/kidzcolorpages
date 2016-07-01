import React from 'react';

const CollectionItem = (props) => {
  const {image, caption, attachCollections, colIdx, imgIdx, count, _class} = props;

  const handleClick = (e) => {
    attachCollections(colIdx,imgIdx);
  }

  let divStyle = {
    backgroundImage: 'url(' + image + ')'
  };

  return (
    <div className={ _class + ' class_box_shadow'}>
      <img style={divStyle} className='collectionItem' onClick={(e) => handleClick(e)} />
      <b>{caption}</b>
      <i>{count}</i>
      <div class="sh_bottom"></div>
    </div>
  );
};

export default CollectionItem;