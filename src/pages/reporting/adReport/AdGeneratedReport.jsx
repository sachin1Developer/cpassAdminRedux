import { Pagination, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import exportFromJSON from 'export-from-json'
import CommanButton from '../../../component/CommanButton';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSignal } from '@preact/signals-react';
import { getAdReportBySpecificId, getAdSummaryReports } from './slice/ReportAd';
import Loader from '../../../component/loader/Loader';
import ErrorPage from '../../../component/error/ErrorPage';
import { TableBody, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';


function AdGeneratedReport() {
    let { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state.token?.data?.token)
    const loading = useSignal(true)
    const isError = useSignal(false)
    const reportsAd = useSignal({})
    const commanData = useSignal([])
    const currentPage = useSignal(1);

    useEffect(() => {
        let data = {
            id: id,
            token: token
        }
        if ((id === null) || (id === undefined)) {
            navigate('/AdReport')
        } else {
            dispatch(getAdReportBySpecificId(data)).then((resp) => {
                if (resp.payload?.data?.httpStatusCode === 200) {
                    reportsAd.value = resp.payload?.data?.body[0]
                    return dispatch(getAdSummaryReports(token))
                } else {
                    throw new Error('Internal server error')
                }
            }).then((resp) => {
                commanData.value = resp.payload?.data
                setTimeout(() => {
                    loading.value = false
                }, 1000);
            }).catch(() => {
                loading.value = false
                isError.value = true
            })
        }
    }, [])


    const exportCsv = () => {
        const data = commanData
        const fileName = 'Ad-Report'
        const exportType = exportFromJSON.types.csv

        exportFromJSON({ data, fileName, exportType })
    }

    const perPage = 10;
    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = commanData.value?.slice(indexofFirst, indexofLast)

    if (loading.value) {
        return <Loader />
    } else if (isError.value) {
        return <ErrorPage />
    } else {
        return (
            <div>
                <div className='d-flex justify-content-between my-2 mx-4'>
                    <div className='container fs-6 fw-medium w-50'>
                        <Row className='text-left'>
                            <Col>Service</Col>
                            <Col className='text-center'>:</Col>
                            <Col>Ad-RBT</Col>
                        </Row>
                        <Row className='text-left'>
                            <Col>Campaign Name</Col>
                            <Col className='text-center'>:</Col>
                            <Col>{reportsAd.value?.templatename}</Col>
                        </Row>
                        <Row className='text-left'>
                            <Col>Start</Col>
                            <Col className='text-center'>:</Col>
                            <Col>{reportsAd.value?.startdate?.slice(0, 10)}</Col>
                        </Row>
                        <Row className='text-left'>
                            <Col>End</Col>
                            <Col className='text-center'>:</Col>
                            <Col>{reportsAd.value?.enddate?.slice(0, 10)}</Col>
                        </Row>
                    </div>
                </div>
                <hr />
                {
                    commanData.value?.length === 0
                        ?
                        <div className='d-flex justify-content-center' >Data Not Found</div>
                        :
                        <>
                            <div className='d-flex' >
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center' style={{ fontWeight: 'bolder', textAlign: 'center' }}>
                                                    Date
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }}>
                                                    New Subs
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }}>
                                                    Terminations
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }}>
                                                    Active Subs
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }}>
                                                    Daily Charge
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }}>
                                                    Total Unique Subs
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }}>
                                                    Total Incoming Calls
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }}>
                                                    International Calls
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }}>
                                                    Local Calls
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }}>
                                                    Time of Exposure
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }}>

                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >

                                            {
                                                activePage?.map((each, index) => {
                                                    return <AdReportList key={index} data={each} />
                                                })
                                            }
                                        </TableBody>

                                    </Table>
                                </TableContainer>

                            </div>
                            <div className='d-flex justify-content-center my-4'>
                                <Pagination count={Math.ceil(commanData.value?.length / 10)} color="primary" onChange={(e, p) => { currentPage.value = p }} />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <CommanButton className='btnBack' onClick={exportCsv}>Download CSV File</CommanButton>
                            </div>
                        </>
                }

            </div>
        );
    }
}

export default AdGeneratedReport;



function AdReportList({ key, data }) {

    const exportCsvForPerDay = (date, inputObject) => {
        // const data = Object.entries(inputObject).map(([key, value]) => [key, ""+ value]);
        const data = [
            ['18760000012 , New Subscriber , 00:10:00 '],
            ['18760000013 , Terminations , 00:00:43 '],
            ['18760000014 ,  International Calls , 00:10:00'],
            ['18760000015 ,  Local Calls , 00:10:00'],
            ['18760000016 , Terminations , 00:13:00'],
            ['18760000007 ,  New Subscriber , 00:10:00'],
            ['18760000003 ,  New Subscriber , 00:14:00'],
        ]
        console.log(data)
        const fileName = '' + date + '--PerdayAd-Report';
        const exportType = exportFromJSON.types.csv

        exportFromJSON({ data, fileName, exportType })
    };

    return (
        <>
            <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} className='reportsList' >

                <TableCell component="th" scope="row" align="center" style={{ fontSize: '12px', height: '4em', width: '100px' }}>
                    {data?.reportDate?.slice(0, 10)} </TableCell>

                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                    {data?.newSubscriber}</TableCell>

                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                    {data?.unsubscription}</TableCell>

                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                    {data?.activeSubscriber}
                </TableCell>

                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                    {data?.dailyCharges}</TableCell>

                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>{data?.uniqueSubscriber}</TableCell>

                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                    {data?.totalIncomingCalls}</TableCell>

                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                    {data?.internationalCalls}</TableCell>

                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                    {data?.localCalls}</TableCell>

                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                    {data?.timeOfExposure}</TableCell>

                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                    <Tooltip title="Download per day csv file" >
                        <button onClick={() => { exportCsvForPerDay(data?.reportDate?.slice(0, 10), data) }} style={{ border: 'none', textDecoration: 'underLine', color: '#6366f1', fontWeight: '700', backgroundColor: 'transparent' }}>
                            <DownloadIcon />
                        </button>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </>
    );
}
