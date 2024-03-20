import React, { useState } from 'react'
import Heading from '../../../components/header/Heading'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import SelectInput from '../../../components/SelectInput'

export default function CreateCamp() {
    const [name, setname] = useState('')
    const [priority, setpriority] = useState(1)
    const [dailyLimit, setDailyLimit] = useState(-1)
    const [recycle, setrecycle] = useState(1)
    const [policy, setpolicy] = useState(1)
    const [checkUrl, setcheckUrl] = useState(1)
    const [dateTabs, setDateTabs] = useState(0)
    const [startdate, setstartdate] = useState('')
    const [endDate, setendDate] = useState('')
    const [startHour, setstartHour] = useState('')
    const [endHour, setendHour] = useState('')
    const [dayTabs, setDayTabs] = useState(0)
    const [days, setdays] = useState('')
    const [campType, setCampType] = useState('sms')


    const daysEntry = (event) => {
        const { value, checked } = event.target;
        // let { days } = this.state;

        let newDays = '';
        let inserted = false;
        let removed = false;

        for (let i = 0; i < days?.length; i++) {
            const currentValue = days[i];
            if (parseInt(currentValue) > parseInt(value) && !inserted && checked) {
                newDays += value;
                inserted = true;
            }
            if (parseInt(currentValue) !== parseInt(value)) {
                newDays += currentValue;
            } else {
                removed = true; // Mark as removed
            }
        }

        // If value wasn't inserted and it wasn't removed (if it existed), add it to the end
        if (!inserted && !removed && checked && !newDays.includes(value)) {
            newDays += value;
        }

        setdays(newDays)
    };

    return (
        <div className='mx-3'>
            <Heading name='Create Campaign'>

            </Heading>
            <div className="container w-75" >
                <CampInput name='Campaign Name'>
                    <input type="text" value={name} onChange={(event) => setname(event.target.value)} />
                </CampInput>
                <CampInput name='Campaign Priority'>
                    <input type="range" value={priority} min={1} max={10} onChange={(event) => setpriority(event.target.value)} />
                </CampInput>
                <CampInput name='Daily Limit'>
                    <input type="number" value={dailyLimit} min={-1} onChange={(event) => setDailyLimit(event.target.value)} />
                </CampInput>
                <CampInput name='Campaign Re-Cycle'>
                    <select value={recycle} onChange={(event) => setrecycle(event.target.value)}>
                        <option value={1} >Non-Recycle</option>
                        <option value={2} >Recycle</option>
                    </select>
                </CampInput>
                <CampInput name='Select Policy' >
                    <select value={policy} onChange={(event) => setpolicy(event.target.value)}>
                        <option value={1} >DEFAULT</option>
                    </select>
                </CampInput>
                <CampInput name='Check URL' >
                    <select value={checkUrl} onChange={(event) => setcheckUrl(event.target.value)}>
                        <option value={1} >No Hit</option>
                        <option value={2} >PRE</option>
                        <option value={3} >POST</option>
                    </select>
                </CampInput>
                <CampInput name='Date Schedular' >
                    <Box sx={{ width: '50%' }}>
                        <Box sx={{}}>
                            <Tabs value={dateTabs} onChange={(event, newValue) => { setDateTabs(newValue) }} aria-label="basic tabs example">
                                <Tab label="Full Hours" {...a11yProps(0)} />
                                <Tab label="Specific Hours" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={dateTabs} index={0}>
                            <div className='d-flex flex-column'>
                                <span>
                                    <label htmlFor="">Start Date</label>
                                    <input type="date" value={startdate} onChange={(event) => setstartdate(event.target.value)} />
                                </span>
                                <span>
                                    <label htmlFor="">End Date</label>
                                    <input type="date" value={endDate} onChange={(event) => setendDate(event.target.value)} />
                                </span>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={dateTabs} index={1}>
                            <div className='d-flex flex-column'>
                                <span>
                                    <label htmlFor="">Start Date</label>
                                    <input type="date" value={startdate} onChange={(event) => setstartdate(event.target.value)} />
                                </span>
                                <span>
                                    <label htmlFor="">End Date</label>
                                    <input type="date" value={endDate} onChange={(event) => setendDate(event.target.value)} />
                                </span>
                                <span>
                                    <label htmlFor="">Start Hour</label>
                                    <input type="time" value={startHour} onChange={(event) => setstartHour(event.target.value)} />
                                </span>
                                <span>
                                    <label htmlFor="">End Hour</label>
                                    <input type="time" value={endHour} onChange={(event) => setendHour(event.target.value)} />
                                </span>
                            </div>
                        </CustomTabPanel>
                    </Box>
                </CampInput>
                <CampInput name='Days Schedular' >
                    <Box sx={{ width: '50%' }}>
                        <Box sx={{}}>
                            <Tabs value={dayTabs} onChange={(event, newValue) => { setDayTabs(newValue) }} aria-label="basic tabs example">
                                <Tab label="Full Hours" {...a11yProps(0)} />
                                <Tab label="Specific Hours" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={dayTabs} index={0}>
                            Selected for All Day
                        </CustomTabPanel>
                        <CustomTabPanel value={dayTabs} index={1}>
                            <span className='d-flex flex-wrap justify-content-center'>
                                <SelectInput type="checkbox" id="monday" className='m-2' onChange={daysEntry} value="1" title="Monday"  />
                                <br />
                                <SelectInput type="checkbox" id="tuesday" onChange={daysEntry} value="2" title="Tuesday"  />
                                <br />
                                <SelectInput type="checkbox" id="wednesday" onChange={daysEntry} value="3" title="Wednesday"  />
                                <br />
                                <SelectInput type="checkbox" id="thursday" onChange={daysEntry} value="4" title="Thursday"  />
                                <br />
                                <SelectInput type="checkbox" id="friday" onChange={daysEntry} value="5" title="Friday"  />
                                <br />
                                <SelectInput type="checkbox" id="saturday" onChange={daysEntry} value="6" title="Saturday"  />
                                <br />
                                <SelectInput type="checkbox" id="sunday" onChange={daysEntry} value="7" title="Sunday"  />
                            </span>
                        </CustomTabPanel>
                    </Box>
                </CampInput>
                <CampInput name='Campaign Type' >
                    <Box sx={{ width: '50%' }}>
                        <Box sx={{}}>
                            <Tabs value={campType} onChange={(event, newValue) => { setCampType(newValue) }} aria-label="basic tabs example">
                                <Tab label="sms" {...a11yProps('sms')} />
                                <Tab label="obd" {...a11yProps('obd')} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={campType} index={0}>
                            
                        </CustomTabPanel>
                        <CustomTabPanel value={campType} index={1}>
                           
                        </CustomTabPanel>
                    </Box>
                </CampInput>
            </div>
        </div>
    )
}

const CampInput = ({ children, name }) => {
    return (
        <div className="d-flex justify-content-between align-items-center my-2 ">
            <label htmlFor="name" className="fw-bold">{name} : </label>&nbsp;
            {children}
        </div>
    )
}

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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}