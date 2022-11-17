import React from 'react';
import Question from './Question';

export default function FAQ() {
  const faq = [
    {
      question: 'Whats your return policy?',
      answer: 'All orders have a 14 days return policy. you can return by simply clicking the return order button in your order menu.'
    },
    {
      question: 'My order is delayed',
      answer: 'Because we ship Canada wide we depend on our courier services normal delivery times can be from 3 to 7 business days if your order has exceeded this amount of time please enter in contact with us.'
    },
    {
      question: 'My Item came defective',
      answer: 'We are extremily happy with our manufacturers for their excelence in providing top of the line producst but every so oftern mistakes happen and you shouldnt pay for them if your item arrived defective send us a picture of the item as soon as you can maximun of 3 days after the package has been delivered and we will send you a replacement item to initiate the process go to your order and click the return button.'
    }
  ]
  return (
    <div className='default-container'>
      <h1>FAQ</h1>
      <h2>Please See below all common questions our customers had in the past. If your question was not answered please contact us by completing <a href='/contact' className='contact-link'>this</a> form</h2>
      <div className='faq-grid-container'>
        <div className='default-container faq-grid'>
          {faq.map((question) => 
            <Question question={question} />
          )}
        </div>
      </div>
    </div>
  )
}
