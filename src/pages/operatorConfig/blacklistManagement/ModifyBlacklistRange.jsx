import React, { useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, MenuItem, Tab, Tabs, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlacklistName, modifyBlacklistManagement } from './slice/BlacklistManagement';
import CommanButton from '../../../components/CommanButton';



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
const startRangeId = "startRangeId";
const endRangeId = "endRangeId"

function ModifyBlacklistRange() {
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)

    const data = useLocation();
    // console.log(data.state.data)

    const [value, setValue] = useState(1);
    const [rangeName, setRangeName] = useState(data.state.data?.rangeName);
    const [countryCode, setCountryCode] = useState(data.state.data?.countryCode);
    const [startRange, setStartRange] = useState(data.state.data?.startsAt);
    const [endRange, setEndRange] = useState(data.state.data?.endsAt);
    const [result, setResult] = useState("");
    const [blacklisName, setBlacklisName] = useState([]);
    // const [blacklistRangeResp, setBlacklistRangeResp] = useState()

    const getblacklistName = () => {
        dispatch(getBlacklistName(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setBlacklisName(resp?.payload?.data);
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('error while getting list');
            });
    }


    useEffect(() => {
        getblacklistName()
    }, [])



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

    const checkValues = () => {
        let flag = false;
        if (countryCode === "") {
            flag = true
            toast.error("Please Enter Country Code", {
                toastId: countryCodeId
            })
        }
        else if (startRange === "") {
            flag = true
            toast.error("Please Enter Start Range", {
                toastId: startRangeId
            })
        }
        else if (endRange === "") {
            flag = true
            toast.error("Please Enter End Range", {
                toastId: endRangeId
            })
        }
        return flag;
    }



    const onSubmit = () => {
        let check = checkValues();
        // console.log(check)
        let rangeId = data.state.data?.rangeId;

        if (check === false) {
            let data = {
                "startsAt": startRange,
                "endsAt": endRange,
                "hlrId": 1,
                "countryCode": countryCode,
                "rangeName": rangeName,
                "rangeType": "B",
                "rangeOwner": "A"
            }

            dispatch(modifyBlacklistManagement({ token: token, id: rangeId, data: data }))
                .then((resp) => {
                    if (resp?.payload?.status === 'BlackList saved successfully') {
                        toast.success('BlackList saved successfully');
                    } else {
                        toast.success('Internal server error')
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("error while saving");
                });
        }

    }


    const clearText = () => {
        setCountryCode(data.state.data?.countryCode);
        setStartRange(data.state.data?.startsAt);
        setEndRange(data.state.data?.endsAt)
    }



    return (
        <Container>
            <div>

                <div className=' d-flex justify-content-between my-2 align-items-center'>
                    <h4 className='fw-bold mx-2'>Modify Blacklist ✨
                    </h4>
                    <div className='d-flex align-items-center'>
                        <Link to='/operatorConfig/blacklistManagemment/manageBlacklist'>
                            <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                        </Link>
                    </div>
                </div>

                <div className='d-flex container justify-content-center '>

                    <Row>
                        <Col sm={4} className='d-flex flex-column'>
                            <TextField className='my-2' aria-readonly id="outlined-basic" type='text' label="Range Name" variant="outlined" value={rangeName} />
                            <TextField className='my-2' id="outlined-basic" type='number' label="Country Code" variant="outlined" value={countryCode} onChange={handleCountryCode} />
                        </Col>
                        <Col sm={4}>
                            <TextField className='my-2' id="outlined-basic" type='number' label="Start Range" variant="outlined" value={startRange} onChange={handleStartRnage} />
                            <TextField className='my-2' id="outlined-basic" type='number' label="End Range" variant="outlined" value={endRange} onChange={handleEndRange} />
                        </Col>
                    </Row>

                </div>
                <div className='d-flex justify-content-center my-4'>
                    <CommanButton className='btnSend mx-4' onClick={onSubmit}>Add Range</CommanButton>
                    <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
                </div>
            </div>
        </Container >
    );


}

export default ModifyBlacklistRange;