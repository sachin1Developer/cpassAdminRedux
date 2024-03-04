import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CommanButton from '../../../../components/CommanButton';
import Heading from '../../../../components/header/Heading';


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

function ModifyVendor() {
    const location = useLocation();
    console.log(location.state.data)
    const [locationData, setLocationData] = useState(location.state.data);



    const [userName, setUserName] = useState(location.state.data?.username);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [obd, setObd] = useState(location.state.data?.obd);
    const [mobileNo, setMobileNo] = useState(location.state.data?.mobile)
    const [email, setEmail] = useState(location.state.data?.email);
    const [roleType, setRoleType] = useState(location.state.data?.roleType);
    const [showPassword, setShowPassword] = useState(false);
    const [personContact, setPersonContact] = useState(location.state.data?.personContact);
    const [position, setPosition] = useState(location.state.data?.position);
    const [compPhone, setCompPhone] = useState(location.state.data?.compPhone);
    const [ext, setExt] = useState(location.state.data?.ext);
    const [avalblnc, setAvalblnc] = useState(location.state.data?.availBalance);
    const [crdblnc, setCrdblnc] = useState(location.state.data?.creditLimit);
    const [salesResp, setSalesResp] = useState(location.state.data?.salesResp);
    const [salesMail, setSalesMail] = useState(location.state.data?.salesEmail);
    const [salesMobile, setSalesMobile] = useState(location.state.data?.salesMob);
    const [billingNumber, setBillingNumber] = useState(location.state.data?.billingMsisdn);
    const [countryCode, setCountryCode] = useState(location.state.data?.countryCode);
    const [useId, setUseId] = useState(location.state.data?.userid);

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


    const clearText = () => {
        setUserName(location.state.data?.username);
        setPassword("");
        setConfirmPassword("");
        // setObd(location.state.data?.obd);
        setMobileNo(location.state.data?.mobileNo);
        setEmail(location.state.data?.emailId);
        setRoleType(location.state.data?.roleType);
        // setSalesMail("");
        // setSalesMobile("");
        // setSalesResp("");
        setExt(location.state.data?.ext);
        setPosition(location.state.data?.position);
        setCompPhone(location.state.data?.compPhone);
        setCountryCode(location.state.data?.countryCode);
        setCrdblnc(location.state.data?.creditblnc);
        setAvalblnc(location.state.data?.availblnc);
        setBillingNumber(location.state.data?.billingMsisdn);
        setPersonContact(location.state.data?.personContact);
    }

    return (

        <div className='mx-3'>
            <Heading name='Modify Vendor'>
                <Link to='/operatorConfig/userTypeManagement/viewUserType' state={{ value: '1' }} style={{ textDecoration: 'none' }}>
                    <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </Heading>
            <div className='d-flex justify-content-center flex-column mx-5 my-4 align-items-center'>
                <Box maxWidth={980}>
                    <Row className='my-2'>
                        <Col md={4}>
                            <TextField type='text' label="User Name" variant="outlined" autoFocus='true' value={userName} />
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
                                    error={password.length !== 0 && (password.length < 6)}
                                />
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
                            <TextField type='text' label="User Id" variant="outlined" value={useId} />
                        </Col>
                        <Col md={4}>
                            <TextField type='text' label="Person_Contact Name" variant="outlined" value={personContact} onChange={(e) => { setPersonContact(e.target.value) }} />
                        </Col>
                        <Col md={4}>
                            <TextField type='text' label="Position" variant="outlined" value={position} onChange={(e) => { setPosition(e.target.value) }} />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={4}>
                            <TextField type='email' label="Email Id" variant="outlined" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </Col>
                        <Col md={4}>
                            <TextField type='number' label="Comp_phone" variant="outlined" value={compPhone} onChange={(e) => { setCompPhone(e.target.value) }} />
                        </Col>
                        <Col md={4}>
                            <TextField type='number' label="Mobile No." variant="outlined" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} />
                        </Col>
                    </Row>
                    {/* <Row className='my-3'>
                                <Col md={4}>
                                    <TextField type='text' label="Sales_Resp" variant="outlined" value={'Admin'} />
                                </Col>
                                <Col md={4}>
                                    <TextField type='email' label="Sales_Email" variant="outlined" value={salesMail} onChange={(e) => { setSalesMail(e.target.value) }} error={salesMail.length !== 0 && salesMail.length < 12} />
                                </Col>
                                <Col md={4}>
                                    <TextField type='number' label="Sales_Mobile" variant="outlined" value={salesMobile} onChange={(e) => { setSalesMobile(e.target.value) }} error={salesMobile.length !== 0 && salesMobile.length < 12} />
                                </Col>
                            </Row> */}
                    <Row className='my-3'>
                        <Col md={4}>
                            <TextField type='number' label="Billing Number" variant="outlined" value={billingNumber} onChange={(e) => { setBillingNumber(e.target.value) }} />

                        </Col>
                        <Col md={4}>
                            <TextField type='number' label="Country Code" variant="outlined" value={countryCode} onChange={(e) => { setCountryCode(e.target.value) }} />
                        </Col>
                        <Col md={4}>
                            <TextField type='text' label="Ext." variant="outlined" value={ext} onChange={(e) => { setExt(e.target.value) }} />
                        </Col>
                    </Row>
                    <Row className='my-3' >
                        <Col md={4}>
                            <TextField type='number' label="Avail_Balance" variant="outlined" value={avalblnc} onChange={(e) => { setAvalblnc(e.target.value) }} />
                        </Col>
                        <Col md={4}>
                            <TextField type='number' label="Credit_Limit" variant="outlined" value={crdblnc} onChange={(e) => { setCrdblnc(e.target.value) }} />
                        </Col>
                        <Col md={4}>
                            <FormControl fullWidth style={{ width: '82%' }}>
                                <InputLabel id="demo-simple-select-label">Select Role Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={1}
                                    // error={(roleType.length !== 0) && (roleType.length < 5)}
                                    label="Select Role Type"
                                    // onChange={(e) => { setRoleType(e.target.value) }}
                                    MenuProps={MenuProps} >
                                    {/* <MenuItem value={1}>{roleType}</MenuItem> */}
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
                        </Col>
                    </Row>
                </Box>
                <div className='d-flex justify-content-center my-5'>
                    <CommanButton className='btnSend mx-4'  >Submit </CommanButton>
                    <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
                </div>
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
    );


}

export default ModifyVendor;