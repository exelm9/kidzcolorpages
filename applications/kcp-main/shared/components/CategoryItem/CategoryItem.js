// result component(functional)
import React from 'react';

import CollectionItem from '../CollectionItem/CollectionItem.js';
import _ from 'lodash';

const categoryItem = ({collections, caption, key, showModal}) => {
  let uniqueId = 0;
  const collectionItems = _.map(collections, (collection, idx) => {
    return <CollectionItem
            image={"/media/alias/" + collection.collection_thumb}
            caption={collection.title}
            showModal={showModal}
            uuid={collection.uuid}
            key={collection.uuid}
            imgIdx={uniqueId++}
            count={collection.alias_count}
            />
  })
  
  return (
    <div className="categoryItem">
      <div className="thumbnail">
        <div className="caption">
          <p>{caption}</p>
        </div>
        <div>
          {collectionItems}
        </div>
      </div>
    </div>
  );
};

export default categoryItem;
