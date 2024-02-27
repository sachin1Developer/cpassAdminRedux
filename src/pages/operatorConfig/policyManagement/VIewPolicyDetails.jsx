import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CommanButton from '../../../components/CommanButton';


function VIewPolicyDetails() {
    const location = useLocation();
    console.log(location.state.data)

    return (
        <div className='container'>

            <div className=' d-flex justify-content-between my-2 align-items-center'>
                    <h4 className='fw-bold mx-2'>View Policy Detail ✨
                    </h4>
                    <div className='mx-2'>
                        <Link to='/operatorConfig/viewPolicy' style={{ textDecoration: 'none' }}>
                            <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                        </Link>
                    </div>
                </div>
            <div className='mb-5' style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Policy ID
                            </td>
                            <td className='px-5 py-3'> {location.state.data?.policyId}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3'
                                style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Policy Name
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.policyName}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Description
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.description} </td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Exist
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.status}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                SMS Count
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.smsCount}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                SMS Day
                            </td>
                            <td className='px-5 py-3'> {location.state.data?.smsDays}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3'
                                style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                SMS Difference
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.smsPromoDifference}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                OBD Count
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.obdCount} </td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                OBDDay
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.obdDays}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                OBD Difference
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.obdPromoDifference}</td>
                        </tr>  <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Total Count
                            </td>
                            <td className='px-5 py-3'> {location.state.data?.totalCount}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3'
                                style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Total Days
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.totalDays}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Promo Diffrence
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.promoDifference} </td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Owner
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.owner}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );


}

export default VIewPolicyDetails;