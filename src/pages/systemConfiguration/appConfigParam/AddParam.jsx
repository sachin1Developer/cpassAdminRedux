import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { addAppParams } from './slice/AppConfigParam';
import { useDispatch, useSelector } from 'react-redux';
import CommanButton from '../../../components/CommanButton';



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

function AddParam() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)
    const navigate = useNavigate()
    const [paramType, setParamType] = useState("");
    const [paramTag, setParamTag] = useState("");
    const [owner, setOwner] = useState("");
    const [paramValue, setParamValue] = useState("");
    const [remarks, setRemarks] = useState("");


    const onSubmit = () => {
        let request = {
            "paramTag": paramTag,
            "paramValue": paramValue,
            "remarks": remarks,
            "owner": owner,
            "paramType": paramType,
            "interfaceType": "NA"
        }
        console.log(request);
        if (paramTag === "") {
            toast.error("Please Enter Param Tag");
        }
        else if (paramType === "") {
            toast.error("Please Enter Param Type");
        }
        else if (paramValue === "") {
            toast.error("Please Enter Param Value");
        }
        else if (remarks === "") {
            toast.error("Please Enter Remarks");
        }
        else if (owner === "") {
            toast.error("Please Enter Owner");
        }
        else {
            if (request !== "" && request !== null) {
                dispatch(addAppParams({ token: token, data: request }))
                    .then((resp) => {
                        if (resp?.payload?.status === 200) {
                            navigate('/systemConfiguration/appConfigParam')
                        } else {
                            toast.error('Internal server error')
                        }
                    })
                    .catch((error) => {
                        toast.error('error while creating');
                    });
            }
            else {
                toast.error("Please Enter Details");
            }
            if (paramTag === "") {
                toast.error("Please Enter Param Tag");
            }
            else if (paramType === "") {
                toast.error("Please Enter Param Type");
            }
            else if (paramValue === "") {
                toast.error("Please Enter Param Value");
            }
            else if (remarks === "") {
                toast.error("Please Enter Remarks");
            }
            else if (owner === "") {
                toast.error("Please Enter Owner");
            }
        }
    }

    const clearText = () => {
        setParamTag("");
        setParamType("");
        setParamValue("");
        setRemarks("");
        setOwner("");
    }

    return (
        <Container>
            <div>
                <div className=' d-flex justify-content-between my-2 align-items-center'>
                    <h4 className='fw-bold mx-2'>Add Param ✨
                    </h4>
                    <div className='mx-2'>
                        <Link to='/systemConfiguration/appConfigParam' style={{ textDecoration: 'none' }}>
                            <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</CommanButton>
                        </Link>
                    </div>
                </div>
                <div>
                    <Row className='d-flex justify-content-center'>
                        <Col sm={4}>
                            <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Param Tag" variant="outlined" autoFocus='true' onChange={(e) => { setParamTag(e.target.value) }} />
                        </Col>
                        <Col sm={4}>
                            <FormControl fullWidth className='my-2'>
                                <InputLabel id="demo-simple-select-label">Param Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={paramType}
                                    label="Param Type"
                                    MenuProps={MenuProps}

                                    onChange={(e) => { setParamType(e.target.value) }} >
                                    {/* {roleView?.map((listRole) => {
                                        return <MenuItem value={listRole?.roleId}>{listRole?.roleName}</MenuItem>
                                    })} */}
                                    <MenuItem value={"STRING"}>String</MenuItem>
                                    <MenuItem value={"BOOL"}>Boolean</MenuItem>
                                    <MenuItem value={"INT"}>Integer</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>

                    </Row>
                </div>
                <div>
                    <Row className='d-flex justify-content-center'>
                        <Col sm={4}>
                            <TextField className='my-2 w-100' id="outlined-basic" type='text' label="Remarks" variant="outlined" onChange={(e) => { setRemarks(e.target.value) }} />
                        </Col>
                        <Col sm={4}>
                            <FormControl fullWidth className='my-2'>
                                <InputLabel id="demo-simple-select-label">Owner</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={owner}
                                    label="Owner"
                                    MenuProps={MenuProps}
                                    onChange={(e) => { setOwner(e.target.value) }} >
                                    {/* {roleView?.map((listRole) => {
                                        return <MenuItem value={listRole?.roleId}>{listRole?.roleName}</MenuItem>
                                    })} */}
                                    <MenuItem value={"SYSTEM"}>SYSTEM</MenuItem>
                                    <MenuItem value={"OPERATOR"}>OPERATOR</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className='d-flex justify-content-center'>
                        <Col sm={4}>
                            {paramType === "BOOL" ? <FormControl fullWidth className='my-2'>
                                <InputLabel id="demo-simple-select-label">Param Value</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={paramValue}
                                    label="Param Value"
                                    MenuProps={MenuProps}
                                    onChange={(e) => { setParamValue(e.target.value) }} >
                                    {/* {roleView?.map((listRole) => {
                                        return <MenuItem value={listRole?.roleId}>{listRole?.roleName}</MenuItem>
                                    })} */}
                                    <MenuItem value={"Y"}>Y</MenuItem>
                                    <MenuItem value={"N"}>N</MenuItem>
                                </Select>
                            </FormControl> : <TextField className='my-2 w-100' id="outlined-basic" type='number' label="Param Value" variant="outlined" onChange={(e) => { setParamValue(e.target.value) }} />}

                        </Col>
                        <Col sm={4}>
                        </Col>
                    </Row>
                </div>
                <div className='d-flex justify-content-center my-4'>
                    <CommanButton className='btnSend mx-4' onClick={onSubmit}>Submit </CommanButton>
                    <CommanButton className='btnSend mx-4' onClick={clearText}>Clear</CommanButton>
                </div>
            </div>
        </Container >
    );


}

export default AddParam;