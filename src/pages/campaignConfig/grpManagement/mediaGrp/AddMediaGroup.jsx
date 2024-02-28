import React, { useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import { useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Modal } from 'react-bootstrap';
import { Box, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div className='d-flex'
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




function AddMediaGroup() {


    const [tabsValue, setTabsValue] = useState(0);

    const handleTabs = (event, valueNew) => {
        setTabsValue(valueNew);
    };


    // const [mobileGroupList, setMobileGroupList] = useState([]);

    const mobileGroupList = [
        {
            "groupId": "1784",
            "groupName": "TestGroup1",
            "totalMasisdn": "2",
            "status": "A",
            "createdDate": "2020-12-31",
            "inUsed": "No",
        },
        {
            "groupId": "1785",
            "groupName": "TestGroup2",
            "totalMasisdn": "2",
            "status": "A",
            "createdDate": "2020-12-31",
            "inUsed": "No",
        },
        {
            "groupId": "1786",
            "groupName": "TestGroup3",
            "totalMasisdn": "2",
            "status": "A",
            "createdDate": "2020-12-31",
            "inUsed": "No",
        },
    ]


    return (
        <Container>
            <div className=''>
                <b>
                    <h3 className='pvmHeading text-slate-800'>Add Media Group ✨
                        <div className='d-flex align-items-center '>
                            <Link to={{ pathname: '/groupManagement/groupManager', state: '1', }} style={{ textDecoration: 'none' }}>
                                <Button type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</Button>
                            </Link>
                        </div>
                    </h3>
                </b>
            </div>
            <div>
                <div className='container fs-6 fw-medium w-50'>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: '800' }}>
                            <Tabs value={tabsValue} onChange={handleTabs} aria-label="basic tabs example">
                                <Tab style={{ fontWeight: '700' }} label="Create New Group" {...a11yProps(0)} />
                                <Tab style={{ fontWeight: '700' }} label="Add Group To Campaign" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={tabsValue} index={0} >
                            <div className='d-flex flex-column'>
                                <TextField className='my-2' id="outlined-basic" type='text' label="Group Name" variant="outlined" autoFocus='true' />
                                <FormControl fullWidth className='my-2'>
                                    <InputLabel id="demo-simple-select-label">Select network type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={1}
                                        // error={!validate}    
                                        label="Select network Type"
                                        // onChange={handleRoleType}
                                        MenuProps={MenuProps} >
                                        <MenuItem value={1}>CDMA</MenuItem>
                                        <MenuItem value={2}>GSM</MenuItem>
                                    </Select>
                                </FormControl>
                                <Input className='my-2' id="outlined-basic" type='file' accept='.csv' label="Import File" variant="standard" />
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension must be .csv</label>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabsValue} index={1}>
                            <div className='d-flex flex-column'>
                                <FormControl fullWidth className='my-2'>
                                    <InputLabel id="demo-simple-select-label">Select Campaign</InputLabel>
                                    <Select autoFocus='true'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={1}
                                        // error={!validate}    
                                        label="Select Campaign"
                                        // onChange={handleRoleType}
                                        MenuProps={MenuProps} >
                                        <MenuItem value={1}>CDMA</MenuItem>
                                        <MenuItem value={2}>GSM</MenuItem>
                                    </Select>
                                </FormControl>
                                <Input className='my-2' id="outlined-basic" type='file' accept='.csv' label="Import File" variant="standard" />
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension must be .csv</label>
                            </div>
                        </CustomTabPanel>
                    </Box>
                </div>
                <div className='d-flex justify-content-center my-4'>
                    <Button className='btnSend mx-4' >Submit</Button>
                    <Button className='btnSend mx-4'  >Clear</Button>
                </div>
            </div>

        </Container>
    );
}


export default AddMediaGroup;

