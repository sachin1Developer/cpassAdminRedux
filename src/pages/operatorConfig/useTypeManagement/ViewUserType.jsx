import React, { useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link, Redirect, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Tab, Tabs, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ViewUser from './user/ViewUser';
import ViewVendor from './vendor/ViewVendor';



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

function ViewUserType() {

    const location = useLocation()
    // console.log(location)

    const [tabsValue, setTabsValue] = useState(parseInt(location.state?.value) || 0);

    const handleTabs = (event, valueNew) => {
        setTabsValue(valueNew);
    };




    return (
        <div className='mx-3'>
            <div>
                <b>
                    <h3 className='pvmHeading text-slate-800'>User Type Management ✨
                    </h3>
                </b>
            </div>
            <div className='d-flex container '>
                <Box sx={{ width: '100%' }} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: '800' }}>
                        <Tabs value={tabsValue} onChange={handleTabs} aria-label="basic tabs example">
                            <Tab style={{ fontWeight: '700' }} label="View User" {...a11yProps(0)} />
                            <Tab style={{ fontWeight: '700' }} label="View Vendor" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabsValue} index={0} className='d-flex justify-content-center' >
                        <ViewUser />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabsValue} index={1} className='d-flex justify-content-center' >
                        <ViewVendor />
                    </CustomTabPanel>
                </Box>

            </div>
        </div>
    );


}

export default ViewUserType;