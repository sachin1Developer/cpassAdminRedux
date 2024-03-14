import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField} from '@mui/material';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CommanButton from '../../../../components/CommanButton';
import Heading from '../../../../components/header/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { getVendorById, modifyVendor } from '../slice/UserTypeManagement';
import Loader from '../../../../components/loader/Loader';


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



function ModifyVendor() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state.token?.data?.token)
    const [dataById, setDataById] = useState([]);
    const [loading, setloading] = useState(true)
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
    const [personContactNo, setpersonContactNo] = useState('')

    if ((id === undefined) || (id === null)) {
        navigate('/operatorConfig/userTypeManagement/viewUserType', { state: { value: '1' } })
    }

    const getVendorbyId = () => {
        setloading(true)
        dispatch(getVendorById({ id: id, token: token }))
            .then((resp) => {
                console.log(resp)
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    if (resp?.payload?.data?.body[0] === parseInt(id)) {
                        toast.error('Not Found')
                        navigate('/operatorConfig/userTypeManagement/viewUserType', { state: { value: '1' } })
                    } else {
                        setDataById(resp?.payload?.data?.body[0]);
                        setUserName(resp?.payload?.data?.body[0].username)
                        setPassword(resp?.payload?.data?.body[0].password)
                        setConfirmPassword(resp?.payload?.data?.body[0].password)
                        setMobileNo(parseInt((resp?.payload?.data?.body[0].mobileNum)?.replace(/-/g, '')))
                        setEmail(resp?.payload?.data?.body[0].email)
                        setRoleType(resp?.payload?.data?.body[0].roleId)
                        setPersonContact(resp?.payload?.data?.body[0].personContact)
                        setPosition(resp?.payload?.data?.body[0].position)
                        setCompPhone(parseInt((resp?.payload?.data?.body[0].compPhone)?.replace(/-/g, '')))
                        setExt(parseInt((resp?.payload?.data?.body[0].ext)?.replace(/-/g, '')))
                        setAvalblnc(resp?.payload?.data?.body[0].availBalance)
                        setCrdblnc(resp?.payload?.data?.body[0].creditLimit)
                        setSalesResp(resp?.payload?.data?.body[0].salesresp)
                        setSalesMail(resp?.payload?.data?.body[0].salesemail)
                        setSalesMobile(parseInt((resp?.payload?.data?.body[0].salesemobile)?.replace(/-/g, '')))
                        setBillingNumber(parseInt((resp?.payload?.data?.body[0].billingmsisdn)?.replace(/-/g, '')))
                        setCountryCode(parseInt((resp?.payload?.data?.body[0].countycode)?.replace(/-/g, '')))
                        setpersonContactNo(parseInt((resp?.payload?.data?.body[0].mobile)?.replace(/-/g, '')))
                    }
                } else {
                    toast.error('Internal server error')
                }
                setloading(false)
            })
            .catch((error) => {
                console.error(error);
                setloading(false)
                toast.error('Error while fetching Vendor Data');
            });
    }

    useEffect(() => {
        getVendorbyId();
    }, [])

    const onSubmit = () => {
        if (userName?.length === 0) {
            toast.error("Please Enter UserName")
        } else if (password?.length === 0) {
            toast.error("Please Enter Password")
        } else if (password?.length <= 6) {
            toast.error("Password must have 6 Character")
        } else if (confirmPassword?.length === 0) {
            toast.error("Please Enter Confirm Password")
        } else if (confirmPassword?.length <= 5) {
            toast.error("Confirm Password must have 6 Character")
        } else if (mobileNo?.length === 0) {
            toast.error("Please Enter Mobile Number")
        } else if (mobileNo?.length <= 11) {
            toast.error("Mobile Number must have 12 Character")
        } else if (personContact?.length === 0) {
            toast.error("Please Enter Person Contact Name")
        } else if (position?.length === 0) {
            toast.error("Please Enter Position")
        } else if (email?.length === 0) {
            toast.error("Please Enter Email")
        } else if (compPhone?.length === 0) {
            toast.error("Please Enter Component Phone")
        } else if (compPhone?.length <= 11) {
            toast.error("Component Phone must have 12 Character")
        } else if (personContactNo?.length === 0) {
            toast.error("Please Enter Person Contact Mobile Number")
        } else if (personContactNo?.length <= 11) {
            toast.error("Person Contact Mobile Number must have 12 Character")
        } else if (ext?.length === 0) {
            toast.error("Please Enter Ext.")
        } else if (salesResp?.length === 0) {
            toast.error("Please Enter Sales Resp.")
        } else if (salesMail?.length === 0) {
            toast.error("Please Enter Sales Email")
        } else if (salesMobile?.length === 0) {
            toast.error("Please Enter Sales Mobile Number")
        } else if (salesMobile?.length <= 11) {
            toast.error("Sales Mobile Number must have 12 Character")
        } else if (billingNumber?.length === 0) {
            toast.error("Please Enter Billing Number")
        } else if (countryCode?.length === 0) {
            toast.error("Please Enter Country Code")
        } else if (avalblnc?.length === 0) {
            toast.error("Please Enter Available Balance")
        } else if (crdblnc?.length === 0) {
            toast.error("Please Enter Credit Limit")
        } else {
            let request = {
                "password": password,
                "email": email,
                "mobileNum": mobileNo,
                "personContact": personContact,
                "position": position,
                "mobile": personContactNo,
                "compPhone": compPhone,
                "ext": ext,
                "availBalance": avalblnc,
                "creditLimit": crdblnc
            }
            console.log(request)
            dispatch(modifyVendor({ id: id, data: request, token: token }))
                .then((resp) => {
                    if (resp?.payload?.data?.httpStatusCode === 200) {
                        navigate('/operatorConfig/userTypeManagement/viewUserType')
                    } else {
                        toast.error('Internal server error')
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Error while creating vendor ');
                });
        }
    }

    const clearText = () => {
        setUserName(dataById.username)
        setPassword(dataById.password)
        setConfirmPassword(dataById.password)
        setMobileNo(parseInt((dataById.mobileNum)?.replace(/-/g, '')))
        setEmail(dataById.email)
        setRoleType(dataById.roleId)
        setPersonContact(dataById.personContact)
        setPosition(dataById.position)
        setCompPhone(parseInt((dataById.compPhone)?.replace(/-/g, '')))
        setExt(parseInt((dataById.ext)?.replace(/-/g, '')))
        setAvalblnc(dataById.availBalance)
        setCrdblnc(dataById.creditLimit)
        setSalesResp(dataById.salesresp)
        setSalesMail(dataById.salesemail)
        setSalesMobile(parseInt((dataById.salesemobile)?.replace(/-/g, '')))
        setBillingNumber(parseInt((dataById.billingmsisdn)?.replace(/-/g, '')))
        setCountryCode(parseInt((dataById.countycode)?.replace(/-/g, '')))
        setpersonContactNo(parseInt((dataById.mobile)?.replace(/-/g, '')))
    }

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='Modify Vendor'>
                    <Link to='/operatorConfig/userTypeManagement/viewUserType' state={{ value: '1' }} style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </Heading>
                <div className='d-flex justify-content-center flex-wrap align-items-center'>
                    <TextField className='m-2' type='text' label="User Name" variant="outlined" autoFocus='true' value={userName} onChange={(event) => { setUserName(event.target.value) }} />
                    <FormControl variant="outlined" className='m-2' style={{ width: '25%' }} >
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
                            onChange={(event) => { setPassword(event.target.value) }}
                            error={password?.length !== 0 && (password?.length < 6)} />
                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}>
                            *Password should be minimum 6 characters</label>
                    </FormControl>
                    <TextField className='m-2' type='password' label="Confirm Password" variant="outlined" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }} error={confirmPassword !== password} helperText={(confirmPassword !== password) && 'password not match'} />
                    <TextField className='m-2' type='number' label="Mobile No." variant="outlined" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} error={mobileNo?.length !== 0 && (mobileNo?.length < 12)} />
                    <TextField className='m-2' type='text' label="Person Contact Name" variant="outlined" value={personContact} onChange={(e) => { setPersonContact(e.target.value) }} />
                    <TextField className='m-2' type='text' label="Position" variant="outlined" value={position} onChange={(e) => { setPosition(e.target.value) }} />
                    <TextField className='m-2' type='number' label="Person Contact Mobile No." variant="outlined" value={personContactNo} onChange={(e) => { setpersonContactNo(e.target.value) }} error={personContactNo?.length !== 0 && (personContactNo?.length < 12)} />
                    <TextField className='m-2' type='email' label="Email Id" variant="outlined" value={email} onChange={(e) => { setEmail(e.target.value) }} error={email?.length !== 0 && (!email?.endsWith('.com'))} />
                    <TextField className='m-2' type='number' label="Component Phone" variant="outlined" value={compPhone} onChange={(e) => { setCompPhone(e.target.value) }} error={compPhone?.length !== 0 && compPhone?.length < 12} />
                    <TextField className='m-2' type='text' label="Ext." variant="outlined" value={ext} onChange={(e) => { setExt(e.target.value) }} />

                    <TextField className='m-2' type='text' label="Sales Resp" variant="outlined" value={salesResp} onChange={(event) => { setSalesResp(event.target.value) }} />
                    <TextField className='m-2' type='email' label="Sales Email" variant="outlined" value={salesMail} onChange={(e) => { setSalesMail(e.target.value) }} error={salesMail?.length !== 0 && salesMail?.length < 12} />
                    <TextField className='m-2' type='number' label="Sales Mobile" variant="outlined" value={salesMobile} onChange={(e) => { setSalesMobile(e.target.value) }} error={salesMobile?.length !== 0 && salesMobile?.length < 12} />
                    <TextField className='m-2' type='number' label="Billing Number" variant="outlined" value={billingNumber} onChange={(e) => { setBillingNumber(e.target.value) }} />

                    <TextField className='m-2' type='number' label="Country Code" variant="outlined" value={countryCode} onChange={(e) => { setCountryCode(e.target.value) }} />
                    <FormControl className='m-2' style={{ width: '25%' }} >
                        <InputLabel id="demo-simple-select-label">Select Role Type</InputLabel>
                        <Select
                            className='w-100'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={roleType}
                            error={(roleType?.length !== 0) && (roleType?.length < 5)}
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
                    <TextField className='m-2' type='number' label="Available Balance" variant="outlined" value={avalblnc} onChange={(e) => { setAvalblnc(e.target.value) }} error={avalblnc?.length !== 0 && (avalblnc?.length === 0)} />
                    <TextField className='m-2' type='number' label="Credit Limit" variant="outlined" value={crdblnc} onChange={(e) => { setCrdblnc(e.target.value) }} error={crdblnc?.length !== 0 && crdblnc?.length === 0} />

                </div>
                <div className='d-flex justify-content-center my-5'>
                    <CommanButton className='btnSend mx-4' onClick={onSubmit} >Submit </CommanButton>
                    <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
                </div>
            </div>
        );
    }


}

export default ModifyVendor;