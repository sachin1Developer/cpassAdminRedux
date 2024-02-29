import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FormControl, InputLabel, Select, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createServer, getServer } from './slice/Server';
import { getSystemCountryCode } from '../countryCode/slice/CountryCode';
import CommanButton from '../../../components/CommanButton';


const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
            rows: 3,
        },
    },
};


const serverN = "severName";
function AddServer() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state?.token?.data?.token)

    const [serverName, setServerName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [existName, setExistName] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [responseData, setResponseData] = useState([]);


    const handleName = (e) => {
        if (e.target.value === "") {
            toast.error("Please Enter Server Name", {
                toastId: serverN
            })
        }
        else {
            let flag = false
            existName.map((value) => {
                if (e.target.value === value) {
                    flag = true
                    setServerName(e.target.value)
                }
            })
            if (flag === false) {
                setServerName(e.target.value)
            }
            else {
                toast.error("This sever name is already exist", {
                    toastId: serverN
                })
            }
        }
    }



    const getServerName = () => {
        dispatch(getServer(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setExistName(resp?.payload?.data?.body);
                } else {
                    toast.error('Internal server Error');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching Server list');
            });
    }
    const getCountryName = () => {
        dispatch(getSystemCountryCode(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setCountryList(resp?.payload?.data?.body);
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error While List');
            });
    }

    useEffect(() => {
        getServerName();
        getCountryName();
    }, [])

    const onSubmit = () => {
        let request = {
            "serverName": serverName,
            "countryCode": countryCode.toString()
        }
        if (request === "") {
            toast.error('Please Enter Details');
        }
        else {
            dispatch(createServer({ token: token, data: request }))
                .then((resp) => {
                    if (resp?.payload?.status === 200) {
                        toast.success("Server Added Successfully");
                        navigate('/systemConfiguration/serverManagement')
                    } else {
                        toast.error('Internal server error')
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Error While Adding Server");
                });
            console.log(serverName, "    ", countryCode.toString())
        }
    }

    const clearText = () => {
        setServerName("");
        setCountryCode("");
    }

    // *******************************************************
    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        console.log(options)
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setCountryCode(value);
    };



    return (
        <div className='mx-3' >
            <div className=' d-flex justify-content-between my-2 align-items-center'>
                <h4 className='fw-bold mx-2'>Add Server ✨</h4>
                <div className='mx-2'>
                    <Link to='/systemConfiguration/serverManagement' style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </div>
            </div>
            <div>
                <Row className='d-flex justify-content-center'>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Server Name" autoFocus="true" variant="outlined" value={serverName} onChange={handleName} />
                    </Col>
                    <Col sm={4}>
                        <FormControl sx={{ m: 1, minWidth: 320, maxWidth: 500, height: '100px' }}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Country Code
                            </InputLabel>
                            <Select
                                multiple
                                native
                                value={countryCode}
                                onChange={handleChangeMultiple}
                                label="Country Code"
                                MenuProps={MenuProps}
                                inputProps={{
                                    id: 'select-multiple-native',
                                }}
                            >
                                {countryList.map((list) => (
                                    <option key={list} value={list.country_code} selected={countryCode.includes(list.country_code)} >
                                        {list.country_name}({list.country_code})
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        {/* <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Country Code" variant="outlined" value={countryCode} onChange={(e) => { setCountryCode(e.target.value) }} /> */}
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

export default AddServer;