import React from 'react'
import SuccessTick from '../../common/SuccessTick';
import { Link, useLocation } from 'react-router-dom';
import CommanButton from '../CommanButton';

export default function SuccessTemp() {
    const location = useLocation();
    const data = location.state;
    // console.log(data)
    return (
        <div className='h-75 d-flex flex-column justify-content-center' >
            <div className='d-flex flex-column align-items-center my-4 '>
                <SuccessTick />
                <div style={{ width: '80%', textAlign: 'center', margin: '3rem 0' }}>
                    <span style={{ fontWeight: '', fontSize: '35px' }}>Thank you! Your {data?.temptype} template has been {data?.mode} successfully.</span>
                </div>
                <div>{data?.body}</div>
            </div>
            <div className='d-flex justify-content-center align-items-center my-3' >
                <Link style={{ textDecoration: 'none' }} to={data?.url}>
                    <CommanButton > Back  </CommanButton>
                </Link>
            </div>
        </div>
    );
}