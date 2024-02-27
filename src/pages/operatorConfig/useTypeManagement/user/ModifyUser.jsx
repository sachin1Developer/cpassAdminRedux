import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import TextArea from 'antd/es/input/TextArea';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import callApi from '../../../../serviceApi/CallApi';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const user = "userName";
const pass = "pass";
const confirmPass = "confirmPass";
const obdError = "obdErr";
const mobile = "mobile";
const mail = "email";
const role = "roleId";
const err = "error";

function ModifyUser() {
    const location = useLocation();
    console.log(location.state.data)
    const limit = JSON.parse(location.state.data?.total_limit)
    console.log(limit)

    const [userName, setUserName] = useState(location.state.data?.USERNAME);
    const [password, setPassword] = useState(location.state.data?.PASSWORD);
    const [confirmPassword, setConfirmPassword] = useState(location.state.data?.PASSWORD);
    const [obd, setObd] = useState(limit?.obdLimit);
    const [mobileNo, setMobileNo] = useState(location.state.data?.MOBILE_NUM);
    const [email, setEmail] = useState(location.state.data?.EMAIL);
    const [roleType, setRoleType] = useState(location.state.data?.ROLE_ID);
    const [showPassword, setShowPassword] = useState(false)
    const [sms, setSms] = useState(limit?.smsLimit);
    const [roleView, setRoleView] = useState([]);
    const getListofRoleType = () => {
        callApi.getRoleTypeNameAndId()
            .then((resp) => {
                setRoleView(resp.data.body[0]);
                // console.log(resp.data.body[0])
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching subscriber range list');
            });
    }

    useEffect(() => {
        getListofRoleType();
    }, [])


    const handleUserName = (e) => {
        if (e.target.value != "") {
            setUserName(e.target.value);
        }
        else {
            toast.error("Please Enter UserName",
                {
                    toastId: user
                })
        }
    }
    const handleObd = (e) => {
        setObd(e.target.value);
        if (e.target.value != "") {
            setObd(e.target.value);
        }
        else {
            toast.error("Please Enter OBD ", {
                toastId: obdError
            });
        }
    }
    const handleSms = (e) => {
        setSms(e.target.value);
        if (e.target.value != "") {
            setSms(e.target.value);
        }
        else {
            toast.error("Please Enter SMS ", {
                toastId: obdError
            });
        }
    }

    const handleMobileNo = (e) => {
        setMobileNo(e.target.value)
        if (e.target.value != "") {
            if (e.target.value.length <= 12) {
                setMobileNo(e.target.value)
            }
            else {
                toast.error("Mobile number max length is 12", {
                    toastId: mobile
                });
            }
        }
        else {
            toast.error("Please Enter Mobile Number", {
                toastId: mobile
            });
        }
    }


    const handleRoleType = (event) => {
        if (event.target.value != "") {
            setRoleType(event.target.value);
        }
        else {
            toast.error("Please Enter RoleType", {
                toastId: role
            })
        }
    };
    const [responseData, setResponseData] = useState([]);
    const validate = () => {
        let flag = false;
        let request = {
            "username": userName,
            "password": password,
            "firstLogin": "1",
            "roleId": roleType,
            "user_id": location.state.data?.user_id,
            "obdLimit": obd,
            "smsLimit": sms
        }
        if (request != null) {
            console.log(request)

            callApi.updateUser(request)
                .then((resp) => {
                    setResponseData(resp.data.message);
                    console.log(resp.data.message)
                })
                .catch((error) => {
                    // console.error(error.response.data.errorMessage);
                    toast.error(error);
                });
        }
        else {
            toast.error("Please Enter Details", {
                toastId: err
            })
            flag = false
            console.log(flag);
        }
    }

    const clearText = () => {
        setPassword(location.state.data?.PASSWORD);
        setConfirmPassword(location.state.data?.PASSWORD);
        setObd(limit?.obdLimit);
        setMobileNo(location.state.data?.MOBILE_NUM);
        setEmail(location.state.data?.EMAIL);
        setRoleType(location.state.data?.ROLE_ID);
        setSms(limit?.smsLimit);

    }

    return (
        <Container>
            {
                responseData === "User updated successfully" &&
                <Redirect to="/operatorConfig/userTypeManagement/viewUserType" />
            }
            <div>
                <b>
                    <h3 className='pvmHeading text-slate-800'>Modify User Detail ✨
                        <div className='my-2'>
                            <Link to='/operatorConfig/userTypeManagement/viewUserType'>
                                <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                            </Link>
                        </div>
                    </h3>
                </b>
            </div>
            <div>
                <Row className='d-flex justify-content-center'>
                    <Col sm={4} className='d-flex flex-column'>
                        <TextField className='my-2' id="outlined-basic" type='text' label="User Name" variant="outlined" autoFocus='true' value={userName} />
                        <FormControl variant="outlined" className='my-2'>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => { setShowPassword(true) }}
                                            onMouseDown={() => { setShowPassword(false) }}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </FormControl>
                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}>
                            *Password should be minimum 6 characters long</label>
                        <TextField className='my-2' id="outlined-basic" type='number' label="Mobile No." variant="outlined" value={mobileNo} onChange={handleMobileNo} />
                        <TextField className='my-3' id="outlined-basic" type='email' label="Email Id" variant="outlined" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </Col>
                    <Col sm={4} className='d-flex flex-column'>
                        <FormControl fullWidth className='my-2'>
                            <InputLabel id="demo-simple-select-label">Select Role Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={roleType}
                                // error={!validate}
                                label="Select Role Type"
                                onChange={handleRoleType}
                                MenuProps={MenuProps} >
                                {roleView?.map((listRole) => {
                                    return <MenuItem value={listRole?.roleId}>{listRole?.roleName}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <TextField className='my-2' id="outlined-basic" type='password' label="Confirm Password" variant="outlined" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} error={confirmPassword !== password} helperText={(confirmPassword !== password) && 'password not match'} />
                        <TextField className='my-4' id="outlined-basic" type='number' label="OBD" variant="outlined" value={obd} onChange={handleObd} />
                        <TextField className='' id="outlined-basic" type='number' label="SMS" variant="outlined" value={sms} onChange={handleSms} />
                    </Col>
                    {/* <div className='d-flex justify-content-center'>
                        <TextField className='' id="outlined-basic" type='email' label="Email Id" variant="outlined" />
                    </div> */}
                    <div className='d-flex justify-content-center my-5'>
                        <Button className='btnSend mx-4' onClick={validate} >Submit </Button>
                        <Button className='btnSend mx-4' onClick={clearText} >Clear</Button>
                    </div>
                </Row>
            </div>
        </Container>
    );


}

export default ModifyUser;