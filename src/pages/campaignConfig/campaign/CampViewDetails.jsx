import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function CampViewDetails(props) {
    const location = useLocation();
    const data = location.state.data;
    // console.log(data)


    return (
        <div className='' >
            <Container>
                <b>
                    <h3 className='pvmHeading text-slate-800'>View Campaign Details ✨</h3>
                </b>
                <div className='clsflex'>
                    <Container>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <table>
                                <thead>
                                    <tr style={{ border: '1px solid #c1bbbb' }}>
                                        <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>Campaign Id </td>
                                        <td className='px-5 py-3'> {data.CAMPAIGN_ID}</td>
                                    </tr>
                                    <tr style={{ border: '1px solid #c1bbbb' }}>
                                        <td className='px-5 py-3'
                                            style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>Campaign Name </td>
                                        <td className='px-5 py-3'>{data.CAMPAIGN_NAME}</td>
                                    </tr>
                                    <tr style={{ border: '1px solid #c1bbbb' }}>
                                        <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>Campaign Message </td>
                                        <td className='px-5 py-3'>{data.CAMPAIGN_MESSAGE} </td>
                                    </tr>
                                    <tr style={{ border: '1px solid #c1bbbb' }}>
                                        <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>Start Date </td>
                                        <td className='px-5 py-3'>{data.START_DATE} </td>
                                    </tr>
                                    <tr style={{ border: '1px solid #c1bbbb' }}>
                                        <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>End  Date </td>
                                        <td className='px-5 py-3'>{data.END_DATE}</td>
                                    </tr>
                                    <tr style={{ border: '1px solid #c1bbbb' }}>
                                        <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>FLOW_ID </td>
                                        <td className='px-5 py-3'> {data.FLOW_ID}</td>
                                    </tr>
                                    <tr style={{ border: '1px solid #c1bbbb' }}>
                                        <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>INTERFACE </td>
                                        <td className='px-5 py-3'> {data.INTERFACE}</td>
                                    </tr>
                                    <tr style={{ border: '1px solid #c1bbbb' }}>
                                        <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>PRIORITY </td>
                                        <td className='px-5 py-3'> {data.PRIORITY}</td>
                                    </tr>
                                    <tr style={{ border: '1px solid #c1bbbb' }}>
                                        <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>STATUS </td>
                                        <td className='px-5 py-3'> {data.STATUS}</td>
                                    </tr>
                                    <tr style={{ border: '1px solid #c1bbbb' }}>
                                        <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>Product Name </td>
                                        <td className='px-5 py-3'> {data.product_name}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="d-flex justify-content-center my-4">
                            <Link to='/camapign/viewCamapign'>
                                <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                            </Link>
                        </div>
                    </Container>
                </div>
            </Container>
        </div>
    );
}

export default CampViewDetails;
