import React, { useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import CommanButton from '../../../components/CommanButton';
import { modifyCampaignInventory } from './slice/Inventory';
import Heading from '../../../components/header/Heading';


const nameRId = "nameId";
const countryCId = "ccId";
const startRId = "startRId";
const endsRId = "endsRId";

function ModifyInventory() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)
    const navigate = useNavigate()

    const location = useLocation();
    console.log(location.state.data)

    const [Interface, setInterface] = useState(location.state.data?.interface);
    const [totalCount, settotalCount] = useState(location.state.data?.total_COUNT);
    const [currentCount, setcurrentCount] = useState(location.state.data?.current_COUNT);


    const [rangeData, setRangeData] = useState([]);

    // const handleInterface = (e) => {
    //     const maxlength = 15;
    //     if (Interface.length >= maxlength) {
    //         setInterface(Interface)
    //         toast.error("Maximum Length is 15", {
    //             toastId: nameRId
    //         })
    //     }
    //     else {
    //         setInterface(e.target.value)
    //     }
    // }

    const handleTotalCount = (e) => {
        settotalCount(e.target.value)
    }



    const onsubmit = () => {
        let rangeId = location.state.data?.rangeId;
        let response = {
            "total_COUNT": totalCount,
            "current_COUNT": currentCount
        }
        dispatch(modifyCampaignInventory({ token: token, id: Interface, data: response }))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    navigate('/systemConfiguration/inventoryConfiguration')
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while updating');
            });
    }

    const clearText = () => {
        setInterface(location.state.data?.interface);
        settotalCount(location.state.data?.total_COUNT)
        setcurrentCount(location.state.data?.current_COUNT);
    }

    return (
        <div className='mx-3'>
            <Heading name='Modify Inventory Configuration'>
                <Link to='/systemConfiguration/inventoryConfiguration'>
                    <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </Heading>
            <div className='container fs-6 fw-medium w-50 my-4'>
                <Row className='text-left'>
                    <Col sm={4}> Interface</Col>
                    <Col sm={1}>:</Col>
                    <Col sm={6}>
                        <p id="outlined-basic" type='text' label="Interface" variant="outlined" >{
                            (Interface === 'S' && 'SMS' || Interface === 'O' && 'OBD' || Interface === 'F' && 'Facebook' || Interface === 'T' && 'Twitter' || Interface === 'U' && 'USSD')
                        } </p>
                    </Col>

                </Row>
                <Row className='text-left'>
                    <Col sm={4}>Current Count</Col>
                    <Col sm={1}>:</Col>
                    <Col sm={6}>
                        <p id="outlined-basic" type='number' label="Current Count" variant="outlined" >{currentCount} </p>
                    </Col>
                </Row>



                <Row className='text-left '>
                    <Col sm={4}>Total Count</Col>
                    <Col sm={1}>:</Col>
                    <Col sm={6}>
                        <Input className='border-secondary' type='number' value={totalCount} onChange={handleTotalCount} />
                    </Col>
                </Row>
            </div>
            <div className='d-flex justify-content-center my-4'>
                <CommanButton className='btnSend mx-4' onClick={onsubmit} >Modify Range</CommanButton>
                <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
            </div>
        </div>
    );


}

export default ModifyInventory;