import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Input, Row, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";






function ScheduleGroup() {

    return (
        <Container>
            <div className='d-flex '>
                {/* <div className=" mx-4">
                    <b>
                        <h3 className='pvmHeading text-slate-800'>Schedule Group✨ </h3>
                    </b> */}
                <Row className="d-flex">
                    <TableContainer className="d-flex" >
                        <Table aria-label="simple table">
                            <TableHead>

                                <TableRow className='bodyColor'>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>Service Name : </TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                        <select className="form-select border-secondary text-center" id="country"  >
                                            <option value="">Service List</option>
                                            {/* <option value="CDMA">CDMA</option> */}
                                        </select>
                                    </TableCell>
                                </TableRow>
                                <TableRow className='bodyColor'>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>Schedule File: : </TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                        <input type="file" accept='.csv' className="form-control border-secondary" id="listTxt" />
                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *File extension should be .txt </label>
                                    </TableCell>
                                </TableRow>
                                <TableRow className='bodyColor'>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>Group Type : </TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                        <select className="form-select border-secondary text-center" id="country"  >
                                            <option value="MOBILE">MOBILE</option>
                                            <option value="BLACKLIST">BLACKLIST</option>
                                        </select>
                                    </TableCell>
                                </TableRow>
                                <TableRow className='bodyColor'>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>Group Behave : </TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                        <select className="form-select border-secondary text-center" id="country"  >
                                            <option value="">Create As New</option>
                                            <option value="">Update as Exist</option>
                                        </select>
                                    </TableCell>
                                </TableRow>
                                <TableRow className='bodyColor'>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>Network Type : </TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                        <select className="form-select border-secondary text-center" id="country"  >
                                            <option value="GSM">GSM</option>
                                            <option value="CDMA">CDMA</option>
                                        </select>
                                    </TableCell>
                                </TableRow>
                                <TableRow className='bodyColor'>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>Schedule Start Time: </TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                        <input type='time' className='border-secondary-subtle p-2 mx-1 rounded' id="startTime" />
                                    </TableCell>
                                </TableRow>
                                <TableRow className='bodyColor'>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>Schedule End Time: </TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                        <input type='time' className='border-secondary-subtle p-2 mx-1 rounded' id="endTime" />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                    <div className="d-flex justify-content-around" >
                        <div>
                            <Button className="btnBack ">Submit</Button>
                        </div> &nbsp;
                        <div>
                            <Button className="btnBack ">Clear</Button>
                        </div>
                    </div>
                </Row>
                {/* </div> */}
            </div>
        </Container>
    );
}

export default ScheduleGroup;