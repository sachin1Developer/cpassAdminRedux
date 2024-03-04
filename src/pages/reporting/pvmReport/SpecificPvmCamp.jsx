import React, { useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { useSignal } from '@preact/signals-react';
import { getPvmReportBySpecificId } from './slice/ReportPvmBySpecificId';
import { getPvmSummaryReports } from './slice/PvmSummaryReports';
import Loader from '../../../components/loader/Loader';
import ErrorPage from '../../../components/error/ErrorPage';
import CommanButton from '../../../components/CommanButton';
import BarGraph from '../../../components/graph/BarGraph';
import PieCircleGraph from '../../../components/graph/PieCircleGraph';

export default function SpecificPvmCamp() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
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



    function insertComma(number) {
        const formattedNumber = new Intl.NumberFormat('en-US')?.format(number);
        return formattedNumber;
    }


    let totalcalls = (commanData.data?.reduce((acc, curr) => {
        return acc += curr.totalNoOfCalls
    }, 0))

    let invalidCalls = (commanData.data?.reduce((acc, curr) => {
        return acc += curr.invalidNumbers
    }, 0))

    let completedCalls = (commanData.data?.reduce((acc, curr) => {
        return acc += curr.completedCalls
    }, 0))

    let noAnsCalls = (commanData.data?.reduce((acc, curr) => {
        return acc += curr.unansweredCalls
    }, 0))

    let interruptCalls = (commanData.data?.reduce((acc, curr) => {
        return acc += curr.interruptedCalls
    }, 0))

    let totalAmount = (commanData.data?.reduce((acc, curr) => {
        return acc += curr.amount
    }, 0))

    if (loading.value || data?.isLoading || commanData?.isLoading) {
        return <Loader />
    } else if (data?.error || commanData?.error) {
        return <ErrorPage />
    } else {
        return (
            <Container>
                <div className='container fs-6 fw-medium w-50 p-2 shadow-lg mb-2 bg-body-tertiary rounded border border-2'>
                    <Row className='text-left'>
                        <Col>Service</Col>
                        <Col className='text-center' >:</Col>
                        <Col>PVM</Col>
                    </Row>
                    <Row className='text-left'>
                        <Col>Campaign Name</Col>
                        <Col className='text-center' >:</Col>
                        <Col>{data?.data?.campaign_name}</Col>
                    </Row>
                    <Row className='text-left'>
                        <Col>Start</Col>
                        <Col className='text-center' >:</Col>
                        <Col>{data?.data?.startdate?.slice(0, 10)}</Col>
                    </Row>
                    <Row className='text-left'>
                        <Col>End</Col>
                        <Col className='text-center' >:</Col>
                        <Col>{data?.data?.enddate?.slice(0, 10)}</Col>
                    </Row>
                </div>

                <div className='d-flex justify-content-center mt-3'>
                    <Link to={`/generatePvmReport/${id}`} style={{ textDecoration: 'none' }}>
                        <CommanButton className='btnBack my-2'>
                            Daily Report
                        </CommanButton>
                    </Link>
                </div>
                <hr />
                <div className='d-flex my-3'>
                    <div className='shadow-lg p-2 bg-body rounded'>
                        <p className='text-center fw-medium' >Total Calls Made</p>
                        <PieCircleGraph series={[completedCalls, noAnsCalls, interruptCalls, invalidCalls]} label={[
                            "Completed calls",
                            "Un-answered calls",
                            "Interrupted calls",
                            "Invalid calls"
                        ]} height={250} width={500} />
                    </div>
                    <div className='mx-4 d-flex flex-column align-items-center w-100 '>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center' >
                                    US$ {insertComma(totalAmount)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>
                                    Total cost of campaign
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center'>
                                    {(invalidCalls / totalcalls * 100).toFixed(2)}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>
                                    Invalid numbers %
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className='d-flex my-3'>
                    <div className='mx-4 d-flex flex-column align-items-center w-100 '>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center' >
                                    {(completedCalls / totalcalls * 100).toFixed(2)}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>
                                    Call completion %
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center'>
                                    {insertComma(completedCalls)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>
                                    Completed call
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='shadow-lg p-2 bg-body rounded' >
                        <p className='text-center fw-medium' >Total Calls Daily</p>
                        <BarGraph series={(commanData.data?.map((each) => {
                            return each.totalNoOfCalls
                        }))?.slice(0, 29)}
                            category={(commanData.data?.map((each) => {
                                return each.reportDate?.slice(5, 10)
                            }))?.slice(0, 29)}
                            height={250} width={500} />
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <Link to="/pvmReport" style={{ textDecoration: 'none' }}>
                        <CommanButton className='btnBack my-2'>
                            Back
                        </CommanButton>
                    </Link>
                </div>
            </Container>
        )
    }
}

