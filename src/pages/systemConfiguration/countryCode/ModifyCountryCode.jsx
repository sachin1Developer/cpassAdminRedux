import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { modifyCountryCode } from './slice/CountryCode';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';



function ModifyCountryCode() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state?.token?.data?.token)
    const location = useLocation();
    // console.log(location.state.data?.id);
    const [countryId, setCountryId] = useState(location.state.data.id);
    const [countryCode, setCountryCode] = useState(location.state.data?.country_code);
    const [countryName, setCountryName] = useState(location.state.data?.country_name);
    const [siteId, setSiteId] = useState(location.state.data?.site_id);

    const [responseData, setResponseData] = useState([]);

    const onSubmit = () => {
        let request = {
            "country_code": countryCode,
            "country_name": countryName,
            "site_id": siteId
        }
        dispatch(modifyCountryCode({ token: token, id: countryId, data: request }))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    toast.info('Updated Successfully');
                    navigate('/systemConfiguration/countryCodeManagement')
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch(() => {
                toast.error('Error while updating');
            });
    }


    const clearText = () => {
        setCountryCode(location.state.data?.country_code);
        setCountryName(location.state.data?.country_name);
        setSiteId(location.state.data?.site_id);
    }

    return (
        <div className='mx-3'>
            <Heading name='Modify Country Code'>
                <Link to='/systemConfiguration/countryCodeManagement' style={{ textDecoration: 'none' }}>
                    <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </Heading>
            <div>
                <Row className='d-flex justify-content-center'>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label="Country Id" variant="outlined" value={countryId} />
                    </Col>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Country Name" variant="outlined" value={countryName} onChange={(e) => { setCountryName(e.target.value) }} />
                    </Col>
                </Row>
            </div>
            <div>
                <Row className='d-flex justify-content-center'>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='number' label=" Country Code" variant="outlined" value={countryCode} onChange={(e) => { setCountryCode(e.target.value) }} />
                    </Col>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='number' label="Site Id" variant="outlined" value={siteId} onChange={(e) => { setSiteId(e.target.value) }} />
                    </Col>
                </Row>
            </div>
            <div className='d-flex justify-content-center my-4'>
                <CommanButton className='btnSend mx-4' onClick={onSubmit} >Submit </CommanButton>
                <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
            </div>
        </div >
    );


}

export default ModifyCountryCode;