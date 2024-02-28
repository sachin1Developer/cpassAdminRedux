import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CommanButton from '../../../../components/CommanButton';
import { getRoleTypeNameAndId, modifyUserType } from '../slice/UserTypeManagement';
import { useDispatch, useSelector } from 'react-redux';




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
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state.token?.data?.token)
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
        dispatch(getRoleTypeNameAndId(token))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setRoleView(resp?.payload?.data?.body[0]);
                } else {
                    toast.error('Internal server error')
                }
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

            dispatch(modifyUserType({ data: request, token: token }))
                .then((resp) => {
                    if (resp?.payload?.data?.httpStatusCode === 200) {
                        navigate('/operatorConfig/userTypeManagement/viewUserType')
                    } else {
                        toast.error('Internal server error')
                    }
                    console.log(resp?.payload?.data.message)
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


            <div className=' d-flex justify-content-between my-2 align-items-center'>
                <h4 className='fw-bold mx-2'>Modify User Detail ✨
                </h4>
                <div className='d-flex align-items-center'>
                    <Link to='/operatorConfig/userTypeManagement/viewUserType'>
                        <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </div>
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
                        <CommanButton className='btnSend mx-4' onClick={validate} >Submit </CommanButton>
                        <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
                    </div>
                </Row>
            </div>
        </Container>
    );


}

export default ModifyUser;