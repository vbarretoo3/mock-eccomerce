import React, {useRef} from 'react';
import {nanoid} from 'nanoid';
import {MdClose} from 'react-icons/md';

function LineItem({item, index, order, setUpdate, setSubtotal, setTax, setTotal, inventory, removeItem}) {
  const sizeRef = useRef()
  const qtyRef = useRef()
  const itemRef = useRef()

    function handleSizeChange(index) {
    order.item[index].quantity =  {
      [sizeRef.current.value]: Number(qtyRef.current.value)
    }
    setUpdate((currState) => currState + 1)
  }

  function handleQuantityChange(value, index) {
    const key = Object.keys(order.item[index].quantity)[0]
    if (key.length === 0) {
      order.item[index].quantity =  {
        '': Number(qtyRef.current.value)
      }
    } else {
      order.item[index].quantity =  {
        [key]: Number(qtyRef.current.value)
      }
    }
    updateOrderDetails()
    setUpdate((currState) => currState + 1)
  }

  function updateOrderDetails() {
    setSubtotal(0)
    setTax(0)
    setTotal(0)
    for (let x of order.item) {
      const key = Object.keys(x.quantity)[0]
      setSubtotal((currState) => currState + (x.price * x.quantity[key]))
      setTax((currState) => currState + ((x.price * x.quantity[key])* .13))
      setTotal((currState) => currState + ((x.price * x.quantity[key])* 1.13))
    }
  }

  function handleItemChange(index) {
    for (let x of inventory) {
      if (x.id === itemRef.current.value) {
        order.item[index].itemRef = x.id
        order.item[index].category = x.data.category
        order.item[index].price = x.data.price
        order.item[index].name = x.data.name
        order.item[index].quantity = {'': 1}
      }
    }
    updateOrderDetails()
    setUpdate((currState) => currState + 1)
  }

    var key = Object.keys(item.quantity)[0]
    var quantity = item.quantity[key]

    for (let i of inventory) {
        if (i.id === item.itemRef) {
        var sizes = i.data.quantity
        }
    }

    if (sizes === undefined) {
      sizes = [{small: 1}, {large: 1}, {xlarge: 1}, {medium: 1}]
    }

  return (
    <div className="table-headers  order-items">
        <select className="vendor-selector" ref={itemRef} defaultValue={item.itemRef} onChange={() => handleItemChange(index)} required>
          <option value="" hidden>Select an Item</option>
          {inventory.map((invetItem, iIndex) => 
            <option key={nanoid()} value={invetItem.id}>{invetItem.data.name}</option>
          )}
        </select>
        <p>{item.category}</p>
        <select className="vendor-selector" onChange={() => handleSizeChange(index)} ref={sizeRef} defaultValue={key} required>
          <option value="" hidden>Select a Size</option>
          {Object.keys(sizes).map((size) =>
            <>
              {sizes[size] === 0? 
              <option key={nanoid()} value={size} disabled>{size}</option>:
              <option key={nanoid()} value={size}>{size}</option>}
            </>
          )}
        </select>
        <input type='number' onChange={() => handleQuantityChange(qtyRef.current.value, index)} ref={qtyRef} defaultValue={quantity} required/>
        <p>${(item.price * quantity).toFixed(2)}</p>
        <p>${((item.price * quantity)*.13).toFixed(2)}</p>
        <p>${((item.price * quantity)*1.13).toFixed(2)}</p>
        <MdClose onClick={() => removeItem(index)} />
      </div>
  )
}

export default LineItem