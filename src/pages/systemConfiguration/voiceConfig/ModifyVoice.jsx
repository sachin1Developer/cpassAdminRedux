import React, { useState } from 'react';
import { Col,  Row } from 'reactstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { modifyVoice } from './slice/VoiceConfiguration';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';


function ModifyVoice() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state?.token?.data?.token)

    const location = useLocation()
    console.log(location.state.data);
    // const voiceId = location.state.data.id;
    const voiceId = location.state.data?.id
    const [voiceName, setVoiceName] = useState(location.state.data?.name);
    const [awsName, setAwsName] = useState(location.state.data?.aws_name);
    const [country, setCountry] = useState(location.state.data?.country);
    const [status, setStatus] = useState(location.state.data?.status);


    const onSubmit = () => {
        let request = {
            "name": voiceName,
            "status": status,
            "aws_name": awsName,
            "country": country
        }
        console.log(request)
        // callApi.updateSystemVoice(voiceId, request)
        dispatch(modifyVoice({ token: token, id: voiceId, data: request }))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    toast.success('Update Successfully');
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
        setVoiceName(location.state.data?.name);
        setAwsName(location.state.data?.aws_name);
        setCountry(location.state.data?.country);
        setStatus(location.state.data?.status);
    }

    return (
        <div className='mx-3'>
            <Heading name='Modify Voice Type'>
                <Link to='/systemConfiguration/voiceConfiguration' style={{ textDecoration: 'none' }}>
                    <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </Heading>
            <div>
                <Row className='d-flex justify-content-center'>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='number' label=" Voice Id" variant="outlined" autoFocus='true' value={voiceId} />
                    </Col>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Voice Name" variant="outlined" value={voiceName} onChange={(e) => { setVoiceName(e.target.value) }} />
                    </Col>
                </Row>
            </div>

            <div>
                <Row className='d-flex justify-content-center'>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" AWS Name" variant="outlined" value={awsName} onChange={(e) => { setAwsName(e.target.value) }} />
                    </Col>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Country" variant="outlined" value={country} onChange={(e) => { setCountry(e.target.value) }} />
                    </Col>
                </Row>
            </div>
            <div>
                <Row className='d-flex justify-content-center'>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Status" variant="outlined" value={status} onChange={(e) => { setStatus(e.target.value) }} />
                    </Col>
                </Row>
            </div>
            <div className='d-flex justify-content-center my-4'>
                <CommanButton className='btnSend mx-4' onClick={onSubmit}>Submit </CommanButton>
                <CommanButton className='btnSend mx-4' onClick={clearText}>Clear</CommanButton>
            </div>
        </div>
    );


}

export default ModifyVoice;