import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Input } from "reactstrap";
import { Modal } from 'react-bootstrap';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Pagination, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { Textarea } from "@mui/joy";
import { getAllCampaign, getCampaignApproval } from "./slice/Campaign";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../../components/header/Heading";
import Empty from "../../../components/empty/Empty";
import CommanButton from "../../../components/CommanButton";
import Loader from "../../../components/loader/Loader";
import BackDropLoader from "../../../components/loader/BackDropLoader";

function CampaignApproval() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)
    const [campFilter, setCampFilter] = useState(false)
    const [loading, setloading] = useState(true)
    const [backdrop, setbackdrop] = useState(false)
    const [campList, setcampList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;


    const getCampList = () => {
        setloading(true)
        dispatch(getAllCampaign(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setcampList(resp?.payload?.data);
                } else {
                    toast.error('Internal server error')
                }
                setloading(false)
            })
            .catch((error) => {
                console.error(error);
                setloading(false)
                toast.error('Error while fetching list');
            });
    }

    const campaignApproval = (status, campId) => {
        setbackdrop(true)
        dispatch(getCampaignApproval({ token: token, status: status, campId: campId }))
            .then((resp) => {
                if (resp?.payload?.data === 200) {
                    toast.info("Campaign Approved Successfully")
                    getCampList();
                }
                else {
                    toast.info("Error While Approving Campaign ")
                }
                setbackdrop(false)
            })
            .catch((error) => {
                console.error(error);
                setbackdrop(false)
                toast.error('Error while Approving Campaign');
            });
    }


    useEffect(() => {
        getCampList();
    }, [])

    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = campList?.slice(indexofFirst, indexofLast)

    if (loading) {
        return <Loader />
    }
    return (
        <div className="mx-3">
            {/* <b>
                        <h5 className='campFilter '> Campaign Filter
                            <div className=''>
                                <Button style={{ border: 'none', textDecoration: 'none', backgroundColor: 'transparent', }} onClick={() => { setCampFilter(!campFilter) }}>
                                    {campFilter ?
                                        <div className="btnBack mb-3" ><IndeterminateCheckBoxIcon /></div>
                                        :
                                        <div className="btnBack mb-3" ><AddBoxIcon /></div>
                                    }
                                </Button>
                            </div>
                        </h5>
                    </b>
                    {
                        campFilter &&

                        <div className="d-flex justify-content-end mx-2 " style={{ fontSize: '13px' }}>
                            New | Running | Approve | Paused | Completed | Reject | All | Date Wise
                        </div>
                    } */}

            <Heading name='View Campaign Approval' ></Heading>
            {
                campList?.length === 0
                    ?
                    <Empty name='Template Not Found' />
                    :
                    <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded" >
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                                <TableRow className='bodyColor'>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" >Campaign Name</TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" >Start Date</TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" >End Date</TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" >Message/Flow</TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" >Status</TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" colSpan={3}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activePage.map((camp, index) => (
                                    <ViewCampApproval
                                        key={index}
                                        list={camp}
                                        approval={campaignApproval}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }

            {
                campList?.length > perPage
                &&
                <div className='d-flex justify-content-center my-4'>
                    <Pagination count={Math.ceil(campList?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                </div>
            }
            <BackDropLoader opener={backdrop} />
        </div>
    );
}


export default CampaignApproval;


const ViewCampApproval = ({ list, approval }) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState({});
    const status = data.STATUS;





    useEffect(() => {
        setData(list);
        // console.log(list)
    }, [list]);

    const showModal = () => {
        setModal(!modal);
    }

    const campStatus = () => {
        let statusCamp = data.STATUS
        if (status === 'N') {
            statusCamp = "NEW"
        }
        else if (status === 'R') {
            statusCamp = "RUNNING"
        }
        else if (status === 'A') {
            statusCamp = "APPROVED"
        }
        else if (status === 'E') {
            statusCamp = "REJECTED"
        }
        else if (status === 'P') {
            statusCamp = "PAUSED"
        }
        else if (status === 'T') {
            statusCamp = "TESTED"
        }
        else if (status === 'C') {
            statusCamp = "CAMPLETED"
        }
        else {
            statusCamp = "PENDING"
        }
        return statusCamp;
    }

    const [radioValue, setRadioValue] = useState("msisdn");

    const handleRadioButton = (e) => {
        setRadioValue(e.target.value);
    }


    return (
        <TableRow >
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }}>
                {data.CAMPAIGN_NAME}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.START_DATE?.slice(0, 10)}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.END_DATE?.slice(0, 10)}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.CAMPAIGN_MESSAGE}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: 'blueviolet', fontWeight: '600' }}>
                {campStatus()}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <button className="border-0" style={{ background: 'transparent' }} onClick={showModal}>
                    <p style={{ color: 'blue', fontWeight: 'bolder' }}>Test</p>
                </button>

                <Modal show={modal} onHide={showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className=''>Tested</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You are testing '{data.campName}' Campaign :
                        <RadioGroup className="d-flex justify-content-center flex-row"
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="msisdn"
                            name="radio-buttons-group"
                            value={radioValue}
                            onClick={handleRadioButton}>
                            <FormControlLabel value="msisdn" control={<Radio />} label="Msisdn" />
                            <FormControlLabel value="group" control={<Radio />} label="Group" />
                        </RadioGroup>

                        {
                            radioValue === "msisdn" &&
                            <div className="">
                                <div className="d-flex justify-content-center">
                                    <select>
                                        <option>GSM</option>
                                        <option>CDMA</option>
                                    </select>
                                </div>

                                <div className="d-flex align-items-center mx-4 ">
                                    <Col sm={3}>
                                        <lable>Enter Msisdn :</lable>
                                    </Col>
                                    <Col sm={8}>
                                        <Textarea className='my-2 border border-primary' id="outlined-basic" rows={3} type='text' />
                                    </Col>
                                </div>
                            </div>
                        }
                        {
                            radioValue === "group" &&

                            < div className="d-flex align-items-center mx-4 justify-content-center ">
                                <div className="w-50 ">
                                    <FormControl fullWidth className='my-2'>
                                        <InputLabel id="demo-simple-select-label">Select Group</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={1}
                                            label="Select Group">
                                            <MenuItem value={1}>Select</MenuItem>
                                            <MenuItem value={2}>Test_Group</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        }
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <CommanButton className='btnBack mx-4' >
                            Submit
                        </CommanButton>
                        <CommanButton className='btnBack mx-4' >
                            Clear
                        </CommanButton>
                    </Modal.Footer>
                </Modal>
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <button className="border-0" style={{ background: 'transparent' }} onClick={() => approval('A', data.CAMPAIGN_ID)} >
                    <p style={{ color: 'green', fontWeight: 'bolder' }}>Approve</p>
                </button>
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <button className="border-0" style={{ background: 'transparent' }} >
                    <p style={{ color: 'red', fontWeight: 'bolder' }}>Reject</p>
                </button>
            </TableCell>
        </TableRow>
    );
}