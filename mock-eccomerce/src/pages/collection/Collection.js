import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../context/Firebase';
import CollectionItem from './CollectionItem'


export default function Collection() {
    const id = useParams()
    const collectionRef = (id.id).charAt(0).toUpperCase() + (id.id).slice(1)
    const itemRef = query(collection(db, 'inventory'), where('category', '==', collectionRef))
    const [items, setItems] = useState(null)
    const snap = async () => {
        const itemArr = []
        const itemSnap = await getDocs(itemRef)
        itemSnap.forEach((doc) => {
            itemArr.push({id: doc.id,data: doc.data()})
        })
        setItems(itemArr)
    }

    useEffect(() => {
        snap()
    }, [])

    if (items===null)return null

    return (
        <div className='collection-item-container'>
            <h1>{collectionRef}</h1>
            <div className='collection-item-grid'>
                {items.map((item) => <CollectionItem item={item} />)}
            </div>
        </div>
    )
}
