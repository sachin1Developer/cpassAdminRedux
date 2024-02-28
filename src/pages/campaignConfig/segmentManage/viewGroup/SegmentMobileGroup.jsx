import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Button, Col, Container, Input, Row, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Box, Tab, Table, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


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




function SegmentMobileGroup() {

    const location = useLocation()
    console.log(location)

    const [tabsValue, setTabsValue] = useState(parseInt(location.state) || 0);

    const handleTabs = (event, valueNew) => {
        setTabsValue(valueNew);
    };





    return (
        <Container>
            <div className="d-flex justify-content-center flex-column">
                <div className="d-flex">
                    <b>
                        <h3 className='pvmHeading text-slate-800'>Add Mobile Group ✨ </h3>
                    </b>
                </div>
                <div className='d-flex justify-content-center '>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: '800' }}>
                            <Tabs value={tabsValue} onChange={handleTabs} aria-label="basic tabs example">
                                <Tab style={{ fontWeight: '700' }} label=" Create New Group" {...a11yProps(0)} />
                                <Tab style={{ fontWeight: '700' }} label="Add Group To Campaign" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={tabsValue} index={0} >
                            <TableContainer className="d-flex" >
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow className='bodyColor'>
                                            <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Group Name : </TableCell>
                                            <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                                <Input type="text" className=" border-secondary" placeholder="Analytics Name" />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow className='bodyColor'>
                                            <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Select Network Type : </TableCell>
                                            <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                                <select className="form-select border-secondary text-center" id="country"  >
                                                    <option value="GSM">GSM</option>
                                                    <option value="CDMA">CDMA</option>
                                                </select>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow className='bodyColor'>
                                            <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Import File : </TableCell>
                                            <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                                <input type="file" accept='.csv' className="form-control border-secondary" id="listTxt" />
                                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .csv </label>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabsValue} index={1}>
                            <TableContainer className="d-flex" >
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow className='bodyColor'>
                                            <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Select Campaign: </TableCell>
                                            <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                                <select className="form-select border-secondary text-center" id="country"  >
                                                    <option value="GSM">Campaign List</option>
                                                </select>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow className='bodyColor'>
                                            <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Import File : </TableCell>
                                            <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                                                <input type="file" accept='.csv' className="form-control border-secondary" id="listTxt" />
                                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .csv </label>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        </CustomTabPanel>
                    </Box>
                </div>
                <div className="d-flex justify-content-around" >
                    <Button className="btnBack ">Submit</Button>
                    <Button className="btnBack ">Clear</Button>

                </div>
            </div>



        </Container>
    );
}

export default SegmentMobileGroup;