import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../component/loader/Loader';
import ErrorPage from '../../../component/error/ErrorPage';
import CommanButton from '../../../component/CommanButton';
import { signal, useSignal } from '@preact/signals-react';
import { useNavigate } from 'react-router-dom';
import { getCorpReport } from './slice/ReportCorp';


function CorpList() {
    const dispatch = useDispatch()
    const currentPage = useSignal(1)
    const startDate = useSignal(null)
    const endDate = useSignal(null)
    const token = useSelector(state => state.token?.data?.token)
    const data = useSelector(state => state.reportCorp)
    console.log(data)

    useEffect(() => {
        let currentDate = new Date();
        let toDate = currentDate.toISOString().slice(0, 10)
        currentDate.setDate(currentDate.getDate() - 30);
        let fromDate = currentDate.toISOString().slice(0, 10);

        startDate.value = dayjs(fromDate)
        endDate.value = dayjs(toDate)

        getData(toDate, fromDate)
    }, [])


    let getData = (start, end) => {
        let sendData = {
            start: start,
            end: end,
            token: token
        }
        // console.log(sendData)
        dispatch(getCorpReport(sendData))
    }



    let submitDate = () => {
        if (startDate.value === null) {
            toast.error("Enter Start Date")
        } else if (endDate.value === null) {
            toast.error("Enter End Date")
        } else {
            let start = `${startDate.value.$y}-${(startDate.value.$M + 1 + "").length === 2 ? (startDate.value.$M + 1) : "0" + (startDate.value.$M + 1)}-${(startDate.value.$D + "").length === 2 ? (startDate.value.$D) : "0" + (startDate.value.$D)}`
            let end = `${endDate.value.$y}-${(endDate.value.$M + 1 + "").length === 2 ? (endDate.value.$M + 1) : "0" + (endDate.value.$M + 1)}-${(endDate.value.$D + "").length === 2 ? (endDate.value.$D) : "0" + (endDate.value.$D)}`
            getData(start, end)
        }
    }

    const perPage = 10;
    let indexofLast = currentPage.value * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = data?.data?.body[0]?.slice(indexofFirst, indexofLast)

    if (data?.isLoading) {
        return <Loader />
    } else if (data?.error) {
        return <ErrorPage />
    } else {
        return (
            <div style={{ height: "-webkit-fill-available" }} >
                <b>
                    <h5 className='d-flex justify-content-between align-items-center text-slate-600'>Corp-RBT Reports ✨
                        <div className='d-flex align-items-center justify-content-end w-50 h-25 ' >
                            <LocalizationProvider dateAdapter={AdapterDayjs}  >
                                <DemoContainer components={['DatePicker']} >
                                    <DatePicker label="Select Start Date" format='YYYY-MM-DD' value={startDate.value || null} onChange={(e) => { startDate.value = e }} className='w-25' />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Select End Date" format='YYYY-MM-DD' value={endDate.value || null} minDate={startDate.value} onChange={(e) => { endDate.value = e }} className='w-25' />
                                </DemoContainer>
                            </LocalizationProvider>
                            <CommanButton className='btnBack' onClick={submitDate}>
                                Submit
                            </CommanButton>
                        </div>
                    </h5>
                </b>


                {
                    data?.data?.body?.length === 0
                        ?
                        <h4 className='d-flex justify-content-center my-4'>
                            No record found
                        </h4>
                        :
                        <>
                            <div className='d-flex justify-content-center my-2'>
                                <p>
                                    This list displays all executed and ongoing campaigns. To access the report, kindly click on the corresponding Corp ID.
                                </p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <TableContainer style={{ width: '550px' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" style={{ fontWeight: 'bolder' }}>
                                                    Corp Id
                                                </TableCell>
                                                <TableCell align="center" style={{ fontWeight: 'bolder' }}>
                                                    Corp Name
                                                </TableCell>
                                                <TableCell align="center" style={{ fontWeight: 'bolder' }}>
                                                    Start Date
                                                </TableCell>
                                                <TableCell align="center" style={{ fontWeight: 'bolder' }}>
                                                    End Date
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>


                                        {/* <TableBody > */}
                                            {
                                                activePage?.map((reportsData, index) => {
                                                    return (
                                                        <CorpReportListData
                                                            key={index}
                                                            data={reportsData}
                                                        />
                                                    )
                                                })
                                            }


                                        {/* </TableBody> */}
                                    </Table>
                                    {
                                        data?.data?.body[0]?.length >
                                        10 &&
                                        <div className='d-flex justify-content-center my-4'>
                                            <Pagination count={Math.ceil(data?.data?.body[0]?.length / 10)} variant="outlined" shape="rounded" onChange={(e, p) => currentPage.value = p} />
                                        </div>
                                    }
                                </TableContainer>
                            </div>
                        </>
                }
            </div >
        );
    }

}

export default CorpList;


export const specficCorpId = signal(null)

function CorpReportListData({ data, key }) {
    const navigate = useNavigate(-1);

    const [nextPage, setNextPage] = useState(false)
    const [isHovered, setIsHovered] = useState(false);

    if (nextPage) {
        navigate('/graphCorpReport')
    }

    const tableRowStyle = {
        cursor: "pointer",
        boxShadow: isHovered ? '1px 2px 7px grey' : 'none'
    }


    return (
        <TableRow key={key}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            style={tableRowStyle}
            onClick={() => { navigate(`/graphCorpReport/${data?.corp_ID}`) }} className='container-fluid'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <TableCell align="center" style={{ color: '#6366f1', fontWeight: '700', fontSize: '12px', height: '4em' }}>{data?.corp_ID}</TableCell>
            <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>{data?.template_name}</TableCell>
            <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>{data?.start_date?.slice(0, 10)}</TableCell>
            <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>{data?.end_date?.slice(0, 10)}</TableCell>
        </TableRow>
    )
}







