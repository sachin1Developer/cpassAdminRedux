import React, { useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link, Redirect, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Tab, Tabs, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ScheduleSegment from './ScheduleSegment';
import CheckModifySegment from './CheckModifySegment';



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div className='d-flex justify-content-center'
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

function AutoSegment() {

    const location = useLocation()
    // console.log(location)

    const [tabsValue, setTabsValue] = useState(parseInt(location.state) || 0);

    const handleTabs = (event, valueNew) => {
        setTabsValue(valueNew);
    };




    return (
        <Container>
            <div>
                <b>
                    <h3 className='pvmHeading text-slate-800'>Segment Automate ✨
                    </h3>
                </b>
            </div>
            <div className='d-flex container justify-content-center '>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: '800' }}>
                        <Tabs value={tabsValue} onChange={handleTabs} aria-label="basic tabs example">
                            <Tab style={{ fontWeight: '700' }} label="Schedule Segment" {...a11yProps(0)} />
                            <Tab style={{ fontWeight: '700' }} label="Check/Modify Segment" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabsValue} index={0} >
                        <ScheduleSegment />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabsValue} index={1}>
                        <CheckModifySegment />
                    </CustomTabPanel>
                </Box>

            </div>
        </Container>
    );


}

export default AutoSegment;