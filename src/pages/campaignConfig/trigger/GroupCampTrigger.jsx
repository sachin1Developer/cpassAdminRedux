import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Input, Row, Tooltip } from "reactstrap";
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





function GroupTriggerCamp() {

    const [schedule, setSchedule] = useState();
    const [campType, setCampType] = useState();
    const [contactGrp, setContactGrp] = useState();

    const handleSchedule = (event, newValue) => {
        setSchedule(newValue);
    };
    const handleCampType = (event, newValue) => {
        setCampType(newValue);
    };

    const handleContactGrp = (event, newValue) => {
        setContactGrp(newValue);
    };



    return (
        <div className='d-flex mb-4'>
            <div className='container-fluid my-2'>
                <div className="mx-4">
                    <b>
                        <h3 className='pvmHeading text-slate-800'>Group Trigger Campaign ✨
                            <div className='my-2'>
                                <Link to="/triggerCampaign/viewTriggerCampaign" style={{ textDecoration: 'none' }}>
                                    <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                                </Link> &nbsp;
                            </div>
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
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Trigger Type : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <Box sx={{ width: '100%' }}>
                                                            <Box sx={{ borderBottom: 1, borderColor: 'rgb(77, 66, 204)', backgroundColor: '#d6d6f7' }}>
                                                                <div className="d-flex justify-content-around ">
                                                                    <Tabs value={campType} onChange={handleCampType} aria-label="">
                                                                        <Tab label="SMS" {...a11yProps(0)} />
                                                                        <Tab label="Flash" {...a11yProps(1)} />
                                                                        <Tab label="IVR" {...a11yProps(2)} />
                                                                        <Tab label="USSD" {...a11yProps(3)} />
                                                                    </Tabs>
                                                                </div>
                                                            </Box>
                                                            <CustomTabPanel value={campType} index={0}>
                                                                <div className="d-flex mb-3 justify-content-between">
                                                                    <span>Select SMS Type : </span>
                                                                    <Button className="btnBack" >Text</Button>
                                                                    <Button className="btnBack" >Hidden</Button>
                                                                    <Button className="btnBack" >Flash</Button>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <span> Campaign Message : </span>
                                                                    <TextArea type="text" rows="2" className=" border-secondary w-100" required />
                                                                </div>
                                                            </CustomTabPanel>
                                                            <CustomTabPanel value={campType} index={1}>
                                                                <div className="d-flex justify-content-center">
                                                                    <span> Select Flow : </span>
                                                                    <select className="form-select border-secondary" id="country"  >
                                                                        <option value="">Select One Flow</option>
                                                                    </select>
                                                                </div>
                                                                <div className="d-flex justify-content-around col-auto mt-4">
                                                                    <Button type="submit" className="btnBack mb-3" >Upload Prompts</Button>
                                                                    <Button type="submit" className="btnBack mb-3" >Select A Flow</Button>
                                                                </div>
                                                            </CustomTabPanel>
                                                            <CustomTabPanel value={campType} index={2}>
                                                                Social Media
                                                            </CustomTabPanel>
                                                            <CustomTabPanel value={campType} index={3}>
                                                                <div className="d-flex mb-3 justify-content-around">
                                                                    <span>Select SMS Type : </span>
                                                                    <div className="d-flex">
                                                                        <Button className="btnBack mx-2" >Session Based </Button>
                                                                        <Button className="btnBack mx-2" >Non Session Based</Button>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <span> Campaign Message : </span>
                                                                    <TextArea type="text" rows="2" className=" border-secondary w-100" required />
                                                                </div>
                                                            </CustomTabPanel>
                                                        </Box>
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
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '', display: 'flex', alignContent: 'center' }}>Blacklist Group : </TableCell>
                                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: '' }}>
                                                        <div className="d-flex align-items-center mx-5">
                                                            <i class="fa fa-times-circle-o " style={{ color: 'green' }} aria-hidden="true"></i>
                                                            No blacklist group found
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
            </div>
        </div>
    );
}

export default GroupTriggerCamp;