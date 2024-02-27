import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
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

function AddUser() {


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [obd, setObd] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [roleType, setRoleType] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [sms, setSms] = useState("");

    const [roleView, setRoleView] = useState([]);
    const getListofRoleType = () => {
        callApi.getRoleTypeNameAndId()
            .then((resp) => {
                setRoleView(resp.data.body[0]);
                // setLoading(false);
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
        if (e.target.value.length != 0) {
            setUserName(e.target.value);
        }
        else {
            toast.error("Please Enter UserName",
                {
                    toastId: user
                })
        }
    }

    const handlePassword = (e) => {
        if (e.target.value != "") {
            setPassword(e.target.value)
        }
        else {
            toast.error("Please Enter Password", {
                toastId: pass
            })
        }
    }

    const handleConfirmPassword = (e) => {
        let flag = false
        if (e.target.value != "") {
            setConfirmPassword(e.target.value);
            if (e.target.value === password) {
                flag = true
                if (flag === true) {
                    setConfirmPassword(e.target.value)
                }
            }
            else {
                toast.error("Password is not match", {
                    toastId: confirmPass
                });
            }
        }
        else {
            toast.error("Please Enter Confirm Password", {
                toastId: confirmPass
            });
        }
    }

    const handleObd = (e) => {
        if (e.target.value != "") {
            setObd(e.target.value);
        }
        else {
            toast.error("Please Enter OBD ", {
                toastId: obdError
            });
        }
    }

    const handleMobileNo = (e) => {
        if (e.target.value != "") {
            if (e.target.value.length < 12) {
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

    const handleEmail = (e) => {
        if (e.target.value != "") {
            setEmail(e.target.value)
        }
        else {
            toast.error("Please Enter Email", {
                toastId: mail
            })
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
            "email": email,
            "mobileNumber": mobileNo,
            "firstLogin": "1",
            "roleId": roleType,
            "obdLimit": obd,
            "smsLimit": sms,
            // "description": description
        }
        if (request != null) {
            console.log(request)

            if (userName.length !== 0 && password.length !== 0 && confirmPassword.length !== 0 && roleType.length !== 0 && mobileNo.length !== 0 && obd.length !== 0 && email.length !== 0) {
                flag = true
                setConfirmPassword(confirmPassword);
                setRoleType(roleType);
                setObd(obd);
                if (userName.length < 12 && password.length < 15 && mobileNo.length < 12 && email.endsWith('@gmail.com')) {
                    flag = true
                    console.log(flag)
                    setUserName(userName);
                    setPassword(password);
                    setMobileNo(mobileNo);
                    setEmail(email);

                    callApi.createUser(request)
                        .then((resp) => {
                            setResponseData(resp.data.message); 
                            toast.success("Added Successfully");
                            // console.log(resp.data.message)
                        })
                        .catch((error) => {
                            // console.error(error.response.data.errorMessage);
                            toast.error(error.response.data.errorMessage);
                        });

                }
                else {
                    toast.error("Please Enter Valid Details", {
                        toastId: err
                    })
                }

                console.log(flag);
            }
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
        setUserName("");
        setPassword("");
        setConfirmPassword("");
        setObd("");
        setMobileNo("");
        setEmail("");
        setRoleType("");
        setSms("");
    }

    const numVal = { "roleId": 1, "roleName": "admin" }

    // const onSubmit = () => { }



    return (
        <Container>
            {
                responseData === "User Created Sucessfully" &&
                <Redirect to="/operatorConfig/userTypeManagement/viewUserType" />
            }
            <div>
                <div>
                    <b>
                        <h3 className='pvmHeading text-slate-800'>Add User ✨
                            <div className='d-flex align-items-center '>
                                <Link to={{ pathname: '/operatorConfig/userTypeManagement/viewUserType', state: '0' }} style={{ textDecoration: 'none' }}>
                                    <Button type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</Button>
                                </Link>
                            </div>
                        </h3>
                    </b>
                </div>
                <div>
                    <Row className='d-flex justify-content-center'>
                        <Col sm={4}>
                            <TextField className='my-2 w-100' id="outlined-basic" type='text' label="User Name" variant="outlined" autoFocus='true' value={userName} onChange={handleUserName} />
                        </Col>
                        <Col sm={4}>
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
                                    {/* <MenuItem value={1} name="" >Admin</MenuItem>
                                <MenuItem value={2}>Client</MenuItem>
                                <MenuItem value={3}>Corporate</MenuItem>
                                <MenuItem value={4}>Dynamic</MenuItem>
                                <MenuItem value={5}>TEST</MenuItem>
                                <MenuItem value={6}>Vendor</MenuItem>
                                <MenuItem value={7}>Business</MenuItem>
                                <MenuItem value={8}>Outreach</MenuItem>
                                <MenuItem value={9}>Outreach</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className='d-flex justify-content-center'>
                        <Col sm={4}>
                            <FormControl variant="outlined" className='my-2 w-100'>
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
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    error={password.length !== 0 && (password.length < 6)}

                                // helperText={password.length !== 0 && ((password.length < 6) && 'password length have atleast 6 ')}
                                />
                            </FormControl>
                            <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}>
                                *Password should be minimum 6 characters long</label>
                        </Col>
                        <Col sm={4}>
                            <TextField className='my-2 w-100' id="outlined-basic" type='password' label="Confirm Password" variant="outlined" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} error={confirmPassword !== password} helperText={(confirmPassword !== password) && 'password not match'} />
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className='d-flex justify-content-center'>
                        <Col sm={4}>
                            <TextField className='my-2 w-100' id="outlined-basic" type='number' label="Mobile No." variant="outlined" value={mobileNo} onChange={handleMobileNo} error={!validate} />
                        </Col>
                        <Col sm={4}>
                            <TextField className='my-2 w-100' id="outlined-basic" type='number' label="OBD" variant="outlined" value={obd} onChange={handleObd} />
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className='d-flex justify-content-center'>
                        <Col sm={4}>
                            <TextField className='my-2 w-100' id="outlined-basic" type='email' label="Email Id" variant="outlined" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </Col>
                        <Col sm={4}>
                            <TextField className='my-2 w-100' id="outlined-basic" type='number' label="SMS" variant="outlined" value={sms} onChange={(e) => { setSms(e.target.value) }} />
                        </Col>
                    </Row>
                </div>
                <div className='d-flex justify-content-center my-4'>
                    <Button className='btnSend mx-4' onClick={validate} >Submit </Button>
                    <Button className='btnSend mx-4' onClick={clearText} >Clear</Button>
                </div>
            </div>
        </Container >
    );


}

export default AddUser;