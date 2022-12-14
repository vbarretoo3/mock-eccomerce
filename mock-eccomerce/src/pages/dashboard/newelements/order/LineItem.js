import React, { useRef, useCallback, useState } from 'react';
import {AiOutlineClose} from 'react-icons/ai'

function LineItem({remove, changes, updateInfo, currentLine, index, items}) {
    const qtyRef = useRef()
    const sizeRef = useRef()
    const itemsRef = useRef()
    const [priceRef, setPriceRef] = useState(0)
    const [itemRef, setItemRef] = useState('')
    const [categoryRef, setCategoryRef] = useState('')
    const [itemNameRef, setItemNameRef] = useState('')
    var [total, setTotal] = useState(0)
    var [tax, setTax] = useState(0)
    var [subtotal, setSubtotal] = useState(0)
    const [itemInfo, setItemInfo] = useState(null)

    function handleQTY(price, qty) {
        let quantity = Number(qty)
        setSubtotal(price * quantity)
        setTax((price * quantity)*.13)
        setTotal((price * quantity)*1.13)
        const ItemData = {
            category: categoryRef,
            itemRef: itemRef,
            price: priceRef,
            name: itemNameRef,
            quantity: {
                [sizeRef.current.value]: Number(qtyRef.current.value),
            }
        }
        currentLine = ItemData
        updateInfo(currentLine, index)
        changes((prevState) => prevState + 1)
    }

    function handleSelectItem(info) {
        const itemID = info.split(',')[1]
        for (let i in items) {
            if (items[i].id === itemID) {
                setItemInfo(items[i])
                setTotal(items[i].data.price*1.13)
                setSubtotal(items[i].data.price)
                setTax(items[i].data.price*.13)
                setPriceRef(items[i].data.price)
                setItemRef(items[i].id)
                setItemNameRef(items[i].data.name)
                setCategoryRef(items[i].data.category)
                currentLine = {
                    name: items[i].data.name,
                    category: items[i].data.category,
                }
            }
        }
        updateInfo(currentLine, index)
        changes((prevState) => prevState + 1)
    }

    function handleSizeChange() {
        const itemData = {
            category: categoryRef,
            itemRef: itemRef,
            price: priceRef,
            name: itemNameRef,
            quantity: {
                [sizeRef.current.value]: Number(qtyRef.current.value),
            }
        }
        currentLine = itemData
        updateInfo(currentLine, index)
        changes((prevState) => prevState + 1)
    }

    const ItemDetails = useCallback(() => {
        return (
          <>
            <div>
                {itemInfo.data.category}
            </div>
            <select className='vendor-selector' onChange={() => handleSizeChange()} defaultValue='' required ref={sizeRef}>
                <option hidden value=''>Select a Size</option>
                {Object.keys(itemInfo.data.quantity).map((size)=> 
                    {if (itemInfo.data.quantity[size] === 0) {
                        return <option disabled key={size} value={size}>{size}</option>
                    } else {
                        return <option key={size} value={size}>{size}</option>
                    }}
                )}
            </select>
            <div>
                <input type='number' className='quantity-input' defaultValue={1} onChange={() => handleQTY(itemInfo.data.price, qtyRef.current.value)} ref={qtyRef}/>
            </div>
        </>
        )
    }, [itemInfo])

    const ItemPrice = useCallback(() => {
        return(
            <>
                <div>
                    ${subtotal.toFixed(2)}
                </div>
                <div>
                    ${tax.toFixed(2)}
                </div>
                <div>
                    ${total.toFixed(2)}
                </div>
            </>
        )
    }, [subtotal])

      
  if (items === null) return null
  return (
    <>
        <select required className='vendor-selector' onChange={() => handleSelectItem(itemsRef.current.value)} ref={itemsRef} defaultValue=''>
            <option disabled hidden value=''>Select an Item</option>
            {items.map((item) =>
            <option key={item.id} value={[item.data.name, item.id]}>{item.data.name}</option>
            )}
        </select>
        {itemInfo && 
        <>
            <ItemDetails />
            <ItemPrice />
            <AiOutlineClose onClick={() => remove(index, setItemInfo)}/>
        </>}
    </>
  )
}

export default LineItem