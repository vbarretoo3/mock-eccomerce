import React from 'react'

function CollectionItem(item) {
  return (
    <div className='item-container'>
      <img src='/' alt='/' />
      <div className='item-divider'></div>
      <h3 className='item-title'>
        {item.item}
      </h3>
    </div>
  )
}

export default CollectionItem