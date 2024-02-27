import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, Redirect, useLocation, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CommanButton from '../../../components/CommanButton';
import { useDispatch, useSelector } from 'react-redux';
import { addPolicyManagement } from './slice/PolicyManagement';
import BackDropLoader from '../../../components/loader/BackDropLoader';


const namePId = "nameId";
const smsCountId = "smsCountId";
const smsDaysId = "smsDaysId";
const smsDiffId = "smsDiffId";
const obdCountId = "obdCountId";
const obdDaysId = "obdDaysId";
const obdDiffId = "obdDiffId";
const totalCountId = "totalCountId";
const totalDaysId = "totalDaysId";
const promoDiffId = "promoDiffId";
const overridePolicyId = "overridePolicyId";
const policyStatusId = "policyStatusId";
const descriptionId = "descriptionId";

function AddPolicy() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const name = location.state?.data;
    let token = useSelector(state => state.token?.data?.token)

    const [policyName, setPolicyName] = useState("");
    const [smsCount, setSmsCount] = useState("");
    const [smsDays, setSmsDays] = useState("");
    const [smsDiff, setSmsDiff] = useState("")
    const [obdCount, setObdCount] = useState("");
    const [obdDays, setObdDays] = useState("");
    const [obdDiff, setObdDiff] = useState("");
    const [totalCount, setTotalCount] = useState("");
    const [totalDays, setTotalDays] = useState("");
    const [promoDiff, setPromoDiff] = useState("");
    const [overridePolicy, setOverridePolicy] = useState("");
    const [policyStatus, setPolicyStatus] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false)

    const checkPolicy = () => {
        let flag = false;
        if (policyName === "") {
            flag = true
            toast.error("Please Enter Policy Name", {
                toastId: namePId
            })
        }
        else if (smsCount === "") {
            flag = true
            toast.error("Please Enter SMS Count", {
                toastId: smsCountId
            })
        }
        else if (smsDays === "") {
            flag = true
            toast.error("Please Enter SMS Days", {
                toastId: smsDaysId
            })
        }
        else if (smsDiff === "") {
            flag = true
            toast.error("Please Enter SMS Diff ", {
                toastId: smsDiffId
            })
        }
        else if (obdCount === "") {
            flag = true
            toast.error("Please Enter OBD Count", {
                toastId: obdCountId
            })
        }
        else if (obdDays === "") {
            flag = true
            toast.error("Please Enter OBD Days", {
                toastId: obdDaysId
            })
        }
        else if (obdDiff === "") {
            flag = true
            toast.error("Please Enter OBD Diff ", {
                toastId: obdDiffId
            })
        }
        else if (totalCount === "") {
            flag = true
            toast.error("Please Enter Total Count", {
                toastId: totalCountId
            })
        }
        else if (totalDays === "") {
            flag = true
            toast.error("Please Enter Total Days", {
                toastId: totalDaysId
            })
        }
        else if (promoDiff === "") {
            flag = true
            toast.error("Please Enter Promo Diff ", {
                toastId: promoDiffId
            })
        }
        else if (policyStatus === "") {
            flag = true
            toast.error("Please Enter Policy Status ", {
                toastId: policyStatusId
            })
        }
        else if (description === "") {
            flag = true
            toast.error("Please Enter Description", {
                toastId: descriptionId
            })
        }
        else if (totalDays === "") {
            flag = true
            toast.error("Please Enter Total Days", {
                toastId: totalDaysId
            })
        }
        // else if (promoDiff === "") {
        //     flag = true
        //     toast.error("Please Enter Promo Diff ")
        // }
        return flag;
    }

    const handlePolicyName = (e) => {
        setPolicyName(e.target.value)
        let flag = false
        name.map((value) => {
            if (e.target.value === value?.policyName) {
                flag = true
                setPolicyName(e.target.value)
            }
        })
        if (flag === false) {
            setPolicyName(e.target.value)
        }
        else {
            toast.error("This range name is already exist", {
                toastId: namePId
            })
        }
    }
    const handleSmsCount = (e) => {
        let maxLength = 3;
        if (e.target.value.length <= maxLength) {
            setSmsCount(e.target.value)
        }
        else if (e.target.value.length > maxLength) {
            toast.info("Max Length is 3 ")
        }
    }
    const handleSmsDays = (e) => {
        let maxLength = 3;
        if (e.target.value.length <= maxLength) {
            setSmsDays(e.target.value)
        }
        else if (e.target.value.length > maxLength) {
            toast.info("Max Length is 3 ")
        }
    }
    const handleSmsDiff = (e) => {
        let maxLength = 3;
        if (e.target.value.length <= maxLength) {
            setSmsDiff(e.target.value)
        }
        else if (e.target.value.length > maxLength) {
            toast.info("Max Length is 3 ")
        }
    }
    const handleObdCount = (e) => {
        let maxLength = 3;
        if (e.target.value.length <= maxLength) {
            setObdCount(e.target.value)
        }
        else if (e.target.value.length > maxLength) {
            toast.info("Max Length is 3 ")
        }
    }
    const handleObdDays = (e) => {
        let maxLength = 3;
        if (e.target.value.length <= maxLength) {
            setObdDays(e.target.value)
        }
        else if (e.target.value.length > maxLength) {
            toast.info("Max Length is 3 ")
        }
    }
    const handleObdDiff = (e) => {
        let maxLength = 3;
        if (e.target.value.length <= maxLength) {
            setObdDiff(e.target.value)
        }
        else if (e.target.value.length > maxLength) {
            toast.info("Max Length is 3 ")
        }
    }
    const handleTotalCount = (e) => {
        let maxLength = 3;
        if (e.target.value.length <= maxLength) {
            setTotalCount(e.target.value)
        }
        else if (e.target.value.length > maxLength) {
            toast.info("Max Length is 3 ")
        }
    }
    const handleTotalDays = (e) => {
        let maxLength = 3;
        if (e.target.value.length <= maxLength) {
            setTotalDays(e.target.value)
        }
        else if (e.target.value.length > maxLength) {
            toast.info("Max Length is 3 ")
        }
    }
    const handlePromoDiff = (e) => {
        let maxLength = 3;
        if (e.target.value.length <= maxLength) {
            setPromoDiff(e.target.value)
        }
        else if (e.target.value.length > maxLength) {
            toast.info("Max Length is 3 ")
        }
    }
    const handleOverridePolicy = (e) => {
        setOverridePolicy(e.target.value)
    }
    const handlePolicyStatus = (e) => {
        setPolicyStatus(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }


    const onSubmit = () => {
        let check = checkPolicy();
        if (check === false) {
            let response = {
                "policyName": policyName,
                "smsCount": smsCount,
                "smsDays": smsDays,
                "obdCount": obdCount,
                "obdDays": obdDays,
                "totalCount": totalCount,
                "totalDays": totalDays,
                "promoDifference": promoDiff,
                "status": policyStatus,
                "owner": "Operator",
                "description": description,
                "smsPromoDifference": smsDiff,
                "obdPromoDifference": obdDiff
            }
            let flag = false
            name.map((value) => {
                if (policyName === value?.policyName) {
                    flag = true
                }
            })
            if (flag) {
                toast.error("This range name is already exist", {
                    toastId: namePId
                })
            }
            else {
                setLoading(true)
                dispatch(addPolicyManagement({ data: response, token: token }))
                    .then((resp) => {
                        console.log(resp)
                        if (resp?.payload?.data === 'Policy saved successfully') {
                            navigate('/operatorConfig/viewPolicy')
                            setLoading(false);
                        } else {
                            toast.error('Internal server error')
                            setLoading(false);
                        }
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.error(error);
                        toast.error('Error while fetching subscriber range list');
                    });
            }

        }
    }

    const clearText = () => {
        setPolicyName("");
        setSmsCount("")
        setSmsDays("");
        setSmsDiff("");
        setObdCount("");
        setObdDays("");
        setObdDiff("");
        setTotalCount("");
        setTotalDays("");
        setPromoDiff("");
        setOverridePolicy("");
        setPolicyStatus("");
        setDescription("");
    }


    return (
        <div className='mx-3'>
            {/* {
                policyResp === "Policy saved successfully" &&
                <Redirect to="/operatorConfig/viewPolicy" />
            } */}
            <div>
                <div className=' d-flex justify-content-between my-2 align-items-center'>
                    <h4 className='fw-bold mx-2'>Add Policy ✨
                    </h4>
                    <div className='mx-2'>
                        <Link to='/operatorConfig/viewPolicy'>
                            <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                        </Link>
                    </div>
                </div>

                <div className='container'>
                    <div className=' d-flex justify-content-center flex-column' style={{ color: 'black' }} >
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'> Policy Name</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <input className='border border-1 rounded border-dark w-100' placeholder='Policy Name' type='text' value={policyName} onChange={handlePolicyName} />
                            </div>
                        </div>
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'> SMS Count</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <Tooltip title={"Total SMS Sent to a number in Below Defined SMS Days"}>
                                    <input className='border border-1 rounded border-dark w-100' placeholder='SMS Count' type='number' max={3} value={smsCount} onChange={handleSmsCount} />
                                    <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center justify-content-center'>
                            <div className='col'> SMS Days</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <Tooltip title={"Total Days In Which Above Specified Total SMS Are sent"} >
                                    <input className='border border-1 rounded border-dark w-100' placeholder='SMS Days' type='number' max={3} value={smsDays} onChange={handleSmsDays} />
                                    <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'> SMS DIFF</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <Tooltip title={"SMS Differnce After One SMS Sent"} >
                                    <input className='border border-1 rounded border-dark w-100' placeholder='SMS DIFF' type='number' max={3} value={smsDiff} onChange={handleSmsDiff} />
                                    <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'> OBD Count</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <Tooltip title={"Total OBD Sent To A Number In Below Defined OBD Days"} >
                                    <input className='border border-1 rounded border-dark w-100' placeholder='OBD Count' max={3} value={obdCount} type='number' onChange={handleObdCount} />
                                    <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'> OBD Days</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <Tooltip title={"Total Days In Which Above Specified Total OBD Are Sent"} >
                                    <input className='border border-1 rounded border-dark w-100' placeholder='OBD Days' max={3} value={obdDays} type='number' onChange={handleObdDays} />
                                    <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'> OBD DIFF</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <Tooltip title={"OBD Difference after one obd sent"}  >
                                    <input className='border border-1 rounded border-dark w-100' placeholder='OBD DIFF' max={3} value={obdDiff} type='number' onChange={handleObdDiff} />
                                    <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'> Total Count</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <Tooltip title={"Total SMS/OBD Sent to a number in Below Defined Total Days"} >
                                    <input className='border border-1 rounded border-dark w-100' placeholder='Total Count' max={3} value={totalCount} type='number' onChange={handleTotalCount} />
                                    <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'> Total Days</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <Tooltip title={"Total Days in which above specified Total SMS/OBD are sent"}  >
                                    <input className='border border-1 rounded border-dark w-100' placeholder='Total Days' max={3} value={totalDays} type='number' onChange={handleTotalDays} />
                                    <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'> Promo DIFF</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <Tooltip title={"OBD Difference after one obd sent"} >
                                    <input className='border border-1 rounded border-dark w-100' placeholder='Promo DIFF' max={3} value={promoDiff} type='number' onChange={handlePromoDiff} />
                                    <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                                </Tooltip>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'>Override Policy</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <select className='border border-1 rounded border-dark w-100' value={overridePolicy} style={{ color: 'black' }} onChange={handleOverridePolicy}>
                                    <option>Select</option>
                                    <option value="SYSTEM">No</option>
                                    <option value="OPERATOR">Yes</option>
                                </select>
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> For Unlimited,Please Select Yes</label>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'>Policy Status</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <select className='border border-1 rounded border-dark w-100' value={policyStatus} style={{ color: 'black' }} onChange={handlePolicyStatus} >
                                    <option>Select</option>
                                    <option value='Y'>Active</option>
                                    <option value='N'>Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center my-2 justify-content-center'>
                            <div className='col'>Description</div>
                            <div className='col'>:</div>
                            <div className='col' >
                                <textarea className='border border-1 rounded border-dark w-100' rows={4} type='text' value={description} style={{ color: 'black' }} onChange={handleDescription} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-center my-4'>
                    <CommanButton className='btnSend mx-4' onClick={onSubmit} >Add Policy</CommanButton>
                    <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
                </div>
            </div>
            <BackDropLoader opener={loading} />
        </div>
    )
}

export default AddPolicy;