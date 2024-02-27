import React from 'react';
import { Button, Container } from 'reactstrap';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


function ViewDetailsUser() {
    const location = useLocation();
    console.log(location.state.data)
    const limit = JSON.parse(location.state.data.total_limit);
    const status = JSON.parse(location.state.data.current_status);


    return (
        <Container>
            <b>
                <h3 className='pvmHeading text-slate-800'>View User Detail ✨
                    <div className='my-2'>
                        <Link to='/operatorConfig/userTypeManagement/viewUserType'>
                            <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                        </Link>
                    </div>
                </h3>
            </b>
            <div className='mb-5' style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                UserName
                            </td>
                            <td className='px-5 py-3'> {location.state.data?.USERNAME}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3'
                                style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Role Type
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.ROLE_ID}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                OBD Limit
                            </td>
                            <td className='px-5 py-3'>{limit.obdLimit} </td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                OBD Status
                            </td>
                            <td className='px-5 py-3'>{status.obdLimit}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Email Id
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.EMAIL}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Mobile No.
                            </td>
                            <td className='px-5 py-3'> {location.state.data?.MOBILE_NUM}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </Container>
    );


}

export default ViewDetailsUser;