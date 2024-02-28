import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Input, Row, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';






function AddProductCode() {

    return (
        <div className='d-flex'>
            <div className='container-fluid my-2'>
                <div className='d-flex justify-content-between my-2 mx-4'>
                    <h3 className='fw-bold'>Add Product Code ✨</h3>
                    <div className="d-flex justify-content-center">
                    <Link to="/productManagement">
                            <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                        </Link>
                    </div>
                </div>
                <div className=" mx-2">
                    {/* <b>
                        <h3 className='pvmHeading text-slate-800'>Add Product Code ✨ </h3>
                        <div className="d-flex justify-content-center">
                            <Link to="/productManagement/viewProductCode">
                                <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                            </Link>
                        </div>
                    </b> */}
                    <Row className="d-flex">
                        <div className="d-flex container-fluid ">
                            <Col style={{ display: 'flex', justifyContent: 'space-around', padding: '1em' }}>
                                <div>
                                    <TableContainer className="d-flex" >
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>Product Code : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <input type="number" className="form-control border-secondary" id="listTxt" />
                                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter Ony Numeric Value </label>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>Upload File : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <input type="file" accept='.wav' className="form-control border-secondary" id="listTxt" />
                                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .wav </label>
                                                    </TableCell>
                                                </TableRow>

                                            </TableHead>
                                        </Table>
                                    </TableContainer>
                                    <div className="d-flex" style={{ justifyContent: 'center' }}>
                                        <div>
                                            <Button className="btnBack ">Submit</Button>
                                        </div> &nbsp;
                                        <div>
                                            <Button className="btnBack ">Clear</Button>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                        </div>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default AddProductCode;