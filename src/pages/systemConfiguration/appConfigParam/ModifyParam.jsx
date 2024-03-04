
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppParam } from './slice/AppConfigParam';
import Heading from '../../../components/header/Heading';
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


function ModifyParam() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)
    const navigate = useNavigate()

    const location = useLocation();
    console.log(location.state.data);

    const paramId = location.state.data?.paramId;

    const [paramType, setParamType] = useState(location.state.data?.paramType)
    const [paramTag, setParamTag] = useState(location.state.data?.paramTag);
    const [owner, setOwner] = useState(location.state.data?.owner);
    const [paramValue, setParamValue] = useState(location.state.data?.paramValue);
    const [remarks, setRemarks] = useState(location.state.data?.remarks);

    const [responseData, setResponseData] = useState([]);

    const onSubmit = () => {
        let request = {
            "paramTag": paramTag,
            "paramValue": paramValue,
            "remarks": remarks,
            "owner": owner,
            "paramType": paramType,
            "interfaceType": "NA"
        }
        if (request !== "") {
            dispatch(updateAppParam({ token: token, id: paramId, data: request }))
                .then((resp) => {
                    if (resp?.payload?.status === 200) {
                        navigate('/systemConfiguration/appConfigParam')
                    } else {
                        toast.error('Internal server error')
                    }
                })
                .catch((error) => {
                    // console.error(error);
                    toast.error('Error while updating');
                });
            // console.log(paramTag, "    ", paramType, "    ", paramValue, "     ", owner, "     ", remarks);
        }
    }

    const clearText = () => {
        setParamTag(location.state.data?.paramTag);
        setParamType(location.state.data?.paramType);
        setParamValue(location.state.data?.paramValue);
        setRemarks(location.state.data?.remarks);
        setOwner(location.state.data?.owner);
    }

    return (

        <div>
            <Heading name='Modify Param'>
                <Link to='/systemConfiguration/appConfigParam' style={{ textDecoration: 'none' }}>
                    <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </Heading>
            <div>
                <Row className='d-flex justify-content-center'>
                    <Col sm={4}>
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label=" Param Tag" variant="outlined" autoFocus='true' value={paramTag} />
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
                            >
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
                        <TextField className='my-2 w-100' id="outlined-basic" type='text' label="Remarks" variant="outlined" value={remarks} />
                    </Col>
                    <Col sm={4}>
                        <FormControl fullWidth className='my-2'>
                            <InputLabel id="demo-simple-select-label">Owner</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={owner}
                                label="Owner"
                                MenuProps={MenuProps} >
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
                        </FormControl> : <TextField className='my-2 w-100' id="outlined-basic" type='number' label="Param Value" variant="outlined" value={paramValue} onChange={(e) => { setParamValue(e.target.value) }} />}
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
    );


}

export default ModifyParam;