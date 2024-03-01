import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BarGraph from '../../../component/graph/BarGraph';
import PieCircleGraph from '../../../component/graph/PieCircleGraph';
import { useDispatch, useSelector } from 'react-redux';
import { specficCorpId } from './CorpList';
import { getCorpReportBySpecificId, getCorpSummaryReports } from './slice/ReportCorp';
import CommanButton from '../../../component/CommanButton';
import { useSignal } from '@preact/signals-react';
import Loader from '../../../component/loader/Loader';
import { Col, Row } from 'react-bootstrap';
import ErrorPage from '../../../component/error/ErrorPage';

export default function SpecificCorpCamp() {
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


    function insertComma(number) {
        const formattedNumber = new Intl.NumberFormat('en-US').format(number);
        return formattedNumber;
    }

    let timeStringToSeconds = (timeString) => {
        var [minutes, seconds] = timeString?.split(":")?.map(Number);
        return minutes * 60 + seconds;
    }

    let recievedCalls = (commanData?.reduce((acc, curr) => {
        return acc += curr.totalIncomingCalls
    }, 0))

    let totalSeconds = (commanData?.reduce((acc, curr) => {
        return acc += timeStringToSeconds(curr.timeOfExposure)
    }, 0))

    let internationalCalls = (commanData?.reduce((acc, curr) => {
        return acc += curr.internationalCalls
    }, 0))

    let localCalls = (commanData?.reduce((acc, curr) => {
        return acc += curr.localCalls
    }, 0))

    let activeSub = (commanData?.reduce((acc, curr) => {
        return acc += curr.totalSubscriber
    }, 0))

    let termination = (commanData?.reduce((acc, curr) => {
        return acc += curr.unsubscription
    }, 0))



    let totalMinutes = Math?.floor(totalSeconds / 60);

    if (loading.value) {
        return <Loader />
    } else if (isError.value) {
        return <ErrorPage />
    } else {
        return (
            <>
                <div className='container fs-6 fw-medium w-50 '>
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

                <div className='d-flex justify-content-center mt-3'>
                    <Link to={`/generateCorpReport/${id}`} state={{ commanData: commanData, reports: reports }} style={{ textDecoration: 'none' }}>
                        <CommanButton className='btnBack my-2'>
                            Daily Report
                        </CommanButton>
                    </Link>
                </div>
                <hr />
                <div className='d-flex my-3 container'>
                    <div className='shadow-lg p-2 bg-body rounded'>
                        <p className='text-center fw-medium' >Daily received calls</p>
                        <BarGraph series={commanData.map((each) => { return each.totalIncomingCalls }).slice(0, 30)} category={commanData.map((each) => { return each.reportDate?.slice(5, 10) }).slice(0, 30)} height={280} width={500} />
                    </div>
                    <div className='mx-4 d-flex flex-column align-items-center w-100 '>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center' >
                                    {insertComma(recievedCalls)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>
                                    received calls
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >

                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center'>
                                    {totalMinutes}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>Minutes of exposure
                                </Typography>
                            </CardContent>

                        </Card>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >

                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center'>
                                    {activeSub}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>Active Subscriber
                                </Typography>
                            </CardContent>

                        </Card>
                    </div>
                </div>
                <div className='d-flex mb-5 container'>
                    <div className='mx-4 d-flex flex-column align-items-center w-100 '>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >

                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center' >
                                    US$ 102
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>
                                    Total cost of campaign
                                </Typography>
                            </CardContent>

                        </Card>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >

                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center'>
                                    {Math.ceil((recievedCalls / commanData?.length).toFixed(2))}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>Average daily inbound calls
                                </Typography>
                            </CardContent>

                        </Card>
                    </div>
                    <div className='shadow-lg p-2 bg-body rounded'>
                        <p className='text-center fw-medium'>Total Subscriber</p>
                        <PieCircleGraph series={[activeSub, termination]} label={[
                            "Active Subscriber",
                            "Terminate",
                        ]} height={250} width={500} />
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <Link to="/corpReport" style={{ textDecoration: 'none' }}>
                        <CommanButton className='btnBack my-2'>
                            Back
                        </CommanButton>
                    </Link>
                </div>

            </>
        )
    }
}

