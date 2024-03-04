import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function Loader() {
    return (
        <div className='d-flex justify-content-center align-items-center ' style={{height:'40em'}}>
            <ScaleLoader
                color="#6366f1"
                speedMultiplier={1.2}
            />
        </div>
    )
}
