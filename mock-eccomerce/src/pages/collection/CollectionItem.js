import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../context/Firebase';
import { ref, getDownloadURL, listAll, } from 'firebase/storage';

function CollectionItem({item}) {
    const history = useNavigate()
    const storageRef = ref(storage, `${item.id}/`)
    const [images, setImages] = useState(null)

    const imageSnap = () => {
        const urlArr = []
        listAll(storageRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(ref(storage, item._location.path_)).then((url) => {
                    urlArr.push(url)
                    setImages(urlArr)
                })
            })
        })
    }

    useEffect(() => {
        imageSnap()
    }, [])

    if (images === null) return null

    return (
        <div className='collection-item' onClick={() => history(`${item.id}`)}>
            <img className='collection-thumbnail' src={images[0]} alt='/' />
            <div className='divider'></div>
            <p className='collection-item-name'>{item.data.name}</p>
            <p>${item.data.price}</p>
        </div>
    )
}

export default CollectionItem