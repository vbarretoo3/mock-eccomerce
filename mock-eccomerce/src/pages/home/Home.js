import React from 'react'

function Home() {
  const count = '11:00 ' 
  return (
    <>
      <div className='container'>
        <div className='hero'>
          <h1 className='hero-title'>
            Mock Store!
          </h1>
        </div>
        <div className='discount'>
          <div className='divider'></div>
          <h2>
            {count} till next discount!
          </h2>
          <div className='divider'></div>
        </div>
      </div>
    </>
  )
}

export default Home