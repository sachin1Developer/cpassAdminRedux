import { Pagination, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import exportFromJSON from 'export-from-json'
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSignal } from '@preact/signals-react';
import { getAdReportBySpecificId, getAdSummaryReports } from './slice/ReportAd';
import { TableBody, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Loader from '../../../components/loader/Loader';
import ErrorPage from '../../../components/error/ErrorPage';
import CommanButton from '../../../components/CommanButton';
import Empty from '../../../components/empty/Empty';


function AdGeneratedReport() {
    let { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state.token?.data?.token)
    const [loading, setLoading] = useState(true)
    const isError = useSignal(false)
    const reportsAd = useSignal({})
    const commanData = useSignal([])
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getData()
    }, [])

    let getData = () => {
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
                console.log(resp.payload?.data)
                commanData.value = resp.payload?.data
                setLoading(false)
            }).catch(() => {
                setLoading(false)
                isError.value = true
            })
        }
    }


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

    if (loading) {
        return <Loader />
    } else if (isError.value) {
        return <ErrorPage />
    } else {
        return (
            <div className='mx-3'>
                <div className='d-flex justify-content-between my-2 mx-4'>
                    <div className='container fs-6 fw-medium w-50 p-2 shadow-lg mb-2 bg-body-tertiary rounded border border-2'>
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

                {
                    commanData.value?.length === 0
                        ?
                        <Empty name='Data Not Found' />
                        :
                        <>
                            <div className='d-flex' >
                                <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded" >
                                    <Table>
                                        <TableHead style={{ backgroundColor: '#d6d6f7' }} >
                                            <TableRow>
                                                <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                                    Date
                                                </TableCell>
                                                <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                                    New Subs
                                                </TableCell>
                                                <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                                    Terminations
                                                </TableCell>
                                                <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                                    Active Subs
                                                </TableCell>
                                                <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                                    Daily Charge
                                                </TableCell>
                                                <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                                    Total Unique Subs
                                                </TableCell>
                                                <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                                    Total Incoming Calls
                                                </TableCell>
                                                <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                                    International Calls
                                                </TableCell>
                                                <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                                    Local Calls
                                                </TableCell>
                                                <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                                    Time of Exposure
                                                </TableCell>
                                                <TableCell className="border border-2 fw-bolder fs-6" align="center">

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
                                <Pagination count={Math.ceil(commanData.value?.length / 10)} variant="outlined" shape="rounded" onChange={(e, p) => { setCurrentPage(p) }} />
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

                <TableCell align="center" className="border border-2" >
                    {data?.reportDate?.slice(0, 10)} </TableCell>

                <TableCell align="center" className="border border-2" style={{ color: 'green', fontWeight: '600' }} >
                    {data?.newSubscriber}</TableCell>

                <TableCell align="center" className="border border-2" style={{ color: 'red', fontWeight: '600' }}>
                    {data?.unsubscription}</TableCell>

                <TableCell align="center" className="border border-2" style={{ color: '#6366f1', fontWeight: '600' }}>
                    {data?.activeSubscriber}
                </TableCell>

                <TableCell align="center" className="border border-2">
                    {data?.dailyCharges}</TableCell>

                <TableCell align="center" className="border border-2">{data?.uniqueSubscriber}</TableCell>

                <TableCell align="center" className="border border-2">
                    {data?.totalIncomingCalls}</TableCell>

                <TableCell align="center" className="border border-2">
                    {data?.internationalCalls}</TableCell>

                <TableCell align="center" className="border border-2">
                    {data?.localCalls}</TableCell>

                <TableCell align="center" className="border border-2">
                    {data?.timeOfExposure}</TableCell>

                <TableCell align="center" className="border border-2">
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
