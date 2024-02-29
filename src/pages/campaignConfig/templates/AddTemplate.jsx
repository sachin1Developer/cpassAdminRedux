import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Input, Row, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Textarea } from "@mui/joy";
import CommanButton from "../../../components/CommanButton";
// import TextArea from "antd/es/input/TextArea";






function AddTemplate() {

    return (
        <div className='d-flex mb-4'>
            <div className='container-fluid my-2'>
                <div className="mx-4">
                    <div className=' d-flex justify-content-between my-2 align-items-center'>
                        <h4 className='fw-bold mx-2'>Dynamic Template System ✨</h4>
                        <div className='d-flex align-items-center'>
                            <Link to="/templates/viewTemplates" style={{ textDecoration: 'none' }}>
                                <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                            </Link>
                        </div>
                    </div>
                    <h5 className="mx-3">Add Template ✨</h5>
                    <Row className="d-flex">
                        <div className="d-flex container-fluid ">
                            <Col style={{ display: 'flex', justifyContent: 'space-around', padding: '1em' }}>
                                <div>
                                    <TableContainer className="d-flex" >
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Template Name : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <Input type="text" className=" border-secondary" />
                                                    </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Template Message : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <Textarea type="text" rows="1" className=" border-secondary w-100" required />
                                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> Specify NA As Default </label>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Template Description: </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <Textarea type="text" rows="1" className=" border-secondary w-100" required />
                                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> Specify NA As Default </label>
                                                    </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Voice Type : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        {/* <div className="d-flex"> */}
                                                        <div >
                                                            <select className="form-select border-secondary text-center" id="country"  >
                                                                <option value="">NA</option>
                                                                {/* <option value="CDMA">CDMA</option> */}
                                                            </select>
                                                            <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> Specify NA As Default </label>
                                                        </div>
                                                        <div className=" d-flex justify-content-end">
                                                            <Button className="btnBack ">Add</Button>
                                                        </div>
                                                        {/* </div> */}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className='bodyColor'>

                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Play Speed : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>

                                                        <select className="form-select border-secondary text-center" id="country"  >
                                                            <option value="">NA</option>
                                                            {/* <option value="CDMA">CDMA</option> */}
                                                        </select>
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

export default AddTemplate;