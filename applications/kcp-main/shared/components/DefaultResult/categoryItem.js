// result component(functional)
import React from 'react';

const categoryItem = ({collections, caption, key, showModal}) => {
  const handleClick = (e) => {
    console.log(e.target);
    showModal({key});
  }
  
  return (
    <div className="categoryItem">
      <div className="thumbnail">
        <div width={200} height={200} className="img-rounded ${key}" onClick={(e) => handleClick(e)}>
        </div>
        <div className="caption">
          <p>{caption}</p>
        </div>
      </div>
    </div>
  );
};

export default categoryItem;
