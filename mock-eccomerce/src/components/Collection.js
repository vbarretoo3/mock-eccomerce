import React from 'react';
import CollectionItem from './CollectionItem';

function Collection() {
    const items = ['Shirt', 'Pants', 'Hoodie', 'Hat', 'Jacket']
    return (
    <>
        <div className='collection-container'>
            <h2 className='collection-title'>
                Collections
            </h2>
            <div className='collection-items'>
                {items.map((item) => <CollectionItem key={item} item={item}/>)}
            </div>
        </div>
    </>
  )
}

export default Collection