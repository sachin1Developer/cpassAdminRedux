import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, MenuItem, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import CommanButton from '../../../components/CommanButton';
import { useDispatch, useSelector } from 'react-redux';
import { addSubscriberRange, viewSubscriberRange } from './slice/SubscriberRange';
import BackDropLoader from '../../../components/loader/BackDropLoader';


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
    const [loading, setLoading] = useState(false)
    const [backdrop, setBackdrop] = useState(false)

    useEffect(() => {
        setLoading(true)
        dispatch(viewSubscriberRange(token))
            .then((resp) => {
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
        setBackdrop(true)
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


    return (
        <div className='container'>
            {/* {
                rangeData === "Operator saved successfully" &&
                <Redirect to="/operatorConfig/viewSubscriberRange" />
            } */}
            <div>
                <div className=' d-flex justify-content-between my-2 align-items-center'>
                    <h4 className='fw-bold mx-2'>Add Range ✨
                    </h4>
                    <div className='mx-2'>
                        <Link to='/operatorConfig/viewSubscriberRange' style={{ textDecoration: 'none' }}>
                            <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                        </Link>
                    </div>
                </div>
                <div className='container fs-6 fw-medium w-50'>
                    <div className='text-left row'>
                        <div className='my-3 col'>
                            <TextField id="outlined-basic" type='text' label="Range Name" variant="outlined" autoFocus='true' value={rangeName} onChange={handleRangeName} />
                            {/* {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))} 
                            </TextField>*/}
                        </div>
                        <div className='my-3 col'>
                            <TextField id="outlined-basic" type='number' label="Country Code" variant="outlined" value={countryCode} onChange={handleCountryCode} />
                        </div>
                    </div>
                    <div className='text-left row'>
                        <div className='my-3 col'>
                            <TextField id="outlined-basic" type='number' label="Start Range" variant="outlined" value={startRange} onChange={handleStartRange} />
                        </div>
                        <div className='my-3 col'>
                            <TextField id="outlined-basic" type='number' label="End Range" variant="outlined" value={endRange} onChange={handleEndRange} />
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center my-4'>
                    <CommanButton className='btnSend mx-4' onClick={onSubmit} >Add Range</CommanButton>
                    <CommanButton className='btnSend mx-4' onClick={clearText}>Clear</CommanButton>
                </div>
            </div>
            <BackDropLoader opener={backdrop} />
        </div>
    );


}

export default AddSubsRange;