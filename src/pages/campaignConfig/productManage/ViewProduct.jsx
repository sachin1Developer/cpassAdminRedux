import React from "react";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";






function ViewProduct() {

    return (
        <div className='d-flex mb-4'>
            <div className='container-fluid my-2'>
                <div className="mx-4">
                    <b>
                        <h3 className='pvmHeading text-slate-800'>View Product ✨
                            <div className='my-2'>
                                <Link to="/productManagement/addProduct" style={{ textDecoration: 'none' }}>
                                    <Button type="submit" className="btnBack mb-3" ><AddIcon /> Add Product </Button>
                                </Link> &nbsp;
                            </div>
                        </h3>
                    </b>
                    <TableContainer style={{ backgroundColor: '#d6d6f7' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className='bodyColor'>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Product Name</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>SMS Origination No.</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>SMS Text</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>OBD Origination Number</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Product Code</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                        Modify
                                    </TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;