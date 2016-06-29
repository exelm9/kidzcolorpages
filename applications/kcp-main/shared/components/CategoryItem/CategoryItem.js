// result component(functional)
import React from 'react';

import CollectionItem from '../CollectionItem/CollectionItem.js';
import _ from 'lodash';

const categoryItem = ({collections, caption, showModal}) => {
  let uniqueId = 0;
  let mappedCollections = [];
  let attachCollections = (colIdx) => {
    showModal({collections: mappedCollections, colIdx})
  };
  const collectionItems = _.map(collections, (collection) => {
    mappedCollections.push(collection);
    return (
      <CollectionItem
        image={"/media/alias/" + collection.collection_thumb}
        caption={collection.title}
        attachCollections={attachCollections}
        uuid={collection.uuid}
        key={collection.uuid}
        colIdx={uniqueId++} />
    );
  });
  
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
