import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";






function ViewProductCode() {

    return (
        <Container>
            <div className=''>
                <b>
                    <h3 className='pvmHeading text-slate-800'>View Product Code ✨
                        <div className='my-2'>
                            <Link to="/productManagement/addProductCode" style={{ textDecoration: 'none' }}>
                                <Button type="submit" className="btnBack mb-3" ><AddIcon />Add Product Code</Button>
                            </Link> &nbsp;
                        </div>
                    </h3>
                </b>
                <TableContainer style={{ backgroundColor: '#d6d6f7' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bodyColor'>
                                <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Segment Name</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Total Group</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>In Schedule</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>View</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Modify</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Delete</TableCell>
                                {/* <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                        <Input type="checkbox" />
                                    </TableCell> */}
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    );
}

export default ViewProductCode;