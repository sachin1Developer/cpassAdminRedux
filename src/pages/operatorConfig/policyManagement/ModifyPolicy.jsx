import React, { useState } from 'react';
import { Link, Redirect, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TextField, Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { modifyPolicyManagement } from './slice/PolicyManagement';
import BackDropLoader from '../../../components/loader/BackDropLoader';


function ModifyPolicy() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    let token = useSelector(state => state.token?.data?.token)
    console.log(location.state.data)


    const [policyName, setPolicyName] = useState(location.state.data?.policyName);
    const [smsCount, setSmsCount] = useState(location.state.data?.smsCount);
    const [smsDays, setSmsDays] = useState(location.state.data?.smsDays);
    const [smsDiff, setSmsDiff] = useState(location.state.data?.smsPromoDifference)
    const [obdCount, setObdCount] = useState(location.state.data?.obdCount);
    const [obdDays, setObdDays] = useState(location.state.data?.obdDays);
    const [obdDiff, setObdDiff] = useState(location.state.data?.obdPromoDifference);
    const [totalCount, setTotalCount] = useState(location.state.data?.totalCount);
    const [totalDays, setTotalDays] = useState(location.state.data?.totalDays);
    const [promoDiff, setPromoDiff] = useState(location.state.data?.promoDifference);
    const [overridePolicy, setOverridePolicy] = useState();
    const [policyStatus, setPolicyStatus] = useState(location.state.data?.status);
    const [description, setDescription] = useState(location.state.data?.description);
    const [loading, setloading] = useState(false)

    const handlePolicyName = (e) => {
        setPolicyName(e.target.value)
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


    const onsubmit = () => {
        let policyId = location.state.data?.policyId;
        // console.log(rangeId)
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
        setloading(true)

        dispatch(modifyPolicyManagement({ id: policyId, data: response, token: token }))
            .then((resp) => {
                if(resp?.payload?.status === 200 ){
                    toast.success("Policy updated")
                    navigate('/operatorConfig/viewPolicy')
                }else{
                    toast.error("Internal server error")
                }
                setloading(false)
            })
            .catch((error) => {
                console.error(error);
                setloading(false)
                toast.error('Error while submiting subscriber range');
            });
    }

    const clearText = () => {
        setPolicyName(location.state.data?.policyName);
        setSmsCount(location.state.data?.smsCount)
        setSmsDays(location.state.data?.smsDays);
        setSmsDiff(location.state.data?.smsPromoDifference);
        setObdCount(location.state.data?.obdCount);
        setObdDays(location.state.data?.obdDays);
        setObdDiff(location.state.data?.obdPromoDifference);
        setTotalCount(location.state.data?.totalCount);
        setTotalDays(location.state.data?.totalDays);
        setPromoDiff(location.state.data?.promoDifference);
        setOverridePolicy("");
        setPolicyStatus(location.state.data?.status);
        setDescription(location.state.data?.description);
    }



    return (
        <div className='mx-3'>
            <Heading name='Modify Policy'>
                <Link to='/operatorConfig/viewPolicy'>
                    <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </Heading>

            <div className='container'>
                <div className='w-75' style={{ color: 'black' }}>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'> Policy Name</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <input className='border border-1 rounded border-dark w-100' placeholder='Policy Name' type='text' defaultValue={policyName} onChange={handlePolicyName} />
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'> SMS Count</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <Tooltip title={<h6>"Total SMS Sent to a number in Below Defined SMS Days"</h6>} style={{ fontSize: '10px' }} >
                                <input className='border border-1 rounded border-dark w-100' placeholder='SMS Count' type='number' defaultValue={smsCount} onChange={handleSmsCount} />
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'> SMS Days</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <Tooltip title={<h6>"Total Days In Which Above Specified Total SMS Are sent"</h6>} style={{ fontSize: '10px' }} >
                                <input className='border border-1 rounded border-dark w-100' placeholder='SMS Days' type='number' defaultValue={smsDays} onChange={handleSmsDays} />
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'> SMS DIFF</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <Tooltip title={<h6>"SMS Differnce After One SMS Sent"</h6>} style={{ fontSize: '10px' }} >
                                <input className='border border-1 rounded border-dark w-100' placeholder='SMS DIFF' type='number' defaultValue={smsDiff} onChange={handleSmsDiff} />
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'> OBD Count</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <Tooltip title={<h6>"Total OBD Sent To A Number In Below Defined OBD Days"</h6>} style={{ fontSize: '10px' }} >
                                <input className='border border-1 rounded border-dark w-100' placeholder='OBD Count' type='number' defaultValue={obdCount} onChange={handleObdCount} />
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'> OBD Days</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <Tooltip title={<h6>"Total Days In Which Above Specified Total OBD Are Sent"</h6>} style={{ fontSize: '10px' }} >
                                <input className='border border-1 rounded border-dark w-100' placeholder='OBD Days' type='number' defaultValue={obdDays} onChange={handleObdDays} />
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'> OBD DIFF</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <Tooltip title={<h6>"OBD Difference after one obd sent"</h6>} style={{ fontSize: '10px' }} >
                                <input className='border border-1 rounded border-dark w-100' placeholder='OBD DIFF' type='number' defaultValue={obdDiff} onChange={handleObdDiff} />
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'> Total Count</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <Tooltip title={<h6>"Total SMS/OBD Sent to a number in Below Defined Total Days"</h6>} style={{ fontSize: '10px' }} >
                                <input className='border border-1 rounded border-dark w-100' placeholder='Total Count' type='number' defaultValue={totalCount} onChange={handleTotalCount} />
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'> Total Days</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <Tooltip title={<h6>"Total Days in which above specified Total SMS/OBD are sent"</h6>} style={{ fontSize: '10px' }} >
                                <input className='border border-1 rounded border-dark w-100' placeholder='Total Days' type='number' defaultValue={totalDays} onChange={handleTotalDays} />
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'> Promo DIFF</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            {/* <Tooltip title={<h6>"OBD Difference after one obd sent"</h6>} style={{ fontSize: '10px' }} > */}
                            <input className='border border-1 rounded border-dark w-100' placeholder='Promo DIFF' type='number' defaultValue={promoDiff} onChange={handlePromoDiff} />
                            <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter-1 For Unlimit</label>
                            {/* </Tooltip> */}
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'>Override Policy</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <select className='w-100 inputtext' style={{ color: 'black' }}>
                                <option>No</option>
                                <option>Yes</option>
                            </select>
                            <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> For Unlimited,Please Select Yes</label>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'>Policy Status</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <select className='w-100 inputtext' style={{ color: 'black' }} defaultValue={policyStatus} onChange={handlePolicyStatus}>
                                <option>Select</option>
                                <option value='Y'>Active</option>
                                <option value='N'>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center my-4 justify-content-center'>
                        <div className='col'>Description</div>
                        <div className='col'>:</div>
                        <div className='col' >
                            <textarea className='border border-1 rounded border-dark w-100' rows={4} type='text' style={{ color: 'black' }} defaultValue={description} onChange={handleDescription} />
                        </div>
                    </div>

                </div>
            </div>

            <div className='d-flex justify-content-center mb-4'>
                <CommanButton className='btnSend mx-4' onClick={onsubmit} >Modify Range</CommanButton>
                <CommanButton className='btnSend mx-4' onClick={clearText} >Clear</CommanButton>
            </div>
            <BackDropLoader opener={loading} />
        </div>
    );


}

export default ModifyPolicy;