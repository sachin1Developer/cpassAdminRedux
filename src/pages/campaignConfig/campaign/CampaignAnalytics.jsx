import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Input } from "reactstrap";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function CampaignAnalytics() {

    const [campFilter, setCampFilter] = useState(false)


    return (
        <div className='d-flex'>
            <div className='container my-2 ' >

                <div className="mb-5">
                    <b>
                        <h5 className='campFilter '> Campaign Filter
                            <div className=''>
                                <Button style={{ border: 'none', textDecoration: 'none', backgroundColor: 'transparent', }} onClick={() => { setCampFilter(!campFilter) }}>
                                    {campFilter ?
                                        <div className="btnBack mb-3" ><IndeterminateCheckBoxIcon /></div>
                                        :
                                        <div className="btnBack mb-3" ><AddBoxIcon /></div>
                                    }
                                </Button>
                            </div>
                        </h5>
                    </b>
                    {
                        campFilter &&

                        <div className="d-flex justify-content-end mx-2 " style={{ fontSize: '13px' }}>
                            New | Running | Approve | Paused | Completed | Reject | All | Date Wise
                        </div>
                    }


                    <b>
                        <h3 className='pvmHeading text-slate-800'>View Campaign Analytics ✨ </h3>
                    </b>
                    <Container className="" style={{ backgroundColor: 'rgb(219 219 239)' }}>
                        <TableContainer style={{ backgroundColor: '#d6d6f7' }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow className='bodyColor'>
                                        <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Analytics Name</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                            <Input type="text" className=" border-secondary" placeholder="Analytics Name" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className='bodyColor'>
                                        <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Analytics Description</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                            <Input type="text" className=" border-secondary" placeholder="Analytics Description" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className='bodyColor'>
                                        <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Analytics Name</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                            <select className="form-select border-secondary text-center" id="country"  >
                                                <option >Select</option>
                                                <option value="GSM">GSM</option>
                                                <option value="CDMA">CDMA</option>
                                            </select>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>


                        <Link style={{ textDecoration: 'none', color: 'black' }}>
                            <div className='mb-4 border border-secondary p-3 rounded text-center ' style={{ border: '1px solid', }}>
                                <div className='fw-bold fs-5'>Local Pack's</div>
                            </div>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }}>
                            <div className='mb-4 border border-secondary p-3 rounded text-center ' style={{ border: '1px solid', }}>
                                <div className='fw-bold fs-5'>Data Pack's</div>
                            </div>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }}>
                            <div className='mb-4 border border-secondary p-3 rounded text-center ' style={{ border: '1px solid', }}>
                                <div className='fw-bold fs-5'>International Pack's</div>
                            </div>
                        </Link>

                    </Container>
                    <div className="d-flex mt-5" style={{ justifyContent: 'center' }}>
                        <div>
                            <Button className="btnBack ">Submit</Button>
                        </div> &nbsp;
                        <div>
                            <Button className="btnBack ">Clear</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}


export default CampaignAnalytics;