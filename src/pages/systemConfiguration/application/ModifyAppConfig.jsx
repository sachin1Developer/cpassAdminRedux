import React, { useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, Redirect, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import callApi from '../../../serviceApi/CallApi';
import TextArea from 'antd/es/input/TextArea';


const nameRId = "nameId";
const countryCId = "ccId";
const startRId = "startRId";
const endsRId = "endsRId";

function ModifyAppConfig() {

    const location = useLocation();
    // console.log(location.state.data)

    const [paramId, setparamId] = useState(location.state.data?.paramId);
    const [owner, setowner] = useState(location.state.data?.owner);
    const [paramType, setparamType] = useState(location.state.data?.paramType);
    const [paramTag, setparamTag] = useState(location.state.data?.paramTag);
    const [paramValue, setparamValue] = useState(location.state.data?.paramValue);
    const [remarks, setremarks] = useState(location.state.data?.remarks);


    const [rangeData, setRangeData] = useState([]);

    const handleParamValue = (e) => {
        // const maxlength = 11;
        setparamValue(e.target.value)
        // if (e.target.value.length > maxlength) {

        // }
        // else {
        //     setparamTag(e.target.value)
        // }
    }
    const handleRemarks = (e) => {
        // const maxlength = 7;
        setremarks(e.target.value)
        // if (owner.length >= maxlength) {
        // }
        // else {
        //     setowner(e.target.value)
        // }
    }


    // const onsubmit = () => {
    //     let rangeId = location.state.data?.rangeId;
    //     let response = {
    //         "startsAt": paramType,
    //         "owner": owner,
    //         "paramId": paramId,
    //         "endsAt": paramTag
    //     }
    //     callApi.updateRange(rangeId, response)
    //         .then((resp) => {
    //             setRangeData(resp.status);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             toast.error('Error while submiting subscriber range');
    //         });
    // }

    const clearText = () => {
        setparamId(location.state.data?.paramId);
        setowner(location.state.data?.owner)
        setparamType(location.state.data?.paramType);
        setparamTag(location.state.data?.paramTag);
        setparamValue(location.state.data?.paramValue);
        setremarks(location.state.data?.remarks)
    }

    return (
        <Container>
            {
                rangeData === 200 &&
                <Redirect to="/systemConfiguration/applicationConfiguration" />
            }
            <div>
                <b>
                    <h3 className='pvmHeading text-slate-800'>Modify Application Configuration ✨
                        <div className='my-2'>
                            <Link to='/systemConfiguration/applicationConfiguration'>
                                <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                            </Link>
                        </div>
                    </h3>
                </b>

                <div className='container fs-8 fw-small w-50'>
                    <Row className='text-left'>
                        <Col sm={4}>
                            Param Id
                        </Col>
                        <Col sm={1}>:</Col>
                        <Col sm={6}>
                            <p id="outlined-basic" type='number' label="Param Id" variant="outlined">{paramId} </p>
                        </Col>

                    </Row>
                    <Row className='text-left '>
                        <Col sm={4}>
                            Owner
                        </Col>
                        <Col sm={1}>:</Col>
                        <Col sm={6}>
                            <p id="outlined-basic" type='text' label="Owner" variant="outlined" >{owner}</p>
                        </Col>
                    </Row>
                    <Row className='text-left'>
                        <Col sm={4}>
                            Param Type
                        </Col>
                        <Col sm={1}>:</Col>
                        <Col sm={6}>
                            <p id="outlined-basic" type='text' label="Param Type " variant="outlined" >{paramType}</p>
                        </Col>
                    </Row>
                    <Row className='text-left'>
                        <Col sm={4}>
                            Param Tag
                        </Col>
                        <Col sm={1}>:</Col>
                        <Col sm={6}>
                            <p id="outlined-basic" type='text' label="Param Tag" variant="outlined"  >{paramTag}</p>
                        </Col>
                    </Row>
                    <Row className='text-left'>
                        <Col sm={4}>
                            Param Value
                        </Col>
                        <Col sm={1}>:</Col>
                        <Col sm={6}>
                            <Input className='border-secondary' type='number' value={paramValue} onChange={handleParamValue} />
                        </Col>
                    </Row>
                    <Row className='text-left my-2'>
                        <Col sm={4}>
                            Remarks
                        </Col>
                        <Col sm={1}>:</Col>
                        <Col sm={6}>
                            <TextArea className='border-secondary' id="outlined-basic" type='text' rows={3} label="Remarks" variant="outlined" value={remarks} onChange={handleRemarks} />
                        </Col>
                    </Row>


                </div>
                <div className='d-flex justify-content-center my-4'>
                    <Button className='btnSend mx-4' onClick={onsubmit} >Modify Range</Button>
                    <Button className='btnSend mx-4' onClick={clearText} >Clear</Button>
                </div>
            </div>
        </Container>
    );


}

export default ModifyAppConfig;