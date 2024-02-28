import React, { useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Box, Tab, Tabs, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import callApi from '../../../serviceApi/CallApi';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import ViewProduct from './ViewProduct';
import ViewProductCode from './ViewProductCode';


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






function ManageProduct() {
    const location = useLocation()
    console.log(location)

    const [tabsValue, setTabsValue] = useState(parseInt(location.state) || 0);

    const handleTabs = (event, valueNew) => {
        setTabsValue(valueNew);
    };

    return (

        <Container>
            <div>
                <b>
                    <h3 className='pvmHeading text-slate-800'>Product Management ✨
                    </h3>
                </b>
            </div>
            <div className='d-flex container '>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: '800' }}>
                        <Tabs value={tabsValue} onChange={handleTabs} aria-label="basic tabs example">
                            <Tab style={{ fontWeight: '700' }} label="Product" {...a11yProps(0)} />
                            <Tab style={{ fontWeight: '700' }} label="Product Code" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabsValue} index={0} >
                        <ViewProduct />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabsValue} index={1}>
                        <ViewProductCode />
                    </CustomTabPanel>
                </Box>

            </div>
        </Container>


    );
}


export default ManageProduct;