import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Col, Input, Row, Tooltip } from "reactstrap";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import OuterBox from "../../../custom/OuterBox";
// import { Box } from "@mui/system";
import { Box, Slider, SliderThumb, styled, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import MinDate from "../../../common/MinDate";
import TextArea from "antd/es/input/TextArea";
import callApi from "../../../serviceApi/CallApi";
import { toast } from "react-toastify";
import { Redirect, useLocation } from "react-router-dom/cjs/react-router-dom.min";




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

function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}



const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});




function AirbnbThumbComponent(props) {
    const { children, ...other } = [1, 2, 4, 5, 6, 8, 4, 2, 33, 21, 11, 17];
    return (
        <SliderThumb {...other}>
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    );
}

AirbnbThumbComponent.propTypes = {
    children: PropTypes.node,
};




function CreateCamp(props) {

    const [policies, setPolicies] = useState([]);
    const [networkType, setNetworkType] = useState([]);
    const [voice, setVoice] = useState([])
    const [groupSerives, setGroupSerives] = useState([])
    const [countryCode, setCountryCode] = useState([]);
    const [schedule, setSchedule] = useState(0);
    const [campType, setCampType] = useState("S");
    const [contactGrp, setContactGrp] = useState(0);
    const [scheduleDay, setScheduleDay] = useState(0);
    const days = [
        { day: "Mon", value: "1" },
        { day: "Tue", value: "2" },
        { day: "Wed", value: "3" },
        { day: "Thu", value: "4" },
        { day: "Fri", value: "5" },
        { day: "Sat", value: "6" },
        { day: "Sun", value: "7" }
    ];


    // "campaign_name": "Manish Chaudhary",
    // "priority": "1",
    // "dailyLimit": "" ,
    // "camp_recycle": "1",
    // "policy_id": "-99",
    // "url":"" ,
    // "startdate": "2023-08-16:07:00",
    // "enddate": "2023-08-29 16:08:00",
    // "startHour": "2500",
    // "endHour": "2400",
    // "day_of_week": "7",
    // "campaignType":"S",
    // {"message":"",
    // "obd":"",
    // "socialMedia" : "",
    // "ussd":"",
    // "media":""
    // }
    // "sms_origination_num" :"7355",
    // "voiceType" : "aditi",
    // "networkType":"CDMA",
    // "countryCode": "1876",
    // "contactGroup":"",
    // {
    // "number":"",
    // "group":"",
    // "file":"",
    // "external":"",
    // }










    // "campaign_message":"Yes how r u",
    // "userId": "1",
    // "created_by": "Admin",
    // "admin_msisdn":"7070270313",                                                                                                 
    // "promptType":"Single",
    // "interfacee": "S",
    // "obd_app": "-1",
    // "status": "N",
    // "balance": "5000",


    let history = useHistory();
    let location = useLocation();
    // console.log(location.pathname)
    const [id, setId] = useState(location.state?.data)
    const [modifyData, setModifyData] = useState()

    const [pathName, setPathName] = useState(location.pathname)


    const [campName, setCampName] = useState(modifyData?.campaign_name);
    const [priority, setPriority] = useState(modifyData?.priority);
    const [dailyLimit, setDailyLimit] = useState(modifyData?.sms_MAX_LIMIT);
    const [cycle, setCycle] = useState(modifyData?.camp_recycle);
    const [policy, setPolicy] = useState(modifyData?.policy_id);
    const [url, setUrl] = useState();
    const [startDate, setStartDate] = useState(modifyData?.startdate);
    const [endDate, setEndDate] = useState(modifyData?.enddate);
    const [startDateTime, setStartDateTime] = useState();
    const [endDateTime, setEndDateTime] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [specificDays, setSpecificDays] = useState([]);
    const [orginNumber, setOrginNumber] = useState();
    const [voiceType, setVoiceType] = useState();
    const [networkTypeVal, setNetworkTypeVal] = useState();
    const [codeCountry, setCodeCountry] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [result, setResult] = useState();
    const [campMsg, setCampMsg] = useState();
    const [number, setNumber] = useState();
    const [campDetailsbyId, setCampDetailsbyId] = useState()
    // const [, set] = useState(initialState)



    const getCampaignDetails = (id) => {
        callApi.getCampById(id)
            .then((resp) => {
                setModifyData(resp.data);
                setCampName(resp.data.campaign_name)
                setPriority(resp.data.priority)
                setCampMsg(resp.data.campaign_message)
                setStartDate(resp.data.startdate)
                setDailyLimit(resp.data.SMS_MAX_LIMIT)
                setEndDate(resp.data.enddate)
                setCampType(resp.data.interfacee)
                setOrginNumber(resp.data.sms_origination_num)
                setSpecificDays(resp.data.day_of_week)
                setCycle(resp.data.camp_recycle)
                setPolicy(resp.data.policy_id)


                // console.log(resp.data)
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching Corp list');
            });
    }



    const changedaysHandler = (event) => {
        let val = [];
        let week = document.getElementsByName('week');
        for (let i = 0; i < week.length; i++) {
            if (week[i].checked === true) {
                val.push(week[i].value);
                console.log("weeksss " + val.join(''));
                setSpecificDays(val.join(''));
            }
        }
    }

    const handleSchedule = (event, newValue) => {
        setSchedule(newValue);
    };
    const handleCampType = (event, newValue) => {
        setCampType(newValue);
    };

    const handleContactGrp = (event, newValue) => {
        setContactGrp(newValue);
    };
    const handleScheduleDay = (event, newValue) => {
        setScheduleDay(newValue)
    };

    const getPolicies = () => {
        return callApi.getAllPolicies();
    }
    const getCountryCode = () => {
        return callApi.getAllCountryCode();
    }

    const getAllNetworkType = () => {
        return callApi.getAllNetworkType();
    }
    const getVoice = () => {
        return callApi.getVoices();
    }
    const getGroupSegment = () => {
        return callApi.getAllSegment();
    }


    useEffect(() => {
        getPolicies()
            .then((resp) => {
                // console.log(resp.data)
                setPolicies(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getCountryCode()
            .then((res) => {
                // console.log(res.data)
                setCountryCode(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getAllNetworkType()
            .then((res) => {
                // console.log(res.data)
                setNetworkType(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getVoice()
            .then((res) => {
                // console.log(res.data)
                setVoice(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getAllNetworkType()
            .then((res) => {
                // console.log(res.data)
                setNetworkType(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getGroupSegment()
            .then((res) => {
                // console.log(res.data)
                setGroupSerives(res.data);
            })
            .catch((error) => {
                console.log(error);
            });


        if (pathName === "/campaign/createCampaign") {
            return
        }
        else if (pathName === "/campaign/modifyCampaign") {
            getCampaignDetails(id);
        }

    }, [])


    const createCamp = () => {
        let responce = {
            "campaign_name": campName,
            "campaign_message": campMsg,
            "startdate": startDate,
            "persanolized": "Off",
            "SMS_MAX_LIMIT": dailyLimit,
            "enddate": endDate,
            "startHour": "2500",
            "endHour": "2400",
            "userId": "1",
            "created_by": "Admin",
            "admin_msisdn": "7070270313",
            "promptType": "Single",
            "interfacee": campType,
            "sms_origination_num": orginNumber,
            "obd_app": "-1",
            "status": "P",
            "balance": "5000",
            "priority": priority,
            "day_of_week": specificDays,
            "camp_recycle": cycle,
            "policy_id": policy
        }

        // { campName, priority, dailyLimit, cycle, policy, url, startDate, endDate, specificDays, campType, campMsg, orginNumber, voiceType, networkTypeVal, codeCountry, contactNumber }

        console.log(responce)

        if (pathName === "/campaign/createCampaign") {
            callApi.createCamp(responce)
                .then((resp) => {
                    console.log(resp)
                    setResult(resp)
                    if (resp.status === 200) {
                        toast.success("Campaign Create Successfully")
                        history.push('/camapign/viewCamapign');
                    }
                    else (
                        toast.err(resp.data)
                    )
                }).catch((err) => {
                    console.log(err)
                })
        }
        else if (pathName === "/campaign/modifyCampaign") {
            callApi.updateCampaign(id, responce)
                .then((resp) => {
                    console.log(resp)
                    setResult(resp)
                    if (resp.status === 200) {
                        history.push('/camapign/viewCamapign');
                    }
                    else (
                        toast.err(resp.data)
                    )
                }).catch((err) => {
                    console.log(err)
                })

        }
    }


    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='d-flex mb-4 justify-content-center'>
            {
                result?.status === 200 && <Redirect to='/camapign/viewCamapign' />
            }
            <div className='container-fluid '>
                <div className="mx-4">
                    <b>
                        <h3 className='pvmHeading text-slate-800'>Create Campaign ✨
                            <div className='my-2'>
                                <Link to="/camapign/viewCamapign" style={{ textDecoration: 'none' }}>
                                    <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                                </Link> &nbsp;
                            </div>
                        </h3>
                    </b>

                    <div className="container ">
                        <Row className="my-2">
                            <Col sm={5}>
                                <label htmlFor="" className="form-label fw-semibold formLabel">Campaign Name - &nbsp;
                                    <span style={{ fontSize: '13px', color: 'rgb(103 103 103)' }}>This name identifies your campaign so you can re-use it in the future.</span>
                                </label>
                            </Col>
                            <Col sm={1}>:</Col>
                            <Col sm={5}>
                                <input type="text" className="d-flex form-control border-secondary" id="campName" placeholder='Enter Campaign Name' value={campName} required onChange={(e) => {
                                    setCampName(e.target.value)
                                }} />
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col sm={5}>
                                <label htmlFor="" className="form-label fw-semibold formLabel">Campaign Priority -&nbsp;
                                    <span style={{ fontSize: '13px', color: 'rgb(103 103 103)' }} >This priorities your campaign. </span>
                                </label>
                            </Col>
                            <Col sm={1}>:</Col>
                            <Col sm={5}>
                                <div className="d-flex ">
                                    <PrettoSlider className=""
                                        valueLabelDisplay="auto"
                                        aria-label="pretto slider"
                                        defaultValue={1}
                                        value={priority} onChange={(e) => {
                                            setPriority(e.target.value);
                                        }}
                                        max={10}
                                        min={1}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col sm={5}>
                                <label htmlFor="" className="form-label fw-semibold formLabel">Daily Limit: . &nbsp;
                                    <span style={{ fontSize: '13px', color: 'rgb(103 103 103)' }} >Select your daily limit - </span>
                                </label>
                            </Col>
                            <Col sm={1}>:</Col>
                            <Col sm={5}>
                                <input type="number" className="form-control border-secondary" id="dailyLimit" placeholder='Enter Daily Limit' value={dailyLimit}
                                    onChange={(e) => {
                                        setDailyLimit(e.target.value)
                                    }} />
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col sm={5}>
                                <label htmlFor="" className="form-label fw-semibold formLabel">Campaign Re-Cycle : &nbsp;
                                    <span style={{ fontSize: '13px', color: 'rgb(103 103 103)' }} >Select campaign re-cycle - </span>
                                </label>
                            </Col>
                            <Col sm={1}>:</Col>
                            <Col sm={5}>
                                <select className="form-select border-secondary" id="recycle" value={cycle} onChange={(e) => {
                                    setCycle(e.target.value)
                                }} >
                                    <option value="NA" >Select Campaign Re-cycle</option>
                                    <option value="0">NonRecycle</option>
                                    <option value="1">Reclycle</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col sm={5}>
                                <label htmlFor="" className="form-label fw-semibold formLabel">Select Policy : &nbsp;
                                    <span style={{ fontSize: '13px', color: 'rgb(103 103 103)' }}>Select your policy - </span>
                                </label>
                            </Col>
                            <Col sm={1}>:</Col>
                            <Col sm={5}>
                                <select className="form-select border-secondary" id="policy" value={policy} onChange={(e) => {
                                    setPolicy(e.target.value)
                                }} >
                                    <option>Select Policy</option>
                                    {policies.map((policy) => {
                                        return <option key={policy.policyId} value={policy.policyId} >{policy.policyName}</option>
                                    })
                                    }
                                </select>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col sm={5}>
                                <label htmlFor="" className="form-label fw-semibold formLabel">Check URL : &nbsp;
                                    <span style={{ fontSize: '13px', color: 'rgb(103 103 103)' }}>Select URL - </span>
                                </label>
                            </Col>
                            <Col sm={1}>:</Col>
                            <Col sm={5}>
                                <select className="form-select border-secondary" id="url" onChange={(e) => {
                                    setUrl(e.target.value)
                                }}  >
                                    <option value="-1">No Hit</option>
                                    <option value="1">PRE</option>
                                    <option value="2">POST</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col sm={5}>
                                <label htmlFor="" className="form-label fw-semibold formLabel">Date Schedule -&nbsp;
                                    <span id="emailHelp" className="form-text" >Set up days and time at which your campaign will run. Please notice that the platform does not make any call on sunday.</span></label>
                            </Col>
                            <Col sm={1}>:</Col>
                            <Col sm={5}>
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={schedule} onChange={handleSchedule} aria-label=""  >
                                            <Tab label="Full Hours"  {...a11yProps(0)} />
                                            <Tab label="Specific Hour" {...a11yProps(1)} />
                                        </Tabs>
                                    </Box>
                                    <CustomTabPanel value={schedule} index={0}>
                                        <div className=" mb-3 justify-content-between">
                                            <div className="d-flex justify-content-around">
                                                <label className="w-75">Start Date : </label>
                                                <Input type="date" className=" border-secondary w-100" id="startDate" value={startDate} onChange={(e) => {
                                                    setStartDate(e.target.value)
                                                }} />
                                            </div>
                                            <div className="d-flex mt-3">
                                                <label className="w-75">End Date :  </label>
                                                <Input type="date" className=" border-secondary w-100" id="endDate" value={endDate} onChange={(e) => {
                                                    setEndDate(e.target.value)
                                                }} />
                                            </div>
                                        </div>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={schedule} index={1}>
                                        <div className=" mb-3 justify-content-between">
                                            <div className="d-flex justify-content-around">
                                                <label className="w-75">Start Date : </label>
                                                <Input type="datetime-local" className=" border-secondary w-100" id="startDateTime" onChange={(e) => {
                                                    setStartDate(e.target.value)
                                                }} />
                                            </div>
                                            <div className="d-flex mt-3">
                                                <label className="w-75">End Date : </label>
                                                <Input type="datetime-local" className=" border-secondary w-100" id="endDateTime" onChange={(e) => {
                                                    setEndDateTime(e.target.value)
                                                }} />
                                            </div>
                                        </div>
                                    </CustomTabPanel>
                                </Box>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col sm={5}>
                                <label htmlFor="" className="form-label fw-semibold formLabel">Day Schedule : &nbsp;
                                    <span id="emailHelp" className="form-text" >Set up days at which your campaign will run. Please notice that the platform does not make any call on sunday.</span></label>
                            </Col>
                            <Col sm={1}>:</Col>
                            <Col sm={5}>
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={scheduleDay} onChange={handleScheduleDay} aria-label=""  >
                                            <Tab label="All Days"  {...a11yProps(0)} />
                                            <Tab label="Specific Day" {...a11yProps(1)} />
                                        </Tabs>
                                    </Box>
                                    <CustomTabPanel value={scheduleDay} index={0}>
                                        {/* <div className="d-flex justify-content-center mb-3 ">
                                            <div className="d-flex justify-content-center"> */}
                                                <label className="d-flex align-items-center" >
                                                    <i className="fa fa-check-square-o" aria-hidden="true" style={{ color: 'green' }}></i>&nbsp;
                                                    Selected All Days
                                                </label>
                                            {/* </div>
                                        </div> */}
                                    </CustomTabPanel>
                                    <CustomTabPanel value={scheduleDay} index={1}>
                                        <div className=" mb-3 justify-content-between flex-wrap">
                                            <div className="d-flex justify-content-around flex-wrap">
                                                {days.map((day) => {
                                                    return <label className="d-flex justify-content-around flex-wrap">
                                                        &nbsp;
                                                        <Input type="checkbox" style={{ borderColor: 'black', }} name="week" id="days" value={day.value} onChange={(e) => {
                                                            changedaysHandler()
                                                        }} />  {day.day} &nbsp;
                                                    </label>
                                                })}
                                            </div>
                                        </div>
                                    </CustomTabPanel>
                                </Box>
                            </Col>
                        </Row>
                    </div>



                    {/* <div className="conatiner-fluid">

                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Campaign Name . &nbsp;
                                <span className="form-text">This name identifies your campaign so you can re-use it in the future. Type your campaign name below - </span>
                            </label>
                            <div className="d-flex row g-3 justify-content-center">
                                <div className="col-3">
                                    <input type="text" className="d-flex form-control border-secondary" id="campName" placeholder='Enter Campaign Name' value={campName} required onChange={(e) => {
                                        setCampName(e.target.value)
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Campaign Priority . &nbsp;
                                <span className="form-text">This priorities your campaign - </span>
                            </label>
                            <div className="row g-3 justify-content-center">
                                <Box sx={{ width: 320 }}>
                                    <PrettoSlider
                                        valueLabelDisplay="auto"
                                        aria-label="pretto slider"
                                        defaultValue={1}
                                        min={1}
                                        max={10}
                                        value={priority} onChange={(e) => {
                                            setPriority(e.target.value);
                                        }} />
                                </Box>
                            </div>
                        </div>
                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Daily Limit: . &nbsp;
                                <span className="form-text">Select your daily limit - </span>
                            </label>
                            <div className="row g-3 justify-content-center">
                                <div className="col-3">
                                    <input type="number" className="form-control border-secondary" id="dailyLimit" placeholder='Enter Daily Limit' value={dailyLimit}
                                        onChange={(e) => {
                                            setDailyLimit(e.target.value)
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Campaign Re-Cycle : &nbsp;
                                <span className="form-text">Select campaign re-cycle - </span>
                            </label>
                            <div className="row g-3 justify-content-center">
                                <div className="col-3">
                                    <select className="form-select border-secondary" id="recycle" value={cycle} onChange={(e) => {
                                        setCycle(e.target.value)
                                    }} >
                                        <option value="NA" >Select Campaign Re-cycle</option>
                                        <option value="0">NonRecycle</option>
                                        <option value="1">Reclycle</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Select Policy : &nbsp;
                                <span className="form-text">Select your policy - </span>
                            </label>
                            <div className="row g-3 justify-content-center">
                                <div className="col-3">
                                    <select className="form-select border-secondary" id="policy" value={policy} onChange={(e) => {
                                        setPolicy(e.target.value)
                                    }} >
                                        <option>Select Policy</option>
                                        {policies.map((policy) => {
                                            return <option key={policy.policyId} value={policy.policyId} >{policy.policyName}</option>
                                        })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Check URL : &nbsp;
                                <span className="form-text">Select URL - </span>
                            </label>
                            <div className="row g-3 justify-content-center">
                                <div className="col-3">
                                    <select className="form-select border-secondary" id="url" onChange={(e) => {
                                        setUrl(e.target.value)
                                    }}  >
                                        <option value="-1">No Hit</option>
                                        <option value="1">PRE</option>
                                        <option value="2">POST</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Date Schedule : &nbsp;
                                <span id="emailHelp" className="form-text" >Set up days and time at which your campaign will run. Please notice that the platform does not make any call on sunday.</span></label>
                            <div className="row g-4 justify-content-center">
                                <div className="col-5">
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
                                                    <label className="w-75">Start Date : </label>
                                                    <Input type="date" className=" border-secondary w-100" id="startDate" value={startDate} onChange={(e) => {
                                                        setStartDate(e.target.value)
                                                    }} />
                                                </div>
                                                <div className="d-flex mt-3">
                                                    <label className="w-75">End Date :  </label>
                                                    <Input type="date" className=" border-secondary w-100" id="endDate" value={endDate} onChange={(e) => {
                                                        setEndDate(e.target.value)
                                                    }} />
                                                </div>
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={schedule} index={1}>
                                            <div className=" mb-3 justify-content-between">
                                                <div className="d-flex justify-content-around">
                                                    <label className="w-75">Start Date : </label>
                                                    <Input type="datetime-local" className=" border-secondary w-100" id="startDateTime" onChange={(e) => {
                                                        setStartDate(e.target.value)
                                                    }} />
                                                </div>
                                                <div className="d-flex mt-3">
                                                    <label className="w-75">End Date : </label>
                                                    <Input type="datetime-local" className=" border-secondary w-100" id="endDateTime" onChange={(e) => {
                                                        setEndDateTime(e.target.value)
                                                    }} />
                                                </div>
                                            </div>
                                        </CustomTabPanel>

                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Day Schedule : &nbsp;
                                <span id="emailHelp" className="form-text" >Set up days at which your campaign will run. Please notice that the platform does not make any call on sunday.</span></label>
                            <div className="row g-4 justify-content-center">
                                <div className="col-5">
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'rgb(77, 66, 204)', backgroundColor: '#d6d6f7' }}>
                                            <div className="d-flex justify-content-around ">
                                                <Tabs value={scheduleDay} onChange={handleScheduleDay} aria-label=""  >
                                                    <Tab label="All Days"  {...a11yProps(0)} />
                                                    <Tab label="Specific Day" {...a11yProps(1)} />
                                                </Tabs>
                                            </div>
                                        </Box>
                                        <CustomTabPanel value={scheduleDay} index={0}>
                                            <div className="d-flex justify-content-center mb-3 ">
                                                <div className="d-flex justify-content-center">
                                                    <label className="d-flex align-items-center" >
                                                        <i className="fa fa-check-square-o" aria-hidden="true" style={{ color: 'green' }}></i>&nbsp;
                                                        Selected All Days
                                                    </label>
                                                </div>
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={scheduleDay} index={1}>
                                            <div className=" mb-3 justify-content-between flex-wrap">
                                                <div className="d-flex justify-content-around flex-wrap">
                                                    {days.map((day) => {
                                                        return <label className="d-flex justify-content-around flex-wrap">
                                                            &nbsp;
                                                            <Input type="checkbox" style={{ borderColor: 'black', }} name="week" id="days" value={day.value} onChange={(e) => {
                                                                changedaysHandler()
                                                            }} />  {day.day} &nbsp;
                                                        </label>
                                                    })}
                                                </div>
                                            </div>
                                        </CustomTabPanel>

                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Campaign Type . &nbsp;
                                <span className="form-text">Select your campaign type below - </span>
                            </label>
                            <div className="row g-3 justify-content-center">
                                <div className="col-5">
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'rgb(77, 66, 204)', backgroundColor: '#d6d6f7' }}>
                                            <div className="d-flex justify-content-around ">
                                                <Tabs value={campType} onChange={handleCampType} aria-label="">
                                                    <Tab label="SMS" {...a11yProps("S")} value="S" />
                                                    <Tab label="OBD" {...a11yProps(1)} value="O" />
                                                    <Tab label="SocialMedia" {...a11yProps(2)} value="" />
                                                    <Tab label="USSD" {...a11yProps(3)} />
                                                    <Tab label="Media" {...a11yProps(4)} />
                                                </Tabs>
                                            </div>
                                        </Box>
                                        <CustomTabPanel value={campType} index={"S"}>
                                            <div className="d-flex mb-3 justify-content-between">
                                                <span>Select SMS Type : </span>
                                                <Button className="btnBack" >Text</Button>
                                                <Button className="btnBack" >Hidden</Button>
                                                <Button className="btnBack" >Flash</Button>
                                            </div>
                                            <div className="d-flex">
                                                <span> Campaign Message : </span>
                                                <TextArea type="text" rows="2" className=" border-secondary w-100" required value={campMsg} onChange={(e) => {
                                                    setCampMsg(e.target.value)
                                                }} />
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
                                                <TextArea type="text" rows="2" className=" border-secondary w-100" id="message" required />
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={campType} index={4}>
                                            <div className="d-flex ">
                                                <span> Email From : </span>
                                                <input typw="text" className="form-control border-secondary" id="mail" />
                                            </div>
                                            <div className="d-flex mt-3">
                                                <span> Template : </span>
                                                <Button className="btnBack " >Select Message</Button>
                                            </div>
                                        </CustomTabPanel>
                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">
                                Orig Number : &nbsp;
                                <span className="form-text">Origination number - </span>
                            </label>
                            <div className="d-flex row g-3 justify-content-center">
                                <div className="col-auto ">
                                    <input type="number" className="form-control border-secondary " id="orginNumber" placeholder='Enter Origination Number' value={orginNumber} maxLength="14" onChange={(e) => {
                                        setOrginNumber(e.target.value)
                                    }} />
                                    <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}>
                                        *Max Length for Alpha-Numric Origination Number is '11' <br />
                                        *Max Length for Numric Origination Number is '15'
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Voice Type . &nbsp;
                                <span className="form-text">Select your voice type below - </span>
                            </label>
                            <div className="row g-3 justify-content-center">
                                <div className="col-3">
                                    <select className="form-select border-secondary" id="voiceType" value={voiceType} onChange={(e) => {
                                        setVoiceType(e.target.value)
                                    }}  >
                                        <option >Select Your Voice Type</option>
                                        <option value="aditi" >aditi</option>
                                        <option value="raveena">raveena</option>
                                        <option value="matthew">matthew</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Select network Type . &nbsp;
                                <span className="form-text">Select your network type below - </span>
                            </label>
                            <div className="row g-3 justify-content-center">
                                <div className="col-3">
                                    <select className="form-select border-secondary " id="networkType" onChange={(e) => {
                                        setNetworkTypeVal(e.target.value)
                                    }} >
                                        {networkType.map((network) => {
                                            return <option key={network.network_id} >{network.network_name}</option>
                                        })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Country Code : &nbsp;
                                <span className="form-text">Select your country code - </span>
                            </label>
                            <div className="row g-3 justify-content-center">
                                <div className="col-3">
                                    <select className="form-select border-secondary" id="countryCode" onChange={(e) => {
                                        setCodeCountry(e.target.value)
                                    }}  >
                                        {countryCode.map((country) => {
                                            return <option key={country.country_code} value={country.country_code} >{country.country_name}({country.country_code})</option>
                                        })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Contact Group : &nbsp;
                                <span className="form-text">Select your contact group - </span>
                            </label>
                            <div className="row g-3 justify-content-center">
                                <div className="col-6">
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'rgb(77, 66, 204)', backgroundColor: '#d6d6f7' }}>
                                            <div className="d-flex justify-content-around ">
                                                <Tabs value={contactGrp} onChange={handleContactGrp} aria-label="basic tabs example">
                                                    <Tab label="Number" {...a11yProps(0)} />
                                                    <Tab label="Group" {...a11yProps(1)} />
                                                    <Tab label="Upload" {...a11yProps(2)} />
                                                    <Tab label="External" {...a11yProps(3)} />
                                                </Tabs>
                                            </div>
                                        </Box>
                                        <CustomTabPanel value={contactGrp} index={0}>
                                            <TextArea type="text" rows="4" className=" border-secondary w-100" id="number" required onChange={(e) => {
                                                setNumber(e.target.value)
                                            }} />
                                        </CustomTabPanel>
                                        <CustomTabPanel value={contactGrp} index={1}>
                                            <select className="form-select border-secondary" id="group" onChange={(e) => {
                                                setContactNumber(e.target.value)
                                            }}  >
                                                <option value="">Service List</option>
                                                {groupSerives.map((service) => {
                                                    return <option key={service.segment_id} value={service.segment_name} >{service.segment_name}</option>
                                                })
                                                }
                                            </select>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={contactGrp} index={2}>
                                            <input type="file" className="form-control border-secondary" id="textFile" />
                                            <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.8rem', color: '#ff0202c7' }}> *Extension must be .csv</label>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={contactGrp} index={3}>
                                            External
                                        </CustomTabPanel>
                                    </Box>
                                    <div className="d-flex align-items-center mt-5">
                                        <div>
                                            <label htmlFor="" className="form-label fw-semibold formLabel">Select Product Category :
                                            </label>
                                        </div>
                                        <div className="mx-4 d-flex justify-content-center align-items-center"> <input type="radio" /><label htmlFor="" className="mx-2">None</label></div>
                                        <div className="mx-4 d-flex justify-content-center align-items-center">
                                            <input type="radio" /><label htmlFor="" className="mx-2" >Select Product</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Select Blacklist Groups : &nbsp;
                                <span className="form-text">Select blacklist group - </span>
                                <Button style={{ textDecoration: 'none', backgroundColor: 'white', border: 'none', color: 'black', fontWeight: 'bold' }}>
                                    <div className="d-flex align-items-center mx-5">
                                        <i className="fa fa-times-circle-o " style={{ color: 'green' }} aria-hidden="true"></i>
                                        Please create Blacklist group
                                    </div>
                                </Button>
                            </label>
                        </div>
                    </div> */}
                    <div className="d-flex mt-4" style={{ justifyContent: 'center' }}>
                        <div>
                            <Button className="btnBack" onClick={createCamp}>Submit</Button>
                        </div> &nbsp;
                        <div>
                            <Button className="btnBack ">Clear</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default CreateCamp;