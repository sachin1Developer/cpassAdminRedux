import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Input, Row, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TextArea from "antd/es/input/TextArea";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';





function AddProduct() {

    return (
        <div className='d-flex'>
            <div className='container-fluid my-2'>
                <div className='d-flex justify-content-between my-2 mx-4'>
                    <h3 className='fw-bold'>Add Product ✨</h3>
                    <div className="d-flex justify-content-center">
                        <Link to="/productManagement">
                            <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                        </Link>
                    </div>
                </div>
                <div className=" mx-2">
                    <Row className="d-flex">
                        <div className="d-flex container-fluid ">
                            <Col style={{ display: 'flex', justifyContent: 'space-around', padding: '1em' }}>
                                <div>
                                    <TableContainer className="d-flex" >
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Product Name : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <Input type="text" className=" border-secondary" placeholder="Product Name" />
                                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: 'green' }}> * </label>
                                                    </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>OBD Origination Number : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <Input type="text" className=" border-secondary" />
                                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> Specify NA As Default </label>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>OBD Product Code : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <div className="d-flex">
                                                            <div >
                                                                <select className="form-select border-secondary text-center" id="country"  >
                                                                    <option value="">NA</option>
                                                                    {/* <option value="CDMA">CDMA</option> */}
                                                                </select>
                                                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> Specify NA As Default </label>
                                                            </div>
                                                            <div className="">
                                                                <Button className="btnBack ">Add</Button>
                                                            </div>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>SMS Origination No. : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <Input type="text" className=" border-secondary" />
                                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> Specify NA As Default </label>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>SMS Text : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <TextArea type="text" className=" border-secondary w-100" required/>
                                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> Specify NA As Default </label>
                                                    </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>SMS Keyword : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <Input type="text" className=" border-secondary" />
                                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> Specify NA As Default </label>
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

export default AddProduct;