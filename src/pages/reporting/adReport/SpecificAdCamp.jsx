import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdReportBySpecificId, getAdSummaryReports } from './slice/ReportAd';
import LineGraph from '../../../component/graph/LineGraph';
import PieCircleGraph from '../../../component/graph/PieCircleGraph';
import CommanButton from '../../../component/CommanButton';
import Loader from '../../../component/loader/Loader';
import { Col, Row } from 'react-bootstrap';
import ErrorPage from '../../../component/error/ErrorPage';

export default function SpecificAdCamp() {
    let { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state.token?.data?.token)
    const [reportsAd, setReportsAd] = useState({})
    const [commanData, setCommanData] = useState([])
    const loading = useSignal(true)
    const isError = useSignal(false)

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
                    setReportsAd(resp.payload?.data?.body[0])
                    return dispatch(getAdSummaryReports(token))
                } else {
                    throw new Error('Internal server error')
                }
            }).then((resp) => {
                setCommanData(resp.payload?.data)
                loading.value = false
            }).catch(() => {
                loading.value = false
                isError.value = true
            })
        }
    }, [])

    function insertComma(number) {
        const formattedNumber = new Intl.NumberFormat('en-US')?.format(number);
        return formattedNumber;
    }

    let uniqueSubs = (commanData?.reduce((acc, curr) => {
        return acc += curr?.uniqueSubscriber
    }, 0))

    let activeSubs = (commanData?.reduce((acc, curr) => {
        return acc += curr?.activeSubscriber
    }, 0))

    let internationalCalls = (commanData?.reduce((acc, curr) => {
        return acc += curr?.internationalCalls
    }, 0))

    let localCalls = (commanData?.reduce((acc, curr) => {
        return acc += curr?.localCalls
    }, 0))


    let timeStringToSeconds = (timeString) => {
        var [minutes, seconds] = timeString?.split(":")?.map(Number);
        return minutes * 60 + seconds;
    }

    let totalSeconds = (commanData?.reduce((acc, curr) => {
        return acc += timeStringToSeconds(curr?.timeOfExposure)
    }, 0))


    let totalMinutes = Math?.floor(totalSeconds / 60);


    if (loading.value) {
        return <Loader />
    } else if (isError.value) {
        return <ErrorPage />
    } else {
        return (
            <>

                <div className='container fs-6 fw-medium w-50'>
                    <Row className='text-left'>
                        <Col>Service</Col>
                        <Col className='text-center'>:</Col>
                        <Col>Ad-RBT</Col>
                    </Row>
                    <Row className='text-left'>
                        <Col>Campaign Name</Col>
                        <Col className='text-center'>:</Col>
                        <Col>{reportsAd.templatename}</Col>
                    </Row>
                    <Row className='text-left'>
                        <Col>Start</Col>
                        <Col className='text-center'>:</Col>
                        <Col>{reportsAd.startdate?.slice(0, 10)}</Col>
                    </Row>
                    <Row className='text-left'>
                        <Col>End</Col>
                        <Col className='text-center'>:</Col>
                        <Col>{reportsAd.enddate?.slice(0, 10)}</Col>
                    </Row>
                </div>

                <div className='d-flex justify-content-center mt-3'>
                    <Link to={`/generateAdReport/${id}`} style={{ textDecoration: 'none' }}>
                        <CommanButton className='btnBack my-2'>
                            Daily Report
                        </CommanButton>
                    </Link>
                </div>
                <hr />
                <div className='d-flex my-3 container'>
                    <div className='shadow-lg p-3 bg-body rounded'>
                        <p className='text-center fw-medium' >Daily Subscriber</p>
                        <LineGraph series={commanData.map((each) => { return each?.newSubscriber }).slice(0, 30)} category={commanData.map((each) => { return each?.reportDate.slice(5, 10) }).slice(0, 30)} height={250} width={500} />
                    </div>
                    <div className='mx-4 d-flex flex-column align-items-center w-100 '>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center' >
                                    US$ 860
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>
                                    Total cost of campaign
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center'>
                                    {insertComma(totalMinutes)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>Minutes of exposure
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
                                    {insertComma(uniqueSubs)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>
                                    Total unique subscribers
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className='border border-secondary my-2 rounded-pill' sx={{ minWidth: 300 }} >
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='d-flex justify-content-center'>
                                    {insertComma(activeSubs)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='d-flex justify-content-center'>
                                    Total Active Subscriber
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='shadow-lg p-2 bg-body rounded'>
                        <p className='text-center fw-medium' >Call Composition</p>
                        <PieCircleGraph series={[internationalCalls, localCalls]} label={[
                            "International",
                            "Local",
                        ]} height={250} width={500} />
                    </div>
                </div>
                {/* <div className='d-flex justify-content-center'>
                            <div className='shadow-lg p-2 bg-body rounded'>
                                <p className='text-center fw-medium' >Active Subscriber</p>
                                <BarGraph series={commanData.map((each) => { return each.activeSubscriber }).slice(0, 30)} category={commanData.map((each) => { return each.reportDate?.slice(5, 10) }).slice(0, 30)} height={280} width={500} />
                            </div>
                        </div> */}
                <div className='d-flex justify-content-center'>
                    <Link to="/adReport" style={{ textDecoration: 'none' }}>
                        <CommanButton className='btnBack my-2'>
                            Back
                        </CommanButton>
                    </Link>
                </div>
            </>
        )
    }
}

