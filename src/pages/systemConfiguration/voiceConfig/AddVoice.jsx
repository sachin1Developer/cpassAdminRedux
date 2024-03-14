import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addVoice } from './slice/VoiceConfiguration';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';



const voicename = "voiceName"
function AddVoice() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state?.token?.data?.token)

    const [voiceName, setVoiceName] = useState("");
    const [awsName, setAwsName] = useState("");
    const [country, setCountry] = useState("");
    const [status, setStatus] = useState("");
    const maxLength = "15";

    const handleVoiceName = (e) => {
        setVoiceName(e.target.value)
        if (e.target.value !== "") {
            if (e.target.value.length >= maxLength) {
                toast.error("The max length is 15 ", {
                    toastId: voicename
                });
            }
            else {
                setVoiceName(e.target.value);
            }
        }
        else {
            toast.error("Please Enter Voice Name", {
                toastId: voicename
            });
        }
    }


    const handleAwsName = (e) => {
        // setAwsName(e.target.value)
        if (e.target.value !== "") {
            if (e.target.value.length >= maxLength) {
                toast.error("The max length is 15 ", {
                    toastId: voicename
                });
            }
            else {
                setAwsName(e.target.value);
            }
        }
        else {
            toast.error("Please Enter AWS Name", {
                toastId: voicename
            });
        }
    }

    const handleCountry = (e) => {
        // setCountry(e.target.value)
        if (e.target.value !== "") {
            if (e.target.value.length >= maxLength) {
                toast.error("The max length is 15 ", {
                    toastId: voicename
                });
            }
            else {
                setCountry(e.target.value);
            }
        }
        else {
            toast.error("Please Enter Country", {
                toastId: voicename
            });
        }
    }

    const handleStatus = (e) => {
        // setStatus(e.target.value)
        if (e.target.value !== "") {
            if (e.target.value.length >= maxLength) {
                toast.error("The max length is 15 ", {
                    toastId: voicename
                });
            }
            else {
                setStatus(e.target.value);
            }
        }
        else {
            toast.error("Please Enter Status", {
                toastId: voicename
            });
        }
    }



    const onSubmit = () => {
        let request = {
            "name": voiceName,
            "status": status,
            "aws_name": awsName,
            "country": country
        }
        console.log(request)
        dispatch(addVoice({ token: token, data: request }))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    toast.success('Added Successfully');
                    navigate('/systemConfiguration/voiceConfiguration')
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while creating');
            });

    }

    const clearText = () => {

    }

    return (
        <div className='mx-3'>
            <Heading name='Add Voice Type'>
                <Link to='/systemConfiguration/voiceConfiguration' style={{ textDecoration: 'none' }}>
                    <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </Heading>
            <div>
                <Row className='d-flex justify-content-center'>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Voice Name" variant="outlined" autoFocus='true' value={voiceName} onChange={handleVoiceName} />
                    </Col>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" AWS Name" variant="outlined" value={awsName} onChange={handleAwsName} />
                    </Col>

                </Row>
            </div>
            <div>
                <Row className='d-flex justify-content-center'>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Country" variant="outlined" value={country} onChange={handleCountry} />
                    </Col>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Status" variant="outlined" value={status} onChange={handleStatus} />
                    </Col>

                </Row>
            </div>
            <div className='d-flex justify-content-center my-4'>
                <CommanButton className='btnSend mx-4' onClick={onSubmit}>Submit </CommanButton>
                <CommanButton className='btnSend mx-4' onClick={clearText}>Clear</CommanButton>
            </div>
        </div >
    );


}

export default AddVoice;