import React, { useEffect, useState } from "react";
import Heading from "../../../components/header/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignStatusByFilter, getCampaignStatusfor15Days, getCampaignStatusforDateWise } from "./slice/Campaign";
import { toast } from "react-toastify";
import DynamicTable from "../../../components/table/DynamicTable";
import { Chip, Pagination, Stack, TableCell, TableRow } from "@mui/material";
import Empty from "../../../components/empty/Empty";
import Loader from "../../../components/loader/Loader";
import CommanButton from "../../../components/CommanButton";
import dayjs from "dayjs";
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import MessageIcon from '@mui/icons-material/Message';


function CampaignStatus() {
    const dispatch = useDispatch()
    const [campData, setcampData] = useState([])
    const [campStatus, setcampStatus] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [startDate, setStartDate] = useState('')
    const [endDate, setendDate] = useState('')
    const [date, setdate] = useState(false)
    const perPage = 10;
    const token = useSelector(state => state?.token?.data?.token)


    const getCampStatusbyFilter = (status) => {
        setLoading(true)
        dispatch(getCampaignStatusByFilter({ token: token, status: status }))
            .then((response) => {
                if (response?.payload?.data?.httpStatusCode === 200) {
                    setcampStatus(status)
                    setdate(false)
                    setcampData(response?.payload?.data?.body)
                } else {
                    toast.error("Internal error server")
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
                toast.error('Error while list')
            })
    }

    const getCampStatusfor15Days = () => {
        setcampStatus('')
        setLoading(true)
        dispatch(getCampaignStatusfor15Days(token))
            .then((response) => {
                if (response?.payload?.data?.httpStatusCode === 200) {
                    setdate(false)
                    setcampData(response?.payload?.data?.body)
                } else {
                    toast.error("Internal error server")
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
                toast.error('Error while list')
            })
    }

    const getCampStatusforDateWise = () => {
        if (startDate?.length === 0) {
            toast.error('Please Enter Start Date')
        } else if (endDate?.length === 0) {
            toast.error('Please Enter End Date')
        } else {
            setLoading(true)
            dispatch(getCampaignStatusforDateWise({ token: token, start: startDate, end: endDate }))
                .then((response) => {
                    if (response?.payload?.data?.httpStatusCode === 200) {
                        setcampData(response?.payload?.data?.body)
                        setcampStatus('DW')
                    } else {
                        toast.error("Internal error server")
                    }
                    setLoading(false)
                }).catch((err) => {
                    console.log(err)
                    setLoading(false)
                    toast.error('Error while list')
                })
        }
    }

    useEffect(() => {
        getCampStatusfor15Days()
    }, [])

    const headers = ['Name', 'Group', 'Total', 'Processed', 'Per Day Limit', 'Last Update', 'Today Sent', 'Interface', 'Status']


    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = campData?.slice(indexofFirst, indexofLast)

    let today = dayjs().format('YYYY-MM-DD')
    console.log(today)

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className="mx-3"    >
                <Heading name='Campaign Status'>

                </Heading>
                <div className="d-flex flex-column align-items-end">
                    <Stack direction="row" spacing={1}>
                        <Chip label="New" variant="outlined" clickable sx={campStatus === 'N' && { backgroundColor: 'grey' }} onClick={() => { getCampStatusbyFilter('N') }} />
                        <Chip label="Running" variant="outlined" clickable sx={campStatus === 'R' && { backgroundColor: 'grey' }} onClick={() => { getCampStatusbyFilter('R') }} />
                        <Chip label="Approve" variant="outlined" clickable sx={campStatus === 'A' && { backgroundColor: 'grey' }} onClick={() => { getCampStatusbyFilter('A') }} />
                        <Chip label="Paused" variant="outlined" clickable sx={campStatus === 'P' && { backgroundColor: 'grey' }} onClick={() => { getCampStatusbyFilter('P') }} />
                        <Chip label="Completed" variant="outlined" sx={campStatus === 'C' && { backgroundColor: 'grey' }} clickable onClick={() => { getCampStatusbyFilter('C') }} />
                        <Chip label="Reject" variant="outlined" clickable sx={campStatus === 'E' && { backgroundColor: 'grey' }} onClick={() => { getCampStatusbyFilter('E') }} />
                        <Chip label="All" variant="outlined" clickable sx={campStatus === 'ALL' && { backgroundColor: 'grey' }} onClick={() => { getCampStatusbyFilter('ALL') }} />
                        <Chip label="Datewise" variant="outlined" clickable sx={campStatus === 'DW' && { backgroundColor: 'grey' }} onClick={() => { setdate((prev) => !prev) }} />
                    </Stack>
                </div>
                {
                    date &&
                    <div className="d-flex m-3 flex-wrap justify-content-around ">
                        <div className="mx-3 align-self-center">
                            <label htmlFor="">Start Date </label>
                            <input type="date" className="p-1" value={startDate} onChange={(event) => { setStartDate(event.target.value) }} max={today} />
                        </div>
                        <div className="mx-3 align-self-center">
                            <label htmlFor="">End Date </label>
                            <input type="date" className="p-1" value={endDate} onChange={(event) => { setendDate(event.target.value) }} min={startDate} max={today} disabled={startDate?.length === 0} />
                        </div>
                        <CommanButton onClick={getCampStatusforDateWise} >Submit</CommanButton>
                    </div>
                }
                {
                    campData?.length === 0
                        ?
                        <Empty name='Data Not Found' />
                        :
                        <DynamicTable data={headers}>
                            {
                                activePage?.map((each) => {
                                    return (
                                        <TableRow>
                                            <TableCell className="border border-2" align="center">{each.campaign_name}</TableCell>
                                            <TableCell className="border border-2" align="center">{each.GROUP_ID}</TableCell>
                                            <TableCell className="border border-2" align="center">{each.END_SEQUENCE_ID}</TableCell>
                                            <TableCell className="border border-2" align="center">{each.CURRENT_SEQUENCE_ID}</TableCell>
                                            <TableCell className="border border-2" align="center">{each.SMS_MAX_LIMIT === -1 ? 'Unlimited' : each.SMS_MAX_LIMIT}</TableCell>
                                            <TableCell className="border border-2" align="center">{each.LAST_UPDATE_DATE?.slice(0, 10)}</TableCell>
                                            <TableCell className="border border-2" align="center">{each.TODAY_COUNT}</TableCell>
                                            <TableCell className="border border-2" align="center">{(each.INTERFACE === 'O' && <PhoneForwardedIcon style={{color:'red'}} /> ) || (each.INTERFACE === 'S' && <MessageIcon style={{color:'green'}} /> )  } {(each.INTERFACE === 'O' && 'OBD') || (each.INTERFACE === 'S' && 'SMS')  } </TableCell>
                                            <TableCell className="border border-2" align="center">{each.CAMP_STATUS === 'N' && "New" || each.CAMP_STATUS === 'E' && "Reject" || each.CAMP_STATUS === 'R' && "Running" || each.CAMP_STATUS === 'C' && "Completed" || each.CAMP_STATUS === 'A' && "Active" || each.CAMP_STATUS === 'P' && "Pending" || each.CAMP_STATUS === 'T' && "Tested"}</TableCell>
                                            {/* <TableCell className="border border-2" align="center">{each.INTERFACE}</TableCell> */}
                                        </TableRow>
                                    )
                                })
                            }
                        </DynamicTable>
                }
                {
                    campData?.length > perPage
                    &&
                    <div className='d-flex justify-content-center my-4'>
                        <Pagination count={Math.ceil(campData?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                    </div>
                }

            </div>
        )
    }
}


export default CampaignStatus;



// {
//     "CAMPAIGN_ID": 487945,
//     "GROUP_TYPE": 0,
//     "START_SEQUENCE_ID": 0,
//     "LAST_UPDATE_DATE": "2024-03-22T10:25:00.000+00:00",
//     "PRODUCT_NAME": "-1",
//     "GROUP_ID": 2098,
//     "campaign_name": "moto",
//     "STATUS": "N",
//     "CREATE_DATE": "2024-03-21T10:37:00.000+00:00",
//     "CURRENT_SEQUENCE_ID": 0,
//     "END_SEQUENCE_ID": 1,
//     "INTERFACE": "O",
//     "CAMP_STATUS": "N",
//     "TODAY_COUNT": 0,
//     "SMS_MAX_LIMIT": -1
// }







// <TableRow>
//                                 <TableCell align="center">{statusCamp.name}</TableCell>
//                                 <TableCell align="center">{statusCamp.group}</TableCell>
//                                 <TableCell align="center">{statusCamp.total}</TableCell>
//                                 <TableCell align="center">{statusCamp.Processed}</TableCell>
//                                 <TableCell align="center">{statusCamp.PerDayLimit}</TableCell>
//                                 <TableCell align="center">{statusCamp.LastUpdate}</TableCell>
//                                 <TableCell align="center">{statusCamp.TodaySent}</TableCell>
//                                 <TableCell align="center">
//                                     {statusCamp.Interface === 'S' && "SMS" || statusCamp.Interface === 'U' && "USSD" || statusCamp.Interface === 'T' && "Twiter" || statusCamp.Interface === 'F' && "Fecebook" || statusCamp.Interface === 'O' && "OBD" || statusCamp.Interface}
//                                 </TableCell>
//                                 <TableCell align="center">{statusCamp.Status === 'N' && "New" || statusCamp.Status === 'E' && "Reject" || statusCamp.Status === 'R' && "Running" || statusCamp.Status === 'C' && "Completed" || statusCamp.Status === 'A' && "Active" || statusCamp.Status === 'P' && "Pending" || statusCamp.Status === 'T' && "Tested"}</TableCell>
//                                 <TableCell align="center">
//                                     {/* <Box sx={{ width: '100%' }}> */}
//                                     {

//                                     }
//                                     <ProgressBar completed={Math.round((statusCamp.Processed / statusCamp.total) * 100)} bgColor="#6366f1" height="" labelSize="10px" />
//                                     {/* <ProgressBar completed={progress} bgColor="#6366f1" height="" labelSize="10px" /> */}
//                                     {/* </Box> */}

//                                 </TableCell>
//                             </TableRow>