import React from "react";
import { Link } from "react-router-dom";
import { Button, Input, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";






function ViewTemplate() {

    return (
        <div className='d-flex mb-4'>
            <div className='container-fluid my-2'>
                <div className="mx-4">
                    <b>
                        <h3 className='pvmHeading text-slate-800'>View Template ✨
                            <div className='my-2'>
                                <Link to="/templates/addTemplates" style={{ textDecoration: 'none' }}>
                                    <Button type="submit" className="btnBack mb-3" ><AddIcon /> Add Template </Button>
                                </Link> &nbsp;
                            </div>
                        </h3>
                    </b>
                    <TableContainer style={{ backgroundColor: '#d6d6f7' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className='bodyColor'>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Template Name</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Description</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Template</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Modify</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Delete</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                        <Input type="checkbox" />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default ViewTemplate;