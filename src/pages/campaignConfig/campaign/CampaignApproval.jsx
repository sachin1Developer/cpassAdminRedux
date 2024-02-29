import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Input } from "reactstrap";
import { Modal } from 'react-bootstrap';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Pagination, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { Textarea } from "@mui/joy";
import { getAllCampaign, getCampaignApproval } from "./slice/Campaign";
import { useDispatch, useSelector } from "react-redux";

function CampaignApproval() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)
    const [campFilter, setCampFilter] = useState(false)
    const [campList, setcampList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;
    const [approvalResp, setApprovalResp] = useState()


    const getCampList = () => {
        dispatch(getAllCampaign(token))
            .then((resp) => {
                setcampList(resp?.payload?.data);
                // console.log(resp.data)
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while approving campaign');
            });
    }

    const campaignApproval = (status, campId) => {
        dispatch(getCampaignApproval({ token: token, status: status, campId: campId }))
            .then((resp) => {
                if (resp?.payload?.data === 1) {
                    setApprovalResp(resp?.payload?.data);
                    console.log(resp)
                    toast.info("Campaign Approved Successfully")
                    getCampList();
                }
                else {
                    toast.info("Error While Approving Campaign ")
                }
                // console.log(resp)
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while Approving Campaign');
            });
    }


    useEffect(() => {
        getCampList();
    }, [])

    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = campList.slice(indexofFirst, indexofLast)


    return (
        <div className='d-flex'>
            <div className='container '>
                <div className="mx-4">
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

                    <b>
                        <h3 className='pvmHeading text-slate-800'>View Campaign Approval ✨ </h3>
                    </b>
                    <TableContainer className="my-4" style={{}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className='bodyColor'>
                                    <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', backgroundColor: '#d6d6f7', padding: 0 }}>Campaign Name</TableCell>
                                    <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', backgroundColor: '#d6d6f7', padding: 0 }}>Start Date</TableCell>
                                    <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', backgroundColor: '#d6d6f7', padding: 0 }}>End Date</TableCell>
                                    <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', backgroundColor: '#d6d6f7' }}>Message/Flow</TableCell>
                                    <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', backgroundColor: '#d6d6f7' }}>Status</TableCell>
                                    <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', backgroundColor: '#d6d6f7' }} colSpan={3}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {activePage.map((camp, index) => (
                                <ViewCampApproval
                                    key={index}
                                    list={camp}
                                    approval={campaignApproval}
                                />
                            ))}
                        </Table>
                    </TableContainer>

                </div>
                <div className='d-flex justify-content-center my-4'>
                    <Pagination count={Math.ceil(campList.length / 10)} color="primary" onChange={(e, p) => setCurrentPage(p)} />
                </div>
            </div>
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


    const token = localStorage.getItem("Bearer");

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

    // CAMPAIGN_ID
    // STATUS

    return (
        <TableBody className="">
            {/* {
                token === null && <Redirect to='/' />
            } */}
            <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" align="center" scope="row" style={{ color: 'rgb(40,165,233)', fontWeight: '600', fontSize: '12px', padding: 0 }}>
                    {data.CAMPAIGN_NAME}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: 8 }}>
                    {data.START_DATE?.slice(0, 10)}
                </TableCell>
                <TableCell align="center" style={{ fontSize: '12px', padding: 8 }}>
                    {data.END_DATE?.slice(0, 10)}
                </TableCell>
                <TableCell align="center" style={{ fontSize: '12px', padding: 10 }} width="380px">
                    {data.CAMPAIGN_MESSAGE}
                </TableCell>
                <TableCell align="center" style={{ color: 'blueviolet', fontWeight: 'bolder', fontSize: '12px', padding: 0 }}>
                    {campStatus()}
                </TableCell>
                <TableCell align="center" style={{ padding: 5 }}>
                    <button className="border-0" onClick={showModal}>
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
                            <Button className='btnBack mx-4' >
                                Submit
                            </Button>
                            <Button className='btnBack mx-4' >
                                Clear
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
                <TableCell align="center" style={{ padding: 5 }}  >
                    <button className="border-0" onClick={() => approval('A', data.CAMPAIGN_ID)} >
                        <p style={{ color: 'green', fontWeight: 'bolder' }}>Approve</p>
                    </button>
                </TableCell>
                <TableCell align="center" style={{ padding: 5 }}>
                    <button className="border-0" >
                        <p style={{ color: 'red', fontWeight: 'bolder' }}>Reject</p>
                    </button>
                </TableCell>
            </TableRow>
        </TableBody >
    );
}