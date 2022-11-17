import React from 'react';
import { useNavigate } from 'react-router-dom';

function CollectionItem(item) {
  var source = '/'
  if(item.item === 'Shirt') {
    source = 'https://m.media-amazon.com/images/I/71DBklVte9L._UX569_.jpg'
  }else if (item.item === 'Pants'){
    source = 'https://cdn.shopify.com/s/files/1/2258/3625/products/Como_Regular_Suit_Pants-Pants-LDM510030-3232-Grey_Melange-4_800x.jpg'
  }else if (item.item === 'Hoodie'){
    source = 'https://www.spalding.com/dw/image/v2/ABAH_PRD/on/demandware.static/-/Sites-masterCatalog_SPALDING/default/dw7428cdbf/images/hi-res/R27P619_Front_Assortment.jpg?sw=338&sh=426&sm=cut&sfrm=jpg'
  }else if (item.item === 'Jacket'){
    source = 'https://uniworthdress.com/uploads/product/webp/JK2221-1..webp'
  }else if (item.item === 'Hat'){
    source = 'https://cdn.shopify.com/s/files/1/0833/0609/files/icy_desktop_1_1700x550.jpg?v=1658424015'
  } else {
    source = '/'

  }
  const history = useNavigate()
  return (
    <div className='item-container' onClick={() => history(`/${item.item}`)}>
      <img className='collection-thumbnail' src={source} alt='/' />
      <div className='item-divider'></div>
      <h3 className='item-title'>
        {item.item}
      </h3>
    </div>
  )
}

export default CollectionItem