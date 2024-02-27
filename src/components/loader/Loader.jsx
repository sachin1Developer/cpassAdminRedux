import React from 'react'
import { HashLoader, ScaleLoader } from 'react-spinners'

export default function Loader() {
    return (
        <div className='d-flex justify-content-center align-items-end h-25'>
            {/* <ScaleLoader
                color="#6366f1"
                speedMultiplier={2}
            /> */}
            <HashLoader
                color="#6366f1"
                size={50}
                speedMultiplier={2}
            />
        </div>
    )
}
