import React from 'react'

export default function Empty({name}) {
  return (
    <div className='d-flex justify-content-center align-items-center fw-bold ' style={{height:'40em'}}>
        {name}
    </div>
  )
}
