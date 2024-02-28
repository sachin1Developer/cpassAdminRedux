import React from "react";
import { Link } from "react-router-dom";
import { Button, Tooltip, Input, Container } from "reactstrap";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";





function CreateSegment() {

    return (
        <div className='d-flex mb-4'>
            <div className='container-fluid my-2'>
                <div className="mx-4">
                    <b>
                        <h3 className='pvmHeading text-slate-800'>Create Segment ✨
                            <div className='my-2'>
                                <Link to="/segment/viewSegmenet" style={{ textDecoration: 'none' }}>
                                    <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                                </Link> &nbsp;
                            </div>
                        </h3>
                    </b>
                    <Container>
                        <div className="d-flex" style={{ justifyContent: 'center' }}>
                            <TableContainer className="d-flex" >
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow className='bodyColor'>
                                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Group Name : </TableCell>
                                            <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                                <Input type="text" className=" border-secondary w-50" placeholder="Group Name" />
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        </div>
                    </Container>
                    <div className="d-flex mt-5 " style={{ justifyContent: 'center' }}>
                        <div>
                            <Button className="btnBack ">Submit</Button>
                        </div> &nbsp;
                        <div>
                            <Button className="btnBack ">Clear</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateSegment;