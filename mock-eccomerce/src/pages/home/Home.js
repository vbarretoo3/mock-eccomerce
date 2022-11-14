import React, {useState} from 'react';
import Collection from '../../components/Collection'

function Home() {
  const [count, setCount] = useState('')
  const myfunc = setInterval(function() {
    var discountDate = new Date("Dec 25, 2022 09:00:00").getTime()
    var now = new Date().getTime()
    var timeLeft = discountDate - now
    var days = Math.floor(timeLeft / (1000*60*60*24))
    var hours = Math.floor((timeLeft % (1000*60*60*24)) / (1000*60*60))
    var minutes = Math.floor((timeLeft % (1000*60*60)) / (1000*60))
    return (
      setCount(`${days} DAYS, ${hours}H & ${minutes}MIN`)
      )
  }, 1000)

  return (
    <>
      <div className='container'>
        <div className='hero'>
          <h1 className='hero-title'>
            Mock Store!
          </h1>
        </div>
        <div className='discount-container'>
          <div className='discount'>
            <div className='divider'></div>
            <p>
              {count} UNTILL NEXT DISCOUNT!
            </p>
            <div className='divider'></div>
          </div>
        </div>
        <div className='collections'>
          <Collection />
        </div>
      </div>
    </>
  )
}

export default Home