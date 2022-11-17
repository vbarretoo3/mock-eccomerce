import React, { useState } from 'react';
import { GoTriangleRight, GoTriangleDown } from 'react-icons/go';

function Question({question}) {
    const [isActive, setIsActive] = useState(false)
  return (
    <div>
        <div className='faq-question' onClick={() => setIsActive(!isActive)}>
            <h2>{question.question}</h2>
            {!isActive?
            <GoTriangleRight className='faq-icons' />:<GoTriangleDown className='faq-icons' />
            }
        </div>
        <div className={isActive?'show-question':'hide-menu'}>
            <h4>{question.answer}</h4>
        </div>
    </div>
  )
}

export default Question