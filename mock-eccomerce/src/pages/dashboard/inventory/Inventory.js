import React, {useEffect, useState} from 'react';
import Item from './Item';
import SearchBar from '../../../components/SearchBar';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../context/Firebase'

export default function Inventory() {
  const [inventory, setInventory] = useState([])
  const docRef = collection(db, 'inventory')
  const [filter, setFilter] = useState('')
  const snap = async function getInventory() {
      const querysnapshot = await getDocs(docRef);
      const itemssArr = []
      querysnapshot.forEach((doc) => {
        itemssArr.push({id: doc.id, data: doc.data()})
      })
      const ivent = itemssArr.filter((item) => item.data.name.toLowerCase().includes(filter.toLowerCase()) || item.data.category.toLowerCase().includes(filter.toLowerCase()) )
      setInventory(ivent)
  }
  useEffect(() => {
    snap()
  }, [filter])
  if (inventory === null) return null
  return (
    <>
      <div className='searchbar-grid'>
        <SearchBar filter={setFilter}  />
        <div className='dash'>
          <h2 className='title'>
            Inventory
          </h2>
          <div className='table'>
            <div className='table-headers inventory-headers'>
              <div className='table-header'>
                <h3>
                  Name
                </h3>
              </div>
              <h3 className='table-header'>
                Category
              </h3>
              <h3 className='table-header'>
                Price
              </h3>
              <h3 className='table-header'>
                Cost
              </h3>
              <div className='table-header'>
                <h3>
                  Quantities
                </h3>
                <div className='size-container'>
                  <h2>
                    S
                  </h2>
                  <h2>
                    M
                  </h2>
                  <h2>
                    L
                  </h2>
                  <h2>
                    XL
                  </h2>
                </div>
              </div>
            </div>
            {inventory.map((item) => 
            <Item key={item.id} id={item.id} item={item.data} />)}
          </div>
        </div>
      </div>
    </>
  )
}
