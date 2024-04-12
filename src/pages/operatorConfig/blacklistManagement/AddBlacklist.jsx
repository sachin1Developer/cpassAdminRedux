import React, { useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGroupBlacklistMsisdn, addRangeBlacklist, getBlacklistName } from './slice/BlacklistManagement';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';



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




const nameRId = "nameId";
const countryCodeId = "countryCodeId";
const countryCId = "countryCId";
const rangeOwnerId = "rangeOwnerId";
const lengthId = "lengthId";
const submitrange = "submitrange";

function AddBlacklist() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state.token?.data?.token)
    const [tabsValue, setTabsValue] = useState(1);
    const [rangeName, setRangeName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [grpName, setGrpName] = useState("");
    const [grpcountryCode, setGrpCountryCode] = useState("");
    const [rangeFiles, setRangeFiles] = useState(null);
    const [startRange, setStartRange] = useState("");
    const [endRange, setEndRange] = useState("");
    const [result, setResult] = useState("");
    const [resp, setResp] = useState();
    const [blacklisName, setBlacklisName] = useState([]);
    const [errorResult, setErrorResult] = useState({});


    const handleTabs = (event, valueNew) => {
        setTabsValue(valueNew);
    };



    const getblacklistName = () => {
        dispatch(getBlacklistName(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setBlacklisName(resp?.payload?.data?.data);
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                // console.error(error);
                toast.error('error while get Blacklist name');
            });
    }


    useEffect(() => {
        getblacklistName()
    }, [])


    const handleRangeName = (e) => {
        const maxlength = 15;
        if (e.target.value.length >= maxlength) {
            setRangeName(rangeName)
            toast.error("Maximum Length is 15", {
                toastId: nameRId
            })
        }
        else {
            let flag = false
            blacklisName.map((value) => {
                if (e.target.value === value) {
                    flag = true
                    setRangeName(e.target.value)
                }
            })
            if (flag === false) {
                setRangeName(e.target.value)
            }
            else {
                toast.error("This range name is already exist", {
                    toastId: nameRId
                })
            }

        }
    }


    const handleGroupName = (e) => {
        let maxLength = 15;
        let flag = false
        if (e.target.value.length <= maxLength) {
            setGrpName(e.target.value)
            blacklisName.map((value) => {
                if (e.target.value === value) {
                    flag = true
                    setGrpName(e.target.value)
                }
            })
            if (flag === false) {
                setGrpName(e.target.value)
            }
            else {
                toast.error("This Range Name is Already Exist", {
                    toastId: nameRId
                })
            }
        }
        else if (e.target.value.length > maxLength) {
            toast.info("Max Length is 15 ", {
                toastId: lengthId
            })
        }
    }

    const handleGroupCountryCode = (e) => {
        let maxLength = 7
        let flag = false
        if ((e.target.value.length <= maxLength)) {
            setGrpCountryCode(e.target.value)
            if (e.target.value.startsWith("221")) {
                flag = true
                setGrpCountryCode(e.target.value)
            }
            else if (e.target.value.length === 3) {
                toast.error("Please enter valid country code", {
                    toastId: countryCId
                })
            }
        }
        else {
            toast.info("Maximum Length is 7 ", {
                toastId: countryCId
            })
        }
    }

    const handleCountryCode = (e) => {
        let maxLength = 7
        if (e.target.value.length <= maxLength) {
            setCountryCode(e.target.value)
        }
        else {
            toast.info("Maximum Length is 7 ", {
                toastId: countryCId
            })
        }
    }
    const handleStartRnage = (e) => {
        let maxLength = 12;
        if (e.target.value.length <= maxLength) {
            setStartRange(e.target.value)
        }
        else {
            toast.info("Maximun Length is 10 ", {
                toastId: countryCId
            })
        }
    }
    const handleEndRange = (e) => {
        let maxLength = 12;
        if (e.target.value.length <= maxLength) {
            setEndRange(e.target.value)
        }
        else {
            toast.info("Maximun Length is 10 ", {
                toastId: countryCId
            })
        }
    }

    const handleRangeFiles = (e) => {
        setRangeFiles(e.target.files[0])
    }


    const checkGroup = () => {
        let flag = false;
        if (grpName === "") {
            flag = true
            toast.error("Please Enter Group Range Name", {
                toastId: nameRId
            })
        }
        else if (grpcountryCode === "") {
            flag = true
            toast.error("Please Enter Country Code", {
                toastId: countryCodeId
            })
        }
        else if (rangeFiles === null) {
            flag = true
            toast.error("Please Choose Any File", {
                toastId: rangeOwnerId
            })
        }
        return flag;
    }


    const checkValues = () => {
        let flag = false;
        if (rangeName === "") {
            flag = true
            toast.error("Please Enter Range Name", {
                toastId: nameRId
            })
        }
        else if (countryCode === "") {
            flag = true
            toast.error("Please Enter Country Code", {
                toastId: countryCodeId
            })
        }

        return flag;
    }



    const addBlacklistRange = () => {
        let check = checkValues();

        if (check === false) {
            let formData = {
                "startsAt": startRange,
                "endsAt": endRange,
                "hlrId": 1,
                "countryCode": countryCode,
                "rangeName": rangeName,
                "rangeType": "B",
                "rangeOwner": "O"

            };
            if (startRange != "" && startRange != null) {
                if (endRange != "" && endRange != null) {
                    if (endRange > startRange) {
                        setEndRange(endRange);
                        let flag = false
                        blacklisName.map((value) => {
                            if (rangeName === value) {
                                flag = true
                                toast.error("This range name is already exist", {
                                    toastId: nameRId
                                })
                            }
                        })
                        if (flag === false) {
                            setRangeName(rangeName)

                            dispatch(addRangeBlacklist({ data: formData, token: token }))
                                .then((resp) => {
                                    if (resp.data.status === "success") {
                                        toast.success('BlackList range added successfully');
                                        navigate('/operatorConfig/blacklistManagemment/manageBlacklist')
                                    }
                                    else {
                                        toast.error("Internal server error");
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                    toast.error("Error While Adding Blaklist Range");
                                });
                        }
                    }
                    else {
                        // setEndRange(endRange)
                        toast.error("End range must be heigher than start range", {
                            toastId: submitrange
                        })
                    }
                }
                else {
                    checkValues()
                }
            }
            else {
                checkValues()
            }

        }
    }



    const addGroupBlacklist = () => {
        let check = checkGroup();

        if (check === false) {
            let formData = null;
            formData = new FormData();
            formData.append('rangeName', grpName);
            formData.append('countryCode', grpcountryCode);
            formData.append('rangeOwner', 'O');
            formData.append('file', rangeFiles);

            dispatch(addGroupBlacklistMsisdn({ data: formData, token: token }))
                .then((resp) => {
                    if (resp?.payload?.data === "BlackList saved successfully") {
                        toast.success('BlackList saved successfully');
                        navigate('/operatorConfig/blacklistManagemment/manageBlacklist')
                    }
                    else {
                        toast.error("Error While Adding Blaklist Range");
                    }
                })
                .catch((error) => {
                    // console.error(error);
                    toast.error(error.response.data);
                });
        }

    }


    const clearText = () => {
        setRangeName("");
        setGrpName("");
        setGrpCountryCode("");
        setCountryCode("");
        setStartRange("");
        setEndRange("");
        setRangeFiles(null);
    }



    return (
        <div className='mx-3'>
            <Heading name='Add Blacklist'>
                <Link to='/operatorConfig/blacklistManagemment/manageBlacklist' style={{ textDecoration: 'none' }}>
                    <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ManageHistoryIcon />Manage Blacklist</CommanButton>
                </Link>
                {/* <Link to='/operatorConfig/blacklistManagemment/searchBlacklist' style={{ textDecoration: 'none' }} >
                    <CommanButton type="submit" className="btnBack mb-3 mx-2  d-flex align-items-center" ><ManageSearchIcon />Search Blacklist</CommanButton>
                </Link> */}
            </Heading>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: '800' }}>
                    <Tabs value={tabsValue} onChange={handleTabs} aria-label="basic tabs example">
                        <Tab style={{ fontWeight: '700' }} label="Blacklist Range" {...a11yProps(0)} />
                        <Tab style={{ fontWeight: '700' }} label="Blacklist Group" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabsValue} index={0} >
                    <Row className='d-flex justify-content-center'>
                        <Col sm={4} className='d-flex flex-column'>
                            <TextField className='my-2' id="outlined-basic" type='text' label="Range Name" variant="outlined" autoFocus='true' value={rangeName} onChange={handleRangeName} />
                            <TextField className='my-2' id="outlined-basic" type='number' label="Country Code" variant="outlined" value={countryCode} onChange={handleCountryCode} />
                        </Col>
                        <Col sm={4}>
                            <TextField className='my-2' id="outlined-basic" type='number' label="Start Range" variant="outlined" value={startRange} onChange={handleStartRnage} />
                            <TextField className='my-2' id="outlined-basic" type='number' label="End Range" variant="outlined" value={endRange} onChange={handleEndRange} />
                        </Col>
                    </Row>
                </CustomTabPanel>
                <CustomTabPanel value={tabsValue} index={1}>
                    <div className='d-flex flex-column'>
                        <TextField className='my-2' id="outlined-basic" type='text' label="Range Name" variant="outlined" autoFocus='true' value={grpName} onChange={handleGroupName} />
                        <TextField className='my-2' id="outlined-basic" type='number' label="Country Code" variant="outlined" value={grpcountryCode} onChange={handleGroupCountryCode} />
                        <Input className='my-2' id="outlined-basic" type='file' accept='.txt' label="Range Owner" variant="standard" onChange={handleRangeFiles} />
                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension must be .txt of Range Owner</label>
                    </div>
                </CustomTabPanel>
            </Box>

            <div className='d-flex justify-content-center my-4'>
                <CommanButton className='btnSend mx-4' onClick={() => { if (tabsValue === 0) { addBlacklistRange() } else { addGroupBlacklist() } }}>Add Range</CommanButton>
                <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
            </div>
        </div>
    );


}

export default AddBlacklist;