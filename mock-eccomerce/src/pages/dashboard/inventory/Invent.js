import { useNavigate, useParams } from "react-router-dom";
import React, {useEffect, useState, useRef} from 'react';
import { collection, doc, getDoc, updateDoc, getDocs } from 'firebase/firestore';
import {db} from '../../../context/Firebase';
import {BsFillPencilFill} from  'react-icons/bs';
import {MdClose} from 'react-icons/md'

export default function Invent() {
  const id= useParams()
  const nameRef = useRef()
  const categoryRef = useRef()
  const costRef = useRef()
  const priceRef = useRef()
  const smallRef = useRef()
  const mediumRef = useRef()
  const largeRef = useRef()
  const xlargeRef = useRef()
  const vendorRef = useRef()
  const [isEditing, setIsEditing] = useState()
  const [inventory, setInventory] = useState(null)
  const docRef = doc(db, 'inventory', `${id.id}`)
  const [vendors, setVendors] = useState(null)
  const vendorLoc = collection(db, 'vendors')
  const history = useNavigate()

  const docSnap = async() => {
    const vendorArr = []
    await getDoc(docRef).then((doc) => setInventory({id: doc.id, data: doc.data()}))
    const snapshot = await getDocs(vendorLoc)
    snapshot.forEach((doc) => vendorArr.push({id: doc.id, data: doc.data()}))
    setVendors(vendorArr)
  }

  useEffect(() => {
    docSnap()
  }, [])

  if (inventory == null) return null
  
  async function handleSave() {
    const vendorInfo = vendorRef.current.value.split(',')
    const userData = {
      name: nameRef.current.value,
      category: categoryRef.current.value,
      price: Number(priceRef.current.value),
      cost: Number(costRef.current.value),
      quantity: {
        small: Number(smallRef.current.value),
        medium: Number(mediumRef.current.value),
        large: Number(largeRef.current.value),
        xlarge: Number(xlargeRef.current.value)
      },
      vendors: [
        {
          name: vendorInfo[0],
          vendorRef: vendorInfo[1],
        },
      ],
    }
  const dataRef = doc(db, 'inventory', inventory.id)
  await updateDoc(dataRef, userData)
  history(0)
  }

  if (inventory === null) return null
  if (vendors === null) return null

  return (
    <div className="dash">
      <div className='customer-detail-container'>
        <div className="fields right-align icons" >
          {isEditing? <MdClose className="menu-icon" onClick={() => setIsEditing(!isEditing)} />:
          <BsFillPencilFill className="menu-icon" onClick={() => setIsEditing(!isEditing)} />}
        </div>
        {isEditing? 
        <>
          <div className='fields'>
            <h3>
              Item:
            </h3>
            <input ref={nameRef} defaultValue={inventory.data.name}/>
          </div>
          <div className='customer-subdetails'>
            <div className="fields">
              <h3>
                Category: 
              </h3>
              <select className="vendor-selector" ref={categoryRef} defaultValue={inventory.data.category}>
                <option value='Shirt'>Shirt</option>
                <option value='Hat'>Hat</option>
                <option value='Hoodie'>Hoodie</option>
                <option value='Pants'>Pants</option>
              </select>
              <br/>
              <br/>
              <h3>
                Cost:
              </h3>
              <input ref={costRef} defaultValue={inventory.data.cost.toLocaleString()}/>
              <br/>
              <br/>
              <h3>
                Mark-Up:
              </h3>
              <p>{((Number(inventory.data.price))/(Number(inventory.data.cost)))}</p>
              <br/>
              <h3>
                Price:
              </h3>
              <input ref={priceRef} defaultValue={Number(inventory.data.price.toLocaleString())}/>
            </div>
            <div className="fields">
              <h3>
                Quantity
              </h3>
              <div className="left-align qty-grid">
                <h3>
                  S:
                </h3>
                <input type='number' className='qty-input' ref={smallRef} defaultValue={inventory.data.quantity.small}/>
                <br/>
                <br/>
              </div>
              <div className="left-align qty-grid">
                <h3>
                  M:
                </h3>
                <input type='number' className='qty-input' ref={mediumRef} defaultValue={inventory.data.quantity.medium}/>
                <br/>
                <br/>
              </div>
              <div className="left-align qty-grid">
                <h3>
                  L:
                </h3>
                <input type='number' className='qty-input' ref={largeRef} defaultValue={inventory.data.quantity.large}/>
                <br/>
                <br/>
              </div>
              <div className="left-align qty-grid">
                <h3>
                  XL:
                </h3>
                <input type='number' className='qty-input' ref={xlargeRef} defaultValue={inventory.data.quantity.xlarge}/>
                <br/>
                <br/>
              </div>
            </div>
          </div>
          {inventory.data.vendors.length === 0 ? null : 
          <div className="fields">
            <div>
              <h3>Vendors</h3>
            </div>
              {inventory.data.vendors.map((vendor) => 
                <>
                  <select className="vendor-selector" ref={vendorRef} defaultValue={`${vendor.name},${vendor.vendorRef}`}>
                    {vendors.map((vend) => 
                      <option key={vend.id} value={`${vend.data.name},${vend.id}`}>{vend.data.name}</option>
                    )}
                  </select>
                </>
              )}
          </div>}
        </>
          :
        <>
            <div className='fields'>
            <h3>
              Item:
            </h3>
            <p>{inventory.data.name}</p>
          </div>
          <div className='customer-subdetails'>
            <div className="fields">
              <h3>
                Category: 
              </h3>
              <p>{inventory.data.category}</p>
              <br/>
              <br/>
              <h3>
                Cost:
              </h3>
              <p>{inventory.data.cost.toLocaleString()}</p>
              <br/>
              <br/>
              <h3>
                Mark-Up:
              </h3>
              <p>{((Number(inventory.data.price))/(Number(inventory.data.cost)))}</p>
              <br/>
              <h3>
                Price:
              </h3>
              <p>{Number(inventory.data.price.toLocaleString())}</p>
            </div>
            <div className="fields">
              <h3>
                Quantity
              </h3>
              <div className="left-align qty-grid">
                <h3>
                  S:
                </h3>
                <p>{inventory.data.quantity.small}</p>
                <br/>
                <br/>
              </div>
              <div className="left-align qty-grid">
                <h3>
                  M:
                </h3>
                <p>{inventory.data.quantity.medium}</p>
                <br/>
                <br/>
              </div>
              <div className="left-align qty-grid">
                <h3>
                  L:
                </h3>
                <p>{inventory.data.quantity.large}</p>
                <br/>
                <br/>
              </div>
              <div className="left-align qty-grid">
                <h3>
                  XL:
                </h3>
                <p>{inventory.data.quantity.xlarge}</p>
                <br/>
                <br/>
              </div>
            </div>
          </div>
          {inventory.data.vendors.length === 0 ? null : 
          <div className="fields">
            <div>
              <h3>Vendors</h3>
            </div>
            {inventory.data.vendors.map((vendor) => 
              <div key={vendor.vendorRef}>
                <a className="table-links" href={'/dashboard/vendors/' + vendor.vendorRef}>{vendor.name}</a>
              </div>
            )}
          </div>}
        </>}
        
        <div>
        {isEditing? 
          <>
            <button onClick={handleSave}>Save</button>
          </>
          :
          null }
        </div>
      </div>
    </div>
  )
}
