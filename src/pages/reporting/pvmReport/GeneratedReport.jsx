import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import exportFromJSON from 'export-from-json'
import PvmReportListData from './PvmReportListData';
import { useDispatch, useSelector } from 'react-redux';
import { useSignal } from '@preact/signals-react';
import { Col, Row } from 'react-bootstrap';
import { getPvmReportBySpecificId } from './slice/ReportPvmBySpecificId';
import { getPvmSummaryReports } from './slice/PvmSummaryReports';
import Loader from '../../../components/loader/Loader';
import ErrorPage from '../../../components/error/ErrorPage';
import CommanButton from '../../../components/CommanButton';




function GeneratedReport() {
    const { id } = useParams()
    // console.log(id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(state => state.token?.data?.token)
    const data = useSelector(state => state.reportPvmBySpecificId)
    const commanData = useSelector(state => state.getPvmSummaryReports)
    const loading = useSignal(true)

    useEffect(() => {
        let data = {
            id: id,
            token: token
        }
        if ((id === null) && (id === undefined)) {
            navigate('/pvmReport')
        } else {
            dispatch(getPvmReportBySpecificId(data)).then(() => {

                return dispatch(getPvmSummaryReports(token))
            }).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }

    }, [dispatch, navigate, token])


    const [currentPage,setCurrentPage] = useState(1);
    const perPage = 10;

    // let headers = [
    //     {
    //         label: 'Campaign Id', key: 'campaignId'
    //     },
    //     {
    //         label: 'Campaign Name', key: 'campaignName'
    //     },
    //     {
    //         label: 'Campaign ReportDate', key: 'reportDate'
    //     },
    //     {
    //         label: 'Server', key: 'serverId'
    //     },
    //     {
    //         label: 'Start', key: 'startTime'
    //     },
    //     {
    //         label: 'End', key: 'endTime'
    //     },
    //     {
    //         label: 'Call Dailed', key: 'callsDialed'
    //     },
    //     {
    //         label: 'Call Success', key: 'callsSuccess'
    //     },
    //     {
    //         label: 'Call Failed', key: 'callsFailed'
    //     },
    // ];


    const exportCsv = () => {
        const data = commanData
        const fileName = 'PVM-Report'
        const exportType = exportFromJSON.types.csv

        exportFromJSON({ data, fileName, exportType })
    }




    let indexofLast = currentPage* perPage
    let indexofFirst = indexofLast - perPage
    let activePage = commanData.data?.slice(indexofFirst, indexofLast)

    if (loading.value || data?.isLoading || commanData?.isLoading) {
        return <Loader />
    } else if (data?.error || commanData?.error) {
        return <ErrorPage />
    }
    return (
        <div>
            <div className='container fs-6 fw-medium w-50 p-2 shadow-lg mb-2 bg-body-tertiary rounded border border-2'>
                <Row className='text-left'>
                    <Col>Service</Col>
                    <Col className='text-center' >:</Col>
                    <Col>PVM</Col>
                </Row>
                <Row className='text-left'>
                    <Col>Campaign Name</Col>
                    <Col className='text-center' >:</Col>
                    <Col>{data.data?.campaign_name}</Col>
                </Row>
                <Row className='text-left'>
                    <Col>Start</Col>
                    <Col className='text-center' >:</Col>
                    <Col>{data.data?.startdate?.slice(0, 10)}</Col>
                </Row>
                <Row className='text-left'>
                    <Col>End</Col>
                    <Col className='text-center' >:</Col>
                    <Col>{data.data?.enddate?.slice(0, 10)}</Col>
                </Row>
            </div>
            
            <TableContainer className='p-2 shadow-lg mb-2 bg-body-tertiary rounded'>
                <Table>
                    <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                        <TableRow>
                            <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                Report Date
                            </TableCell>
                            <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                Total Calls
                            </TableCell>
                            <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                Completed Calls
                            </TableCell>
                            <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                Unanswered Calls
                            </TableCell>
                            <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                Interrupted Calls
                            </TableCell>
                            <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                Invalid Number
                            </TableCell>
                            <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                Interactions (press1)
                            </TableCell>
                            <TableCell align="center" className="border border-2 fw-bolder fs-6">
                                
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {activePage?.map((reportsData, index) => {
                             return   <PvmReportListData
                                    key={index}
                                    date={reportsData.reportDate}
                                    totalNoOfCalls={reportsData.totalNoOfCalls}
                                    completedCalls={reportsData.completedCalls}
                                    unansweredCalls={reportsData.unansweredCalls}
                                    interruptedCalls={reportsData.interruptedCalls}
                                    interactions={reportsData.interactions}
                                    invalidNumbers={reportsData.invalidNumbers}
                                    data={reportsData}
                                />
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                commanData?.data?.length > 10 &&
                <div className='d-flex justify-content-center my-4'>
                    <Pagination count={Math.ceil(commanData.data?.length / 10)} variant="outlined" shape="rounded" onChange={(e, p) => { setCurrentPage(p) }} />
                </div>
            }
            <div className='d-flex justify-content-center my-2'>
                <CommanButton className='btnBack' onClick={exportCsv}>Download CSV File</CommanButton>
            </div>

            {/* <div className='d-flex justify-content-center'>
                <Link to="/campaignReport/graphReport" style={{ textDecoration: 'none' }}>
                    <CommanButton className='btnBack my-2'>
                        Back
                    </CommanButton>?
                </Link>
            </div> */}
        </div>
    );

}

export default GeneratedReport;





