import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { signal, useSignal } from '@preact/signals-react';
import { useNavigate } from 'react-router-dom';
import { getAdReport } from './slice/ReportAd';
import Loader from '../../../components/loader/Loader';
import ErrorPage from '../../../components/error/ErrorPage';
import Heading from '../../../components/header/Heading';
import CommanButton from '../../../components/CommanButton';
import Empty from '../../../components/empty/Empty';



function CorpList() {
    const dispatch = useDispatch()
    const currentPage = useSignal(1)
    const startDate = useSignal(null)
    const endDate = useSignal(null)
    const token = useSelector(state => state.token?.data?.token)
    const data = useSelector(state => state.reportAd)

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
        dispatch(getAdReport(sendData))
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
            <div className='mx-3' >
                <Heading name='Ad-RBT Reports'>
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
                </Heading>


                {
                    data?.data?.body?.length === 0
                        ?
                        <Empty name='No record found' />
                        :
                        <>
                            <div className='d-flex justify-content-center my-2'>
                                <p>
                                    This list displays all executed and ongoing campaigns. To access the report, kindly click on the corresponding Ad-RBT ID.
                                </p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded" >
                                    <Table>
                                        <TableHead style={{ backgroundColor: '#d6d6f7' }} >
                                            <TableRow>
                                                <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                                    Ad-RBT Id
                                                </TableCell>
                                                <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                                    Ad-RBT Name
                                                </TableCell>
                                                <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                                    Start Date
                                                </TableCell>
                                                <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                                    End Date
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {
                                                activePage?.map((reportsData, index) => {
                                                    return (
                                                        <AdReportListData
                                                            key={index}
                                                            data={reportsData}
                                                        />
                                                    )
                                                })
                                            }


                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {
                                    data?.data?.body[0]?.length >
                                    10 &&
                                    <div className='d-flex justify-content-center my-4'>
                                        <Pagination count={Math.ceil(data?.data?.body[0]?.length / 10)} variant="outlined" shape="rounded" onChange={(e, p) => currentPage.value = p} />
                                    </div>
                                }
                            </div>
                        </>
                }
            </div >
        );
    }

}

export default CorpList;


function AdReportListData({ data, key }) {
    const navigate = useNavigate(-1);

    const [nextPage, setNextPage] = useState(false)
    const [isHovered, setIsHovered] = useState(false);

    if (nextPage) {
        navigate('/graphAdReport')
    }

    const tableRowStyle = {
        cursor: "pointer",
        boxShadow: isHovered ? '1px 2px 7px grey' : 'none'
    }

    return (

        <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} style={tableRowStyle} onClick={() => { navigate(`/graphAdReport/${data?.templateID}`) }} className='reportsList' onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)} >
            <TableCell align="center" className="border border-2" style={{ color: '#6366f1', fontWeight: '600' }} >{data?.templateID}</TableCell>
            <TableCell align="center" className="border border-2" style={{ color: 'black', fontWeight: '600' }} >{data?.templatename}</TableCell>
            <TableCell align="center" className="border border-2" >{data?.startdate?.slice(0, 10)}</TableCell>
            <TableCell align="center" className="border border-2" >{data?.enddate?.slice(0, 10)}</TableCell>
        </TableRow>
    )

}