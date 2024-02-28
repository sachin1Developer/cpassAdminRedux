import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Input, Row, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Box, Tab, Table, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextArea from "antd/es/input/TextArea";
import PropTypes from 'prop-types';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}





function TriggerCampStatus() {

    const [schedule, setSchedule] = useState();

    const handleSchedule = (event, newValue) => {
        setSchedule(newValue);
    };

    return (
        <Container>
            <div className="">
                <b>
                    <h3 className='pvmHeading text-slate-800'>Trigger Campaign Status ✨
                        {/* <div className='my-2'>
                                <Link to="/triggerCampaign/viewTriggerCampaign" style={{ textDecoration: 'none' }}>
                                    <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                                </Link> &nbsp;
                            </div> */}
                    </h3>
                    {/* <h5 className="mx-3">Add Template ✨</h5> */}
                </b>
                {/* <Row className="d-flex">
                        <div className="d-flex container-fluid ">
                            <Col style={{ display: 'flex', justifyContent: 'space-around', padding: '1em' }}>
                                <div>
                                    <TableContainer className="d-flex" >
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Campaign Name : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <Input type="text" className=" border-secondary" />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Trigger Type : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <div className="d-flex justify-content-between">
                                                            <div> <Input type="checkbox" className=" border-secondary" />SMS</div>
                                                            <div><Input type="checkbox" className=" border-secondary" />IVR</div>
                                                            <div><Input type="checkbox" className=" border-secondary" />USSD</div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Trigger Schedule : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <Box sx={{ width: '100%' }}>
                                                            <Box sx={{ borderBottom: 1, borderColor: 'rgb(77, 66, 204)', backgroundColor: '#d6d6f7' }}>
                                                                <div className="d-flex justify-content-around ">
                                                                    <Tabs value={schedule} onChange={handleSchedule} aria-label=""  >
                                                                        <Tab label="Full Hours"  {...a11yProps(0)} />
                                                                        <Tab label="Specific Hour" {...a11yProps(1)} />
                                                                    </Tabs>
                                                                </div>
                                                            </Box>
                                                            <CustomTabPanel value={schedule} index={0}>
                                                                <div className=" mb-3 justify-content-between">
                                                                    <div className="d-flex justify-content-around">
                                                                        <label className="w-75">Start Date  </label>
                                                                        <Input type="date" className=" border-secondary w-100" />
                                                                    </div>
                                                                    <div className="d-flex mt-3">
                                                                        <label className="w-75">End Date  </label>
                                                                        <Input type="date" className=" border-secondary w-100" />
                                                                    </div>
                                                                </div>
                                                            </CustomTabPanel>
                                                            <CustomTabPanel value={schedule} index={1}>
                                                                <div className=" mb-3 justify-content-between">
                                                                    <div className="d-flex justify-content-around">
                                                                        <label className="w-75">Start Date  </label>
                                                                        <Input type="date" className=" border-secondary w-100" />
                                                                    </div>
                                                                    <div className="d-flex mt-3">
                                                                        <label className="w-75">End Date  </label>
                                                                        <Input type="date" className=" border-secondary w-100" />
                                                                    </div>
                                                                </div>
                                                            </CustomTabPanel>

                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Policy : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <div className="col-auto">
                                                            <select className="form-select border-secondary" id="country"  >
                                                                <option >Select Policy</option>
                                                                <option value="Default">Default</option>
                                                            </select>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Blacklist Group : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <div className="d-flex align-items-center mx-5">
                                                            <i class="fa fa-times-circle-o " style={{ color: 'green' }} aria-hidden="true"></i>
                                                            No blacklist group found
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Trigger Type : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <div className="col-auto">
                                                            <select className="form-select border-secondary" id="country"  >
                                                                <option >Select Trigger Type</option>
                                                                <option value="Default">Default</option>
                                                            </select>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Origination No. : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <Input type="text" className=" border-secondary" />
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                        </Table>
                                    </TableContainer>
                                    <div className="d-flex mt-4" style={{ justifyContent: 'center' }}>
                                        <div>
                                            <Button className="btnBack ">Submit</Button>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                        </div>
                    </Row> */}
            </div>
        </Container>
    );
}

export default TriggerCampStatus;