import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FormControl, InputLabel, Select, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getSystemCountryCode } from '../countryCode/slice/CountryCode';
import { modifyServer } from './slice/Server';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';



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
function ModifyServer() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state?.token?.data?.token)
    const location = useLocation();
    const [selectedCountry, setSelectedCountry] = useState(JSON.parse(location.state.data.countryCode));
    const [serverName, setServerName] = useState(location.state.data?.serverName); // data from view page
    const [countryCode, setCountryCode] = useState([]); // data from view page
    const [countryList, setCountryList] = useState([]); // list of country ;
    const serverId = location.state.data.id


    const handleName = (e) => {
        if (e.target.value === "") {
            toast.error("Please Enter Server Name", {
                toastId: serverN
            })
        }
        else {
            setServerName(e.target.value)
        }
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
        getCountryName();
        setCountryCode(selectedCountry?.map((val) => { return val.countryCode }))
    }, [])


    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setCountryCode(value);
    };

    const onSubmit = () => {
        let request = {
            "serverName": serverName,
            "countryCode": countryCode.toString()
        }

        // callApi.updateSystemServer(serverId, request)
        dispatch(modifyServer({ token: token, id: serverId, data: request }))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    toast.success("Server Update Successfully");
                    navigate('/systemConfiguration/serverManagement')
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error While Adding Server");
            });
    }

    const clearText = () => {
        setServerName(location.state.data?.serverName);
        setCountryCode(selectedCountry?.map((val) => { return val.countryCode }))
    }

    return (
        <div className='mx-3' >
            <Heading name='Modify Server'>
                <Link to='/systemConfiguration/serverManagement' style={{ textDecoration: 'none' }}>
                    <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </Heading>
            <div className='d-flex justify-content-center'>
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
                                }} >
                                {countryList.map((list) => (
                                    <option key={list} value={list.country_code} selected={countryCode?.includes(list.country_code)} >
                                        {list.country_name}({list.country_code})
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Col>

                </Row>
            </div>
            <div className='d-flex justify-content-center my-4'>
                <CommanButton className='btnSend mx-4' onClick={onSubmit} >Submit </CommanButton>
                <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
            </div>
        </div>
    );


}

export default ModifyServer;