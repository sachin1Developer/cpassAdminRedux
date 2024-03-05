import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, Redirect, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import CommanButton from '../../../components/CommanButton';
import { useDispatch, useSelector } from 'react-redux';
import { modifySubscriberRange } from './slice/SubscriberRange';
import BackDropLoader from '../../../components/loader/BackDropLoader';
import Heading from '../../../components/header/Heading';
import Loader from '../../../components/loader/Loader';


const nameRId = "nameId";
const countryCId = "ccId";
const startRId = "startRId";
const endsRId = "endsRId";

function ModifySubsRange() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state.token?.data?.token)
    const location = useLocation();

    const [rangeName, setRangeName] = useState(location.state.data?.rangeName);
    const [countryCode, setCountryCode] = useState(location.state.data?.countryCode);
    const [startRange, setStartRange] = useState(location.state.data?.startsAt);
    const [endRange, setEndRange] = useState(location.state.data?.endsAt);
    const [loading, setLoading] = useState(false)

    const handleRangeName = (e) => {
        const maxlength = 15;
        if (rangeName.length >= maxlength) {
            setRangeName(rangeName)
            toast.error("Maximum Length is 15", {
                toastId: nameRId
            })
        }
        else {
            setRangeName(e.target.value)
        }
    }

    const handleStartRange = (e) => {
        const maxlength = 11;
        if (e.target.value.length > maxlength) {
            setStartRange(startRange)
            toast.error("Maximum Length is 11", {
                toastId: startRId
            })
        }
        else {
            setStartRange(e.target.value)
        }
    }

    const handleEndRange = (e) => {
        const maxlength = 11;
        setEndRange(endRange)
        if (e.target.value.length > maxlength) {
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


    const onsubmit = () => {
        setLoading(true)
        let rangeId = location.state.data?.rangeId;
        // console.log(rangeId)
        let response = {
            "startsAt": startRange,
            "countryCode": countryCode,
            "rangeName": rangeName,
            "endsAt": endRange
        }
        dispatch(modifySubscriberRange({ data: response, id: rangeId, token: token }))
            .then((resp) => {
                console.log(resp)
                if (resp?.payload?.status === 200) {
                    navigate("/operatorConfig/viewSubscriberRange")
                }
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
                setLoading(false)
                toast.error('Error while submiting subscriber range');
            });
    }

    const clearText = () => {
        setRangeName(location.state.data?.rangeName);
        setCountryCode(location.state.data?.countryCode)
        setStartRange(location.state.data?.startsAt);
        setEndRange(location.state.data?.endsAt);
    }

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>

                <Heading name='Modify Range' >
                    <Link to='/operatorConfig/viewSubscriberRange' style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </Heading>

                <div className='m-auto fs-6 fw-medium w-50 p-2 shadow-lg mb-2  bg-body-tertiary rounded'>
                    <div className='d-flex justify-content-center my-2'>
                        <TextField id="outlined-basic" type='text' className='mx-4' label="Range Name" variant="outlined" value={rangeName} onChange={handleRangeName} />
                        <TextField id="outlined-basic" type='number' className='mx-4' label="Country Code" variant="outlined" value={countryCode} onChange={handleCountryCode} />
                    </div>
                    <div className='d-flex justify-content-center my-2'>
                        <TextField id="outlined-basic" type='number' className='mx-4' label="Start Range " variant="outlined" value={startRange} onChange={handleStartRange} />
                        <TextField id="outlined-basic" type='number' className='mx-4' label="End Range" variant="outlined" value={endRange} onChange={handleEndRange} />
                    </div>
                    <span className='d-flex justify-content-center  m-3'>
                        <CommanButton className='btnSend mx-4' onClick={onsubmit} >Modify Range</CommanButton>
                        <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
                    </span>
                </div>
                <BackDropLoader opener={loading} />
            </div>
        );
    }


}

export default ModifySubsRange;