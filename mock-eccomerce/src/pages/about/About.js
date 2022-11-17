import React from 'react'

export default function About() {
  return (
    <div className='default-container'>
      <h1>About Us</h1>
      <br />
      <p className='default-paragraph'>
        We from mock eccomerce are a local company that ships for canada wide. This website was build in order to display my skills as a web developer as part of my portifolio. The website was built in ReactJS framework and is being hosted by firebase the website allows users to create profiles depending of the profile they might have staff privileges that allow access to a dashboard that works as a full CRM software included within the website.
      </p>
      <br />
      <p className='default-paragraph'>
        The website also works with Google Cloud functions that allows an auto update everytime a user, vendor or product gets update this way for example if a user updates its information all orders that this customer currently has also gets updated with the new info. The website alos uses Stripe API to process payments.
      </p>
      <br />
      <p className='default-paragraph'>
        Besides the cloud functions this app also uses the firebase storage service to manage all product images. 
      </p>
    </div>
  )
}
