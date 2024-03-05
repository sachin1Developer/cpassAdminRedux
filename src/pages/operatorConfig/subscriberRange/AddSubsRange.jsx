import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, MenuItem, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import CommanButton from '../../../components/CommanButton';
import { useDispatch, useSelector } from 'react-redux';
import { addSubscriberRange, viewSubscriberRange } from './slice/SubscriberRange';
import BackDropLoader from '../../../components/loader/BackDropLoader';
import Heading from '../../../components/header/Heading';
import Loader from '../../../components/loader/Loader';


const nameRId = "nameId";
const countryCId = "ccId";
const startRId = "startRId";
const endsRId = "endsRId";
const submitrange = "submitRange";

function AddSubsRange() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)
    const [rangeName, setRangeName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [startRange, setStartRange] = useState("");
    const [endRange, setEndRange] = useState("")
    const [rangeData, setRangeData] = useState("");
    const [existRange, setExistRange] = useState()
    const [loading, setLoading] = useState(true)
    const [backdrop, setBackdrop] = useState(false)

    let getRangeNumber = () => {
        setLoading(true)
        dispatch(viewSubscriberRange(token))
            .then((resp) => {
                console.log(resp)
                if (resp?.payload?.status === 200) {
                    setExistRange(resp?.payload?.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                toast.error('Error while fetching subscriber range list');
            });
    }

    useEffect(() => {
        getRangeNumber()
    }, [])


    const checkRange = () => {
        if (rangeName === "") {
            toast.error("Please Enter Range Name", {
                toastId: nameRId
            })
        }
        else if (countryCode === "") {
            toast.error("Please Enter Country Code", {
                toastId: countryCId
            })
        }
        else if (startRange === "") {
            toast.error("Please Enter Start Range", {
                toastId: startRId
            })
        }
        else if (endRange === "") {
            toast.error("Please Enter End Range", {
                toastId: endsRId
            })
        }
    }


    const onSubmit = () => {
        checkRange();
        
        let responce = {
            "startsAt": startRange,
            "endsAt": endRange,
            "hlrId": 1,
            "countryCode": countryCode,
            "rangeName": rangeName,
            "rangeType": "A",
            "rangeOwner": "O"
        }
        if (startRange != "" && startRange != null) {
            if (endRange != "" && endRange != null) {
                if (endRange > startRange) {
                    setEndRange(endRange);
                    let flag = false
                    existRange.map((value) => {
                        if (rangeName === value?.rangeName) {
                            flag = true
                            toast.error("This range name is already exist", {
                                toastId: nameRId
                            })
                        }
                    })
                    if (flag === false) {
                        setRangeName(rangeName)
                        setBackdrop(true)
                        dispatch(addSubscriberRange({ token: token, data: responce }))
                            .then((resp) => {
                                if (resp?.payload?.data === 'Operator saved successfully') {
                                    setBackdrop(false)
                                    setRangeData(resp.data);
                                    navigate('/operatorConfig/viewSubscriberRange')
                                } else {
                                    setBackdrop(false)
                                    toast.error('Internal server error')
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                setBackdrop(false)
                                toast.error('Error while submiting subscriber range', {
                                    toastId: nameRId
                                });
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
                checkRange()
            }
        }
        else {
            checkRange()
        }

    }

    const handleRangeName = (e) => {
        const maxlength = 15;
        // setRangeName(e.target.value)
        if (e.target.value.length >= maxlength) {
            setRangeName(rangeName)
            toast.error("Maximum Length is 15", {
                toastId: nameRId
            })
        }
        else {
            let flag = false
            existRange?.map((value) => {
                if (e.target.value === value?.rangeName) {
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

    const handleStartRange = (e) => {
        const maxlength = 11;
        setStartRange(e.target.value)
        if (startRange.length >= maxlength) {
            toast.error("Maximum Length is 11", {
                toastId: startRId
            })
            setStartRange(e.target.value)
        }
        else {
            setStartRange(e.target.value)
        }
    }

    const handleEndRange = (e) => {
        const maxlength = 11;
        setEndRange(e.target.value)
        if (endRange.length >= maxlength) {
            setEndRange(e.target.value)
            toast.error("Maximum Length is 11", {
                toastId: endsRId
            })
        }
        else {
            setEndRange(e.target.value)
        }
    }
    const handleCountryCode = (e) => {
        const maxlength = 7;
        setCountryCode(e.target.value)
        if (countryCode.length >= maxlength) {
            setCountryCode(countryCode)
            toast.error("Maximum Length is 7", {
                toastId: countryCId
            })
        }
        else {
            setCountryCode(e.target.value)
        }
    }


    const clearText = () => {
        setRangeName("");
        setCountryCode("")
        setStartRange("");
        setEndRange("");
    }

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='Add Range' >
                    <Link to='/operatorConfig/viewSubscriberRange' style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </Heading>
                <div className='m-auto fs-6 fw-medium w-50 p-2 shadow-lg mb-2  bg-body-tertiary rounded'>
                    <div className='d-flex justify-content-center my-2'>
                        <TextField id="outlined-basic" type='text' className='mx-4' label="Range Name" variant="outlined" autoFocus='true' value={rangeName} onChange={handleRangeName} />
                        {/* {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))} 
                                </TextField>*/}
                        <TextField id="outlined-basic" type='number' className='mx-4' label="Country Code" variant="outlined" value={countryCode} onChange={handleCountryCode} />
                    </div>
                    <div className='my-3 d-flex justify-content-center'>
                        <TextField id="outlined-basic" type='number' className='mx-4' label="Start Range" variant="outlined" value={startRange} onChange={handleStartRange} />
                        <TextField id="outlined-basic" type='number' className='mx-4' label="End Range" variant="outlined" value={endRange} onChange={handleEndRange} />
                    </div>
                    <div className='d-flex justify-content-center my-3'>
                        <CommanButton className='btnSend mx-4' onClick={onSubmit} >Add Range</CommanButton>
                        <CommanButton className='btnSend mx-4' onClick={clearText}>Clear</CommanButton>
                    </div>
                </div>
                <BackDropLoader opener={backdrop} />
            </div>
        );
    }


}

export default AddSubsRange;