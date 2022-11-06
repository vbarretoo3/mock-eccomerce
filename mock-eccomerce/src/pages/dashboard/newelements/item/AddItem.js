import { useNavigate } from "react-router-dom";
import React, {useEffect, useRef, useState} from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import {db} from '../../../../context/Firebase';
import {AiOutlinePlus} from 'react-icons/ai';

export default function AddVendor() {
  const itemRef = useRef()
  const costRef = useRef()
  const categoryRef = useRef()
  const priceRef = useRef()
  const sRef = useRef()
  const mRef = useRef()
  const lRef = useRef()
  const xlRef = useRef()
  const vendorRef = useRef()
  const [vendors, setVendors] = useState([])
  const history = useNavigate()

  const snap = async function() {
    const snapshot = await getDocs((collection(db, 'vendors')))
    const vendorsArr = []
    snapshot.forEach((doc) => {
      vendorsArr.push({id: doc.id, data: doc.data()})
    })
    setVendors(vendorsArr)
  }

  useEffect(() => {
    snap()
  }, [])

  

  function handleCancel() {
    history(`/dashboard/inventory`)
  }

  async function handleSave(e) {
    e.preventDefault()
    const vendorInfo = vendorRef.current.value.split(',')
    const docData = {
      name: itemRef.current.value,
      cost: Number(costRef.current.value),
      price: Number(priceRef.current.value),
      category: categoryRef.current.value,
      quantity: {
        small: Number(sRef.current.value),
        medium: Number(mRef.current.value),
        large: Number(lRef.current.value),
        xlarge: Number(xlRef.current.value)
      },
      vendors: [
        {
          name: vendorInfo[0],
          id: vendorInfo[1]
        },
      ]
    }
    console.log(docData)
    const docRef = await addDoc(collection(db, 'inventory'), docData)
    history(`/dashboard/inventory/${docRef.id}`)
  }

  if (vendors===[]) return null
  
  return (
    <div className='dash'>
      <form type='Submit' onSubmit={handleSave}>
        <div className='customer-detail-container'>
          <div className='fields'>
            <h3>
              Item Name:
            </h3>
            <input ref={itemRef} placeholder='Item' required/>
          </div>
          <div className='customer-subdetails'>
            <div className="fields">
              <h3>
                Category: 
              </h3>
              <select className="vendor-selector" defaultValue='' ref={categoryRef} required>
                <option value="">Select a Category</option>
                <option value='Shirt'>Shirt</option>
                <option value='Pants'>Pants</option>
                <option value='Hoodie'>Hoodie</option>
                <option value='Hat'>Hat</option>
              </select>
              <br/>
              <br/>
              <h3>
                Cost:
              </h3>
              <input ref={costRef} type='float' placeholder='2.5' required/>
              <br/>
              <br/>
              <h3>
                Price:
              </h3>
              <input ref={priceRef} type='float' placeholder='5' required/>
            </div>
            <div className="fields">
              <h3>
                Quantity
              </h3>
              <div className="qty-main-grid">
                <div className="left-align qty-grid">
                  <h3>
                    S:
                  </h3>
                  <input className="qty-input" type='Number' ref={sRef} placeholder='3'/>
                  <br/>
                  <br/>
                </div>
                <div className="left-align qty-grid">
                  <h3>
                    M:
                  </h3>
                  <input className="qty-input" type='Number' ref={mRef} placeholder='5'/>
                  <br/>
                  <br/>
                </div>
                <div className="left-align qty-grid">
                  <h3>
                    L:
                  </h3>
                  <input className="qty-input" type='Number' ref={lRef} placeholder='1'/>
                  <br/>
                  <br/>
                </div>
                <div className="left-align qty-grid">
                  <h3>
                    XL:
                  </h3>
                  <input className="qty-input" type='Number' ref={xlRef} placeholder='7'/>
                  <br/>
                  <br/>
                </div>
              </div>
            </div>
          </div> 
          <div className="fields">
            <div>
              <h3>Vendors</h3>
            </div>
            <div className="vendor-select">
              <select className="vendor-selector" ref={vendorRef} defaultValue='' required>
                <option value=''>Select a Vendor</option>
                {vendors.map((seller)=> 
                  <option key={seller.id} value={[seller.data.name, seller.id]}>{seller.data.name}</option>
                )}
              </select>
            </div>
          </div>
          <div>
            <button type="Submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
