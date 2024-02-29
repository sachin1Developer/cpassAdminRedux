import React from 'react';
import { Button, Container } from 'reactstrap';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


function ViewAppConfig() {
    const location = useLocation();
    // console.log(location.state.data)

    return (
        <Container>
            {/* <div className='d-flex justify-content-center my-4'> */}
            {/* <h3>View Subscriber Range</h3> */}
            <b>
                <h3 className='pvmHeading text-slate-800'>View Subscriber Range ✨
                    <div className='my-2'>
                        <Link to='/systemConfiguration/applicationConfiguration'>
                            <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                        </Link>
                    </div>
                </h3>
            </b>
            {/* </div> */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Param Id
                            </td>
                            <td className='px-5 py-3'> {location.state.data?.paramId}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3'
                                style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Owner
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.owner}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Param Type
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.paramType} </td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Param Tag
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.paramTag}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Pavam Value
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.paramValue}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Remarks
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.remarks}</td>
                        </tr>
                    </thead>
                </table>
            </div>
            {/* <div className="d-flex justify-content-center my-4">
                <Link to='/systemConfiguration/applicationConfiguration'>
                    <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                </Link>
            </div> */}
        </Container>
    );


}

export default ViewAppConfig;