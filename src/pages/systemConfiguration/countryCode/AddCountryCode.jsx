import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createSystemCountryCode } from './slice/CountryCode';
import CommanButton from '../../../components/CommanButton';

const cName = "cname";
const cCode = "cCode";
const idSite = "siteId";
const success = "success"
function AddCountryCode() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state?.token?.data?.token)
    const [countryCode, setCountryCode] = useState("");
    const [countryName, setCountryName] = useState("");
    const [siteId, setSiteId] = useState("");
    const [responseData, setResponseData] = useState([]);



    const onSubmit = () => {
        let request = {
            "country_code": countryCode,
            "country_name": countryName,
            "site_id": siteId
        }
        if (countryName === "") {
            toast.error("Please Enter Country Name", {
                toastId: cName
            })
        }
        else if (countryCode === "") {
            toast.error("Please Enter Country Code", {
                toastId: cCode
            });
        }
        else if (siteId === "") {
            toast.error("Please Enter Site Id", {
                toastId: idSite
            });
        }
        else {
            dispatch(createSystemCountryCode({ token: token, data: request }))
                .then((resp) => {
                    if (resp?.payload?.status === 200) {
                        navigate('/systemConfiguration/countryCodeManagement')
                    } else {
                        toast.error('Internal server error')
                    }
                })
                .catch(() => {
                    toast.error('error while adding');
                });
        }
    }

    const clearText = () => {
        setCountryCode("");
        setCountryName("");
        setSiteId("");
    }

    return (
        <Container>
            <div>
                <div className=' d-flex justify-content-between my-2 align-items-center'>
                    <h4 className='fw-bold mx-2'>Add Country Code ✨</h4>
                    <div className='mx-2'>
                        <Link to='/systemConfiguration/countryCodeManagement' style={{ textDecoration: 'none' }}>
                            <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</CommanButton>
                        </Link>
                    </div>
                </div>
                <div>
                    <Row className='d-flex justify-content-center'>
                        <Col sm={4}>
                            <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Country Name" variant="outlined" autoFocus="true" value={countryName} onChange={(e) => { setCountryName(e.target.value) }} />
                        </Col>
                        <Col sm={4}>
                            <TextField className='my-2 w-100' id="outlined-basic" type='number' label=" Country Code" variant="outlined" value={countryCode} onChange={(e) => { setCountryCode(e.target.value) }} />
                        </Col>

                    </Row>
                </div>
                <div>
                    <Row className='d-flex justify-content-center'>
                        <Col sm={4}>
                            <TextField className='my-2 w-100' id="outlined-basic" type='text' label="Site Id" variant="outlined" value={siteId} onChange={(e) => { setSiteId(e.target.value) }} />
                        </Col>
                        <Col sm={4}>

                        </Col>
                    </Row>
                </div>
                <div className='d-flex justify-content-center my-4'>
                    <CommanButton className='btnSend mx-4' onClick={onSubmit} >Submit </CommanButton>
                    <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
                </div>
            </div>
        </Container >
    );


}

export default AddCountryCode;