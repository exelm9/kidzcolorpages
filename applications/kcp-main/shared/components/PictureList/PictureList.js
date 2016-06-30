// result component(functional)
import React from 'react';

import CollectionItem from '../CollectionItem/CollectionItem.js';
import _ from 'lodash';

const pictureListItem = ({collections, caption, showModal}) => {
  let uniqueId = 0;
  let mappedCollections = [];
  let attachCollections = (colIdx, imgIdx) => {
    showModal({collections: mappedCollections, colIdx, imgIdx})
  };

  const collectionItems = _.map(collections, (collection) => {
    mappedCollections.push(collection);
    return (
      <CollectionItem
        image={"/media/alias/" + collection.collection_thumb}
        caption={collection.title}
        attachCollections={attachCollections}
        colIdx={uniqueId++}
        key={collection.uuid}
        count={collection.alias_count}
        _class="collectionWrap"
        imgIdx="0"
      />
    );
  });

  
  return (
    <div className="pictureListItem">
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

export default pictureListItem;
