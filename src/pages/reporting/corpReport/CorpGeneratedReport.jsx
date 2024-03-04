import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import exportFromJSON from 'export-from-json';
import { useNavigate, useParams } from 'react-router-dom';
import CorpReportList from './CropReportList';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSignal } from '@preact/signals-react';
import { getCorpReportBySpecificId, getCorpSummaryReports } from './slice/ReportCorp';
import Loader from '../../../components/loader/Loader';
import ErrorPage from '../../../components/error/ErrorPage';
import CommanButton from '../../../components/CommanButton';


function CorpGeneratedReport() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state.token?.data?.token)
    const [commanData, setCommanData] = useState([])
    const [reports, setReports] = useState({})
    const loading = useSignal(true)
    const isError = useSignal(false)

    useEffect(() => {
        let data = {

        }
        if ((id === null) || (id === undefined)) {
            navigate('/corpReport')
        } else {
            dispatch(getCorpReportBySpecificId({ id: id, token: token })).then((resp) => {
                // console.log(resp)
                setReports(resp.payload?.data?.body[0])
                return dispatch(getCorpSummaryReports(token))
            }).then((resp) => {
                setCommanData(resp.payload?.data)
                loading.value = false
            }).catch(() => {
                isError.value = true
                loading.value = false

            })
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    let exportCsv = () => {
        const data = commanData
        const fileName = 'Corp-Report'
        const exportType = exportFromJSON.types.csv

        exportFromJSON({ data, fileName, exportType })
    }

    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = commanData.slice(indexofFirst, indexofLast)


    if (loading.value) {
        return <Loader />
    } else if (isError.value) {
        return <ErrorPage />
    } else {
        return (
            <div className='mx-3'>
                <div className='container fs-6 fw-medium w-50 p-2 shadow-lg mb-2 bg-body-tertiary rounded border border-2'>
                    <Row className='text-left'>
                        <Col>Service</Col>
                        <Col className='text-center'>:</Col>
                        <Col>Corp-RBT</Col>
                    </Row>
                    <Row className='text-left'>
                        <Col>Campaign Name</Col>
                        <Col className='text-center'>:</Col>
                        <Col>{reports?.template_name}</Col>
                    </Row>
                    <Row className='text-left'>
                        <Col>Start</Col>
                        <Col className='text-center'>:</Col>
                        <Col>{reports?.start_date?.slice(0, 10)}</Col>
                    </Row>
                    <Row className='text-left'>
                        <Col>End</Col>
                        <Col className='text-center'>:</Col>
                        <Col>{reports?.end_date?.slice(0, 10)}</Col>
                    </Row>
                </div>

                <div className='d-flex ' >
                    <TableContainer className='p-2 shadow-lg mb-2 bg-body-tertiary rounded'>
                        <Table>
                            <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                                <TableRow >
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                        Report Date
                                    </TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                        New Subscriber
                                    </TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                        Terminations
                                    </TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center">
                                        Active subscribers
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
                                </TableRow >
                            </TableHead >

                            <TableBody>
                                {
                                    activePage.map((reportsData, index) => {
                                        return (
                                            <CorpReportList
                                                key={index}
                                                data={reportsData}
                                            />
                                        )
                                    })
                                }
                            </TableBody>
                        </Table >
                    </TableContainer >

                </div >
                <div className='d-flex justify-content-center my-4'>
                    <Pagination count={Math.ceil(commanData.length / 10)} variant="outlined" shape="rounded" onChange={(e, p) => { setCurrentPage(p) }} />
                </div>
                <div className='d-flex justify-content-center my-4'>
                    <CommanButton className='btnBack' onClick={exportCsv}>Download CSV File</CommanButton>
                </div>
                {/* <div className='d-flex justify-content-center'>
                <Link to="/campaignReport/graphCorp" style={{ textDecoration: 'none' }}>
                    <Button className='btnBack my-2'>
                        Back
                    </Button>
                </Link>
            </div> */}
            </div >
        );
    }
}


export default CorpGeneratedReport;





