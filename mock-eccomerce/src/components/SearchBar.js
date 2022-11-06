import React, { useRef } from 'react';
import {HiOutlinePlus} from 'react-icons/hi'
import {useParams} from 'react-router-dom'

function SearchBar({filter}) {
  const searchRef= useRef()
  const id = useParams()
  return (
    <div className='search-bar-container'>
      <div>
        <input ref={searchRef} type='text' placeholder='Search' onChange={() => filter(searchRef.current.value)} className='search' />
      </div>
      <div className='add-container'>
        <a href={`/dashboard/${id['*']}/add`} className='add'><button className='add-button'><HiOutlinePlus className='add-icon' /></button></a>
      </div>
    </div>
  )
}

export default SearchBar