import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link, Redirect, useLocation, useRouteMatch } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import TextArea from 'antd/es/input/TextArea';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import callApi from '../../../../serviceApi/CallApi';



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

function AddVendor() {



    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [obd, setObd] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [roleType, setRoleType] = useState(9);
    const [showPassword, setShowPassword] = useState(false);
    const [personContact, setPersonContact] = useState("");
    const [position, setPosition] = useState("");
    const [compPhone, setCompPhone] = useState("");
    const [ext, setExt] = useState("");
    const [avalblnc, setAvalblnc] = useState("");
    const [crdblnc, setCrdblnc] = useState("");
    const [salesResp, setSalesResp] = useState("");
    const [salesMail, setSalesMail] = useState("");
    const [salesMobile, setSalesMobile] = useState("");
    const [billingNumber, setBillingNumber] = useState("");
    const [countryCode, setCountryCode] = useState("");

    const [responseData, setResponseData] = useState([]);

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

    const validate = () => {
        let flag = false;
        // if (userName.length !== 0 && password.length !== 0 && confirmPassword.length !== 0 && roleType.length !== 0 && mobileNo.length !== 0 && obd.length !== 0 && email.length !== 0) {
        //     flag = true
        //     setConfirmPassword(confirmPassword);
        //     setRoleType(roleType);
        //     setObd(obd);
        //     if (userName.length < 12 && password.length < 15 && mobileNo.length < 12 && email.endsWith('@gmail.com')) {
        //         flag = true
        //         console.log(flag)
        //         setUserName(userName);
        //         setPassword(password);
        //         setMobileNo(mobileNo);
        //         setEmail(email);
        //     }
        //     else {
        //         toast.error("Please Enter Valid Details", {
        //             toastId: err
        //         })
        //     }

        console.log(flag, userName, password, confirmPassword, mobileNo, email, roleType, obd);
        // }
        // else {
        //     toast.error("Please Enter Details", {
        //         toastId: err
        //     })
        //     flag = false
        //     console.log(flag, userName, password, confirmPassword, mobileNo, email, roleType, obd);
        // }
    }


    const onSubmit = () => {
        let flag = false;
        // let check = validate();
        let request = {
            "username": userName,
            "password": password,
            "email": email,
            "roleId": roleType,
            "mobileNum": "1234567890",
            "firstLogin": 1,
            "personContact": personContact,
            "position": position,
            "mobile": mobileNo,
            "compPhone": compPhone,
            "ext": ext,
            "availBalance": avalblnc,
            "creditLimit": crdblnc,
            "billingMsisdn": billingNumber,
            "salesResp": "Admin",
            "salesMobile": salesMobile,
            "salesMail": salesMail
            // "countryCode": countryCode,
        }
        console.log(request)
        callApi.createVendor(request)
            .then((resp) => {
                setResponseData(resp.data);
                // setLoading(false);
                console.log(resp.data)
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while creating vendor ');
            });

    }

    const clearText = () => {
        setUserName("");
        setPassword("");
        setConfirmPassword("");
        setObd("");
        setMobileNo("");
        setEmail("");
        setRoleType("");
        setSalesMail("");
        setSalesMobile("");
        setSalesResp("");
        setExt("");
        setPosition("");
        setCompPhone("");
        setCountryCode("");
        setCrdblnc("");
        setAvalblnc("");
        setBillingNumber("");
        setPersonContact("");
    }


    return (
        <Container>
            {
                responseData === "User created successfully" &&
                <Redirect to="/operatorConfig/userTypeManagement/viewUserType" />
            }
            <div>
                <b>
                    <h3 className='pvmHeading text-slate-800'>Add Vendor ✨
                        <div className='d-flex align-items-center '>
                            <Link to={{ pathname: '/operatorConfig/userTypeManagement/viewUserType', state:'1', }} style={{ textDecoration: 'none' }} >
                                <Button type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</Button>
                            </Link>
                        </div>
                    </h3>
                    {/* <hr /> */}
                </b>
            </div>
            <div>
                <Container>
                    <div className='d-flex justify-content-center flex-column mx-5 my-4'>
                        <Box maxWidth={980}>
                            <Row className='my-2'>
                                <Col md={4}>
                                    <TextField type='text' label="User Name" variant="outlined" autoFocus='true' value={userName} onChange={handleUserName} />
                                    {/* <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}>*Username must be unique</label> */}
                                </Col>
                                <Col md={4}>
                                    <FormControl variant="outlined" style={{ width: '82%' }}>
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
                                            error={password.length !== 0 && (password.length < 6)} />
                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}>
                                            *Password should be minimum 6 characters</label>
                                    </FormControl>
                                </Col>
                                <Col md={4}>
                                    <TextField type='password' label="Confirm Password" variant="outlined" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} error={confirmPassword !== password} helperText={(confirmPassword !== password) && 'password not match'} />
                                </Col>
                            </Row>
                            <Row className='my-3'>
                                <Col md={4}>
                                    <TextField type='text' label="Person_Contact Name" variant="outlined" value={personContact} onChange={(e) => { setPersonContact(e.target.value) }} error={personContact.length !== 0 && (personContact.length === 0)} />
                                </Col>
                                <Col md={4}>
                                    <TextField type='text' label="Position" variant="outlined" value={position} onChange={(e) => { setPosition(e.target.value) }} />
                                </Col>
                                <Col md={4}>
                                    <TextField type='number' label="Mobile No." variant="outlined" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} error={mobileNo.length !== 0 && (mobileNo.length < 12)} />
                                </Col>
                            </Row>
                            <Row className='my-3'>
                                <Col md={4}>
                                    <TextField type='email' label="Email Id" variant="outlined" value={email} onChange={(e) => { setEmail(e.target.value) }} error={email.length !== 0 && (!email.endsWith('@gmail.com'))} />
                                </Col>
                                <Col md={4}>
                                    <TextField type='number' label="Comp_phone" variant="outlined" value={compPhone} onChange={(e) => { setCompPhone(e.target.value) }} error={compPhone.length !== 0 && compPhone.length < 12} />
                                </Col>
                                <Col md={4}>
                                    <TextField type='text' label="Ext." variant="outlined" value={ext} onChange={(e) => { setExt(e.target.value) }} />

                                </Col>
                            </Row>
                            <Row className='my-3'>
                                <Col md={4}>
                                    <TextField type='text' label="Sales_Resp" variant="outlined" value={'Admin'} />
                                </Col>
                                <Col md={4}>
                                    <TextField type='email' label="Sales_Email" variant="outlined" value={salesMail} onChange={(e) => { setSalesMail(e.target.value) }} error={salesMail.length !== 0 && salesMail.length < 12} />
                                </Col>
                                <Col md={4}>
                                    <TextField type='number' label="Sales_Mobile" variant="outlined" value={salesMobile} onChange={(e) => { setSalesMobile(e.target.value) }} error={salesMobile.length !== 0 && salesMobile.length < 12} />
                                </Col>
                            </Row>
                            <Row className='my-3'>
                                <Col md={4}>
                                    <TextField type='number' label="Billing Number" variant="outlined" value={billingNumber} onChange={(e) => { setBillingNumber(e.target.value) }} />

                                </Col>
                                <Col md={4}>
                                    <TextField type='number' label="Country Code" variant="outlined" value={countryCode} onChange={(e) => { setCountryCode(e.target.value) }} />
                                </Col>
                                <Col md={4}>
                                    <FormControl fullWidth style={{ width: '82%' }}>
                                        <InputLabel id="demo-simple-select-label">Select Role Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={roleType}
                                            error={(roleType.length !== 0) && (roleType.length < 5)}
                                            label="Select Role Type"
                                            onChange={(e) => { setRoleType(e.target.value) }}
                                            MenuProps={MenuProps} >
                                            <MenuItem value={1}>Admin</MenuItem>
                                            <MenuItem value={2}>Client</MenuItem>
                                            <MenuItem value={3}>Corporate</MenuItem>
                                            <MenuItem value={4}>Dynamic</MenuItem>
                                            <MenuItem value={5}>TEST</MenuItem>
                                            <MenuItem value={7}>Business</MenuItem>
                                            <MenuItem value={9}>Vendor</MenuItem>
                                            <MenuItem value={8}>Outreach</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row className='my-3' >
                                <Col md={4}>
                                    <TextField type='number' label="Avail_Balance" variant="outlined" value={avalblnc} onChange={(e) => { setAvalblnc(e.target.value) }} error={avalblnc.length !== 0 && (avalblnc.length === 0)} />
                                </Col>
                                <Col md={4}>
                                    <TextField type='number' label="Credit_Limit" variant="outlined" value={crdblnc} onChange={(e) => { setCrdblnc(e.target.value) }} error={crdblnc.length !== 0 && crdblnc.length === 0} />
                                </Col>
                                {/* <Col md={4}>
                                    <TextField type='number' label="OBD" variant="outlined" value={obd} onChange={handleObd} error={!validate} />
                                </Col> */}
                            </Row>
                        </Box>
                    </div>
                </Container>
                <div className='d-flex justify-content-center my-5'>
                    <Button className='btnSend mx-4' onClick={onSubmit} >Submit </Button>
                    <Button className='btnSend mx-4' onClick={clearText} >Clear</Button>
                </div>

                {/* <Row className='d-flex justify-content-center'>
                    <Col sm={3} className='d-flex flex-column'>
                        <TextField className='my-2' type='text' label="User Name" variant="outlined" autoFocus='true' onChange={handleUserName} error={!validate} />

                        <TextField className='my-2' type='text' label="Person_Contact Name" variant="outlined" value={personContact} onChange={(e) => { setPersonContact(e.target.value) }} error={personContact.length !== 0 && (personContact.length === 0)} />

                        <TextField className='my-3' type='email' label="Email Id" variant="outlined" value={email} onChange={(e) => { setEmail(e.target.value) }} error={email.length !== 0 && (!email.endsWith('@gmail.com'))} />

                        <TextField className='my-2' type='text' label="Sales_Resp" variant="outlined" value={'Admin'} />

                        <TextField className='my-2' type='number' label="Billing Number" variant="outlined" value={billingNumber} onChange={(e) => { setBillingNumber(e.target.value) }} error={billingNumber.length !== 0 && billingNumber.length <= 12} />

                        <TextField className='my-2' type='text' label="Avail_Balance" variant="outlined" value={avalblnc} onChange={(e) => { setAvalblnc(e.target.value) }} error={avalblnc.length !== 0 && (avalblnc.length === 0)} />


                    </Col>
                    <Col sm={3} className='d-flex flex-column'>
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
                                onChange={(e) => { setPassword(e.target.value) }}
                                error={password.length !== 0 && (password.length < 6)} />
                        </FormControl>
                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}>
                            *Password should be minimum 6 characters</label>


                        <TextField className='my-2' type='text' label="Position" variant="outlined" value={position} onChange={(e) => { setPosition(e.target.value) }} error={position.length !== 0} />


                        <TextField className='' type='number' label="Comp_phone" variant="outlined" value={compPhone} onChange={(e) => { setCompPhone(e.target.value) }} error={compPhone.length !== 0 && compPhone.length <= 12} />

                        <TextField className='my-2' type='text' label="Sales_Email" variant="outlined" value={salesMail} onChange={(e) => { setSalesMail(e.target.value) }} error={salesMail.length !== 0 && salesMail.length <= 12} />

                        <TextField className='my-2' type='text' label="Country Code" variant="outlined" value={countryCode} onChange={(e) => { setSalesMail(e.target.value) }} error={countryCode.length !== 0 && countryCode.length <= 7} />

                        <TextField className='my-2' type='text' label="Credit_Limit" variant="outlined" value={crdblnc} onChange={(e) => { setCrdblnc(e.target.value) }} error={crdblnc.length !== 0 && crdblnc.length <= 12} />


                    </Col>
                    <Col sm={3} className='d-flex flex-column'>
                        <TextField className='my-2' type='password' label="Confirm Password" variant="outlined" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} error={confirmPassword !== password} helperText={(confirmPassword !== password) && 'password not match'} />

                        <TextField className='my-2' type='number' label="Mobile No." variant="outlined" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} error={mobileNo.length !== 0 && (mobileNo.length < 12)} />

                        <TextField className='mt-4 mb-2' type='text' label="Ext." variant="outlined" value={ext} onChange={(e) => { setExt(e.target.value) }} error={ext.length !== 0 && ext.length <= 12} />

                        <TextField className='my-2' type='text' label="Sales_Mobile" variant="outlined" value={salesMobile} onChange={(e) => { setSalesMobile(e.target.value) }} error={salesMobile.length !== 0 && salesMobile.length <= 12} />

                        <FormControl fullWidth className='my-2'>
                            <InputLabel id="demo-simple-select-label">Select Role Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={roleType}
                                error={(roleType.length !== 0) && (roleType.length < 5)}
                                label="Select Role Type"
                                onChange={(e) => { setRoleType(e.target.value) }}
                                MenuProps={MenuProps} >
                                <MenuItem value={1}>Admin</MenuItem>
                                <MenuItem value={2}>Client</MenuItem>
                                <MenuItem value={3}>Corporate</MenuItem>
                                <MenuItem value={4}>Dynamic</MenuItem>
                                <MenuItem value={5}>TEST</MenuItem>
                                <MenuItem value={6}>Vendor</MenuItem>
                                <MenuItem value={7}>Business</MenuItem>
                                <MenuItem value={8}>Outreach</MenuItem>
                                <MenuItem value={9}>Outreach</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField className='my-4' type='number' label="OBD" variant="outlined" value={obd} onChange={handleObd} error={!validate} />

                    </Col>
                    <div className='d-flex justify-content-center my-5'>
                        <Button className='btnSend mx-4' onClick={validate} >Submit </Button>
                        <Button className='btnSend mx-4' onClick={clearText} >Clear</Button>
                    </div>
                </Row> */}
            </div>
        </Container>
    );


}

export default AddVendor;