import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../context/Firebase'
import { ref, getDownloadURL, listAll, } from 'firebase/storage';

export default function Item({setMasterUpdate}) {
    const id = useParams()
    const [data, setData] = useState(null)
    const [update, setUpdate] = useState(0)
    const [qtyUpdate, setQtyUpdate] = useState(0)
    const [imageUpdate, setImageUpdate] = useState(0)
    const [max, setMax] = useState(100)
    const itemRef = id.div
    const sizeRef = useRef()
    const qtyRef = useRef()
    const storageRef = ref(storage, `${id.div}/`)
    const [images, setImages] = useState(null)
    const [thumb, setThumb] = useState(null)
    const imageSnap = async() => {
        const urlArr = []
        listAll(storageRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(ref(storage, item._location.path_)).then((url) => {
                    urlArr.push(url)
                    setImages(urlArr)
                    setThumb(urlArr[0])
                })
            })
        })
    }

    const snap = async () => {
        const itemSnap = await getDoc(doc(db, 'inventory', itemRef))
        setData({id: itemSnap.id, data: itemSnap.data()})
        setUpdate((currState)=> currState + 1)
    }

    useEffect(() => {
        imageSnap()
        setQtyUpdate((currState) => currState + 1)
        snap()
    }, [])

    function handleImageChange(image) {
        setThumb(image)
        setImageUpdate((currState) => currState + 1)
    }

    function ImagesThumb({image}) {
        return (
            <img className='image-thumb' src={image} alt={image} onClick={() => handleImageChange(image)}/>
        )
    }
    
    const MainImage = useCallback(() => {
        return (
            <img className='image-main' src={thumb} alt={thumb}/>
        )
    }, [imageUpdate])

    const PriceDetails = useCallback(() => {
        if(data === null) return (<><h3>$0.00</h3></>)
        const total = data.data.price * qtyRef.current.value
        return (
            <>
                <h3>$ {total.toFixed(2)}</h3>
            </> 
        )
    }, [qtyUpdate])

    const Quantity = useCallback(() => {
        if(data === null) return null
        return (
            <>
                <input type='number' defaultValue={0} ref={qtyRef} onChange={quantityChange} max={max} required/>
            </> 
        )
    }, [update])

    function handleSizeChange() {
        setMax(data.data.quantity[sizeRef.current.value])
        setUpdate((currState)=> currState + 1)
    }

    function quantityChange() {
        setQtyUpdate((currState) => currState + 1)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const cartData = {
            id: id.div,
            size: sizeRef.current.value,
            quantity: qtyRef.current.value,
            price: data.data.price,
            itemRef: data.data.id
        }
        const prevData = JSON.parse(localStorage.getItem('cart'))
        if(prevData !== null) {
            prevData.push(cartData)
            localStorage.setItem('cart', JSON.stringify(prevData))
        } else {
            localStorage.setItem('cart', JSON.stringify([cartData]))
        }
        setMasterUpdate((currState) => currState + 1)
    }

    if (data === null) return null
    if (images === null) return null
    
    return (
        <div className='collection-item-container'>
            <h1>{data.data.name}</h1>
            <div className='item-details'>
                <div className='image-grid'>
                    <MainImage/>
                    <div className='image-subgrid'>
                        {images.map((image) =>
                        <ImagesThumb image={image}/>)}
                    </div>
                </div>
                <div className='Vdivider'></div>
                <div className='item-subdetails'>
                    <p>Description</p>
                    <form className='item-submission' type='Submit' onSubmit={handleSubmit}>
                        <select className='vendor-selector' ref={sizeRef} onChange={handleSizeChange} required>
                            <option value='' hidden>Select a Size</option>
                            {(Object.keys(data.data.quantity)).map((size) => 
                                <optgroup key={size}>
                                    {data.data.quantity[size] === 0 ? 
                                    <option key={size} value={size} disabled>{size}</option>:
                                    <option key={size} value={size}>{size}</option>}
                                </optgroup>
                            )}
                        </select>
                        <Quantity/>
                        <PriceDetails />
                        <button className='cart' type='Submit'>Add to Cart</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
