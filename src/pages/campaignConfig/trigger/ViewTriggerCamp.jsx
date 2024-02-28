import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Input, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";






function ViewTriggerCamp() {

    return (
        <Container>
            <div className=' d-flex justify-content-between'>
                <b> <h3 className='pvmHeading text-slate-600'>View Trigger Campaign ✨
                    <div className='my-2'>
                        <Link to="/triggerCampaign/groupTriggerCampaign" style={{ textDecoration: 'none' }}>
                            <Button type="submit" className="btnBack mb-3" ><AddIcon /> Group Trigger Campaign </Button>
                        </Link> &nbsp;
                        <Link to="/triggerCampaign/createTriggerCampaign" style={{ textDecoration: 'none' }}>
                            <Button type="submit" className="btnBack mb-3" ><AddIcon /> Create Trigger Campaign </Button>
                        </Link> &nbsp;
                    </div>
                </h3>
                </b>
            </div>
            <div>
                {/* <TableContainer style={{ backgroundColor: '#d6d6f7' }}>
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
                    </TableContainer> */}
            </div>
        </Container>
    );
}

export default ViewTriggerCamp;