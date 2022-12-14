import React, {useEffect, useState} from 'react';
import PO from './PO';
import SearchBar from '../../../components/SearchBar';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../context/Firebase'

export default function Inventory() {
  const [po, setPO] = useState([])
  const [filter, setFilter] = useState('')
  const docRef = collection(db, 'po')
  const snap = async function getPO() {
      const querysnapshot = await getDocs(docRef);
      const poArr = []
      querysnapshot.forEach((doc) => {
        poArr.push({id: doc.id, data: doc.data()})
      })
      const purch = poArr.filter((po) => po.data.status.toLowerCase().includes(filter.toLowerCase()) || po.data.id === Number(filter.toLowerCase()) || po.data.vendor.name.toLowerCase().includes(filter.toLowerCase()))
      setPO(purch)
  }
  useEffect(() => {
    snap()
  }, [filter])
  if (po === null) return null
  return (
    <>
      <div className='searchbar-grid'>
        <SearchBar filter={setFilter} />
        <div className='dash'>
          <h2 className='title'>
            Purchase Orders
          </h2>
          <div className='table'>
            <div className='table-headers po-headers'>
              <div className='table-header'>
                <h3 className='left-align'>
                  PO #
                </h3>
              </div>
              <div className='table-header'>
                <h3>
                  Status
                </h3>
              </div>
              <h3 className='table-header'>
                Vendor
              </h3>
              <div className='table-header'>
                <h3>
                  Cost
                </h3>
                <div className='po-container'>
                  <h2>
                    Subtotal
                  </h2>
                  <h2>
                    Tax
                  </h2>
                  <h2>
                    Total
                  </h2>
                </div>
              </div>
            </div>
            {po.map((item) => 
            <PO key={item.id} id={item.id} item={item.data} />)}
          </div>
        </div>
      </div>
    </>
  )
}
