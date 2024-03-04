import React from 'react'

export default function Heading({children,name}) {
    return (
        <div className=' d-flex justify-content-between my-2 align-items-center'>
            <h4 className='fw-bold mx-2 shadow p-2 bg-body-tertiary rounded'>{name} ✨</h4>
            <div className='d-flex align-items-center'>
                {children}
            </div>
        </div>
    )
}
