import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AWS from 'aws-sdk'
import { Link, Redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import { Backdrop, CircularProgress, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Heading from '../../../components/header/Heading';
import CommanButton from '../../../components/CommanButton';
import OuterBox from '../../../components/OuterBox';
import SelectInput from '../../../components/SelectInput';
import { getSystemVoiceList } from '../../systemConfiguration/voiceConfig/slice/VoiceConfiguration';
import { getSystemCountryCode } from '../../systemConfiguration/countryCode/slice/CountryCode';
import { getLbsTemplates } from '../templates/slice/Templates';
import { createPvm, getOriginationNumber } from './slice/Campaign';
import BackDropLoader from '../../../components/loader/BackDropLoader';
import Loader from '../../../components/loader/Loader';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


let audio = null;
const toastId = 'createPVM'
const CreateCampaign = () => {


    const [templateName, settemplateName] = useState('');
    const [callNo, setcallNo] = useState(0);
    const [personalized, setpersonalized] = useState(null);
    const [messageRadio, setmessageRadio] = useState(0);
    const [audioMessage, setaudioMessage] = useState(null);
    const [welcomeFile, setwelcomeFile] = useState(null);
    const [menuFile, setmenuFile] = useState(null);
    const [thanksFile, setthanksFile] = useState(null);
    const [ttsTextArea, setttsTextArea] = useState('');
    const [ttsVoiceTone, setttsVoiceTone] = useState('');
    const [ttsVoiceSpeed, setttsVoiceSpeed] = useState('');
    const [textData, settextData] = useState('');
    const [originNo, setoriginNo] = useState('');
    const [country, setcountry] = useState('');
    const [listTxt, setlistTxt] = useState(null);
    const [scheduleFrom, setscheduleFrom] = useState(null);
    const [scheduleTo, setscheduleTo] = useState(null);
    const [startTime, setstartTime] = useState(null);
    const [lastTime, setlastTime] = useState(null);
    const [days, setdays] = useState('')
    const [CTA, setCTA] = useState(null);
    const [review, setreview] = useState(false);
    const [p1, setp1] = useState('active');
    const [p2, setp2] = useState('active');
    const [p3, setp3] = useState('active');
    const [p4, setp4] = useState('active');
    const [p5, setp5] = useState('active');
    const [p6, setp6] = useState('active');
    const [p7, setp7] = useState('active');
    const [p8, setp8] = useState('active');
    const [Url, setUrl] = useState('');
    const [redirectStatus, setredirectStatus] = useState('');
    const [getTemplates, setgetTemplates] = useState([]);
    const [modal, setmodal] = useState(false);
    const [whichMessage, setwhichMessage] = useState('write');
    const [writeMessage, setwriteMessage] = useState('');
    const [existMessage, setexistMessage] = useState('');
    const [whichAudio, setwhichAudio] = useState('');
    const [response, setresponse] = useState([]);
    const [availblnc, setavailblnc] = useState(0);
    const [audioPreview, setaudioPreview] = useState(false);
    const [welcomePreview, setwelcomePreview] = useState(false);
    const [menuPreview, setmenuPreview] = useState(false);
    const [thanksPreview, setthanksPreview] = useState(false);
    const [audioRadio, setaudioRadio] = useState('audio');
    const [countryCodes, setcountryCodes] = useState([]);
    const [originationNumber, setoriginationNumber] = useState([]);
    const [getVoice, setgetVoice] = useState([]);
    const [loading, setloading] = useState(false)
    const [onLoading, setonLoading] = useState(true)
    const [campType, setcampType] = useState('O')
    const [value, setValue] = useState(0);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let userId = useSelector(state => state.profile.data?.useridd)
    let userName = useSelector(state => state.profile.data?.username)
    const token = useSelector(state => state.token?.data?.token)
    let availbalance = useSelector(state => state.profile?.data?.availbalance)

    const getData = () => {
        setonLoading(true)
        dispatch(getSystemCountryCode(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setcountryCodes(resp?.payload?.data?.body)
                    return dispatch(getLbsTemplates(token))
                } else {
                    toast.error('Internal server error country')
                }
            })
            .then((response) => {
                if (response?.payload?.status === 200) {
                    setgetTemplates(response?.payload?.data)
                    return dispatch(getSystemVoiceList(token))
                } else {
                    toast.error('Internal server error template')
                }
            }).catch((err) => {
                toast.error('Error while fetching list')
                console.error(err)
            })
            .then((resp) => {

                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setgetVoice(resp?.payload?.data?.body)
                    return dispatch(getOriginationNumber(token))
                } else {
                    toast.error('Internal server error voice')
                }
            })
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setoriginationNumber(resp?.payload?.data?.body[0])
                } else {
                    toast.error('Internal server error origin')
                }
                setonLoading(false)
            })
            .catch((error) => {
                console.error(error);
                setonLoading(false)
                toast.error('Error while getting data');
            });
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setavailblnc(availbalance)
    }, [availbalance])


    useEffect(() => {
        if (CTA === null) {
            setp2('active')
        } else {
            setp2('completed')
        }

        if (personalized === null) {
            setp3('active')
        } else {
            setp3('completed')
        }

        if ((scheduleFrom !== null) && (scheduleTo !== null)) {
            setp7("completed")
        } else {
            setp7("active")
        }

        if (review === true) {
            setp8("completed")
        } else {
            setp8("active")
        }
    }, [CTA, personalized, scheduleFrom, scheduleTo, review])


    const onWhatMessage = () => {
        let type = whichMessage

        if (type === "write") {
            if (writeMessage?.length !== 0) {
                setttsTextArea(writeMessage)
                setmodal(false)
            } else {
                toast.error("Message cannot be empty")
            }
        } else if (type === "exist") {
            if (existMessage?.length !== 0) {
                setttsTextArea(existMessage)
                setmodal(false)
            } else {
                toast.error("Please select your template")
            }
        }
    }

    const onReviewChange = () => {
        setreview(!review)
    }


    const templateNameValidation = () => {
        if (templateName?.length === 0) {
            setp1("active")
            toast.error("Please enter your template name", { toastId: toastId })
        } else if (parseFloat(callNo) <= 0) {
            setp1("active")
            toast.error(`You have ${availblnc} maximum calls limit`, { toastId: toastId })
        } else if (parseFloat(callNo) > parseFloat(availblnc)) {
            setp1("active")
            toast.error(`Credit Limit is not enough. You have ${availblnc} maximum calls limit`, { toastId: toastId })
        } else {
            setp1("completed")
        }
        //  else {
        //     let check = false;
        //     this.state.existTemplateName?.map((value) => {
        //         if (templateName === (value?.CAMPAIGN_NAME)) {
        //             check = true;
        //         }
        //     }, [])

        //     if (check) {
        //         p1 = "active"
        //         toast.error("Template name already exists")
        //         flag = false
        //     } 
        //     else {

        //         p1 = "completed"
        //         flag = true
        //     }

        // }
    }


    const messageTypeValidation = () => {
        if ((messageRadio === 0) && (audioMessage === null) && (whichAudio === 'Single')) {
            setp4("active")
            toast.error("Please enter audio file message ")
        }
        else if ((messageRadio === 0) && (whichAudio === 'Multiple') && (welcomeFile === null)) {
            setp4("active")
            toast.error("Please enter welcome file message ")

        }
        else if ((messageRadio === 0) && (whichAudio === 'Multiple') && (menuFile === null)) {
            setp4("active")
            toast.error("Please enter menu file message ")

        }
        else if ((messageRadio === 0) && (whichAudio === 'Multiple') && (thanksFile === null)) {
            setp4("active")
            toast.error("Please enter thanks file message ")

        }
        else if ((messageRadio === 1) && (ttsTextArea?.length === 0)) {
            setp4("active")
            toast.error("Please enter text field file message ")
        }
        else if ((messageRadio === 1) && (ttsVoiceTone?.length === 0)) {
            setp4("active")
            toast.error("Please enter voice tone file message ")
        }
        else if ((messageRadio === 1) && (ttsVoiceSpeed?.length === 0)) {
            setp4("active")
            toast.error("Please enter voice speed file message ")
        }
        else if ((messageRadio?.length === 0)) {
            setp4("active")
            toast.error("Please select message type ")
        }
        else {
            setp4("completed")
        }
    }

    const originNoValidation = () => {
        if (originNo?.length !== 0) {
            setp5("completed")
        } else {
            setp5("active")
            toast.error("Please enter your origin number")
        }
    }

    const listTxtValidation = () => {
        if ((listTxt === null)) {
            setp6("active")
            toast.error("Please upload your list file")
        } else if (country?.length === 0) {
            setp6("active")
            toast.error("Please select the country code")
        }
        else {
            setp6("completed")
        }
    }

    const getFormData = () => {

        console.log(p1, p2, p3, p4, p5, p6, p7, p8)
        let formData = null;
        if (p1 && p2 && p3 && p4 && p5 && p6 && p7 && p8 === 'completed') {



            let start = scheduleFrom
            let end = scheduleTo



            if ((messageRadio === 0) && (whichAudio === 'Single')) {
                formData = new FormData();
                let data = {
                    "campaign_name": templateName,
                    "startdate": `${dayjs(scheduleFrom).format('YYYY-MM-DD')} ${dayjs(startTime).format('HH:mm')}:00`,
                    "persanolized": "Off",
                    "enddate": `${dayjs(scheduleTo).format('YYYY-MM-DD')} ${dayjs(lastTime).format('HH:mm')}:00`,
                    "startHour": `${dayjs(startTime).format('HHmm')}`,
                    "endHour": `${dayjs(lastTime).format('HHmm')}`,
                    "userId": userId,
                    "created_by": userName,
                    "admin_msisdn": "7070270313",
                    "promptType": whichAudio,
                    "interfacee": campType,
                    "sms_origination_num": originNo,
                    "obd_app": "-1",
                    "status": "N",
                    "balance": "5000",
                    "priority": "1",
                    "day_of_week": days,
                    "camp_recycle": "1",
                    "policy_id": "-99"
                }


                formData.append('audioFile', audioMessage);
                formData.append('uploadList', listTxt);
                formData.append('saveCampaign', JSON.stringify(data))

            }
            else if ((messageRadio === 0) && (whichAudio === 'Multiple')) {
                formData = new FormData();
                let data = {
                    "campaign_name": templateName,
                    "startdate": `${dayjs(scheduleFrom).format('YYYY-MM-DD')} ${dayjs(startTime).format('HH:mm')}:00`,
                    "persanolized": "Off",
                    "enddate": `${dayjs(scheduleTo).format('YYYY-MM-DD')} ${dayjs(lastTime).format('HH:mm')}:00`,
                    "startHour": `${dayjs(startTime).format('HHmm')}`,
                    "endHour": `${dayjs(lastTime).format('HHmm')}`,
                    "userId": userId,
                    "created_by": userName,
                    "admin_msisdn": "7070270313",
                    "promptType": whichAudio,
                    "interfacee": campType,
                    "sms_origination_num": originNo,
                    "obd_app": "-1",
                    "status": "N",
                    "balance": "5000",
                    "priority": "1",
                    "day_of_week": days,
                    "camp_recycle": "1",
                    "policy_id": "-99"
                }


                formData.append('welcomeFile', welcomeFile);
                formData.append('menuFile', menuFile);
                formData.append('thanksFile', thanksFile);
                formData.append('uploadList', listTxt);
                formData.append('saveCampaign', JSON.stringify(data))

            }
            else if (messageRadio === 1 ) {
                formData = new FormData();
                let data = {
                    "campaign_name": templateName,
                    "startdate": `${dayjs(scheduleFrom).format('YYYY-MM-DD')} ${dayjs(startTime).format('HH:mm')}:00`,
                    "persanolized": personalized === 'yes' ? "On" : "Off",
                    "enddate": `${dayjs(scheduleTo).format('YYYY-MM-DD')} ${dayjs(lastTime).format('HH:mm')}:00`,
                    "startHour": `${dayjs(startTime).format('HHmm')}`,
                    "endHour": `${dayjs(lastTime).format('HHmm')}`,
                    "userId": userId,
                    "campaign_message": ttsTextArea,
                    "voiceTone": ttsVoiceTone,
                    "voiceSpeed": ttsVoiceSpeed,
                    "created_by": userName,
                    "admin_msisdn": "7070270313",
                    "promptType": "none",
                    "interfacee": campType,
                    "sms_origination_num": originNo,
                    "obd_app": "-1",
                    "status": "N",
                    "balance": "5000",
                    "priority": "1",
                    "day_of_week": days,
                    "camp_recycle": "1",
                    "policy_id": "-99"
                }


                formData.append('audioFile', null);
                formData.append('uploadList', listTxt)
                formData.append('saveCampaign', JSON.stringify(data))

            }
            else if (audioRadio === 'text') {
                formData = new FormData();
                let data = {
                    "campaign_name": templateName,
                    "startdate": `${dayjs(scheduleFrom).format('YYYY-MM-DD')} ${dayjs(startTime).format('HH:mm')}:00`,
                    "persanolized": personalized === 'yes' ? "On" : "Off",
                    "enddate": `${dayjs(scheduleTo).format('YYYY-MM-DD')} ${dayjs(lastTime).format('HH:mm')}:00`,
                    "startHour": `${dayjs(startTime).format('HHmm')}`,
                    "endHour": `${dayjs(lastTime).format('HHmm')}`,
                    "userId": userId,
                    "campaign_message": ttsTextArea,
                    "voiceTone": ttsVoiceTone,
                    "voiceSpeed": ttsVoiceSpeed,
                    "created_by": userName,
                    "admin_msisdn": "7070270313",
                    "promptType": "none",
                    "interfacee": 'O',
                    "sms_origination_num": originNo,
                    "obd_app": "-1",
                    "status": "N",
                    "balance": "5000",
                    "priority": "1",
                    "day_of_week": days,
                    "camp_recycle": "1",
                    "policy_id": "-99"
                }


                formData.append('audioFile', null);
                formData.append('uploadList', listTxt)
                formData.append('saveCampaign', JSON.stringify(data))

            }
            else {
                alert("Please enter your message type")
            }

        } else {
            alert("enter all details")
        }

        return new Promise((resolve, reject) => {
            if (formData !== null) {
                resolve(formData)
            } else {
                reject("formData is null")
            }
        })


    }

    const onSubmitHandler = () => {
        setloading(true)
        getFormData()
            .then((data) => {
                return dispatch(createPvm({ data: data, token: token }))
            })
            .then((response) => {
                console.log(response)
                if (response?.payload?.status === 200) {
                    toast.success('Campaign Created Successfully')
                    navigate('/camapign/viewCamapign')
                }
                setloading(false)
            })
            .catch((err) => {
                setloading(false)
                toast.error('Error while campaign')
            })
    }

    const handleGenerateSpeech = async () => {

        if (ttsTextArea.length && ttsVoiceSpeed.length && ttsVoiceTone.length !== 0) {

            let speechText = '';
            if (personalized || (textData.length !== 0)) {
                let varString = textData;
                let msgTemplate = ttsTextArea
                var varArray = []
                var msgArray = []
                varArray = varString.split(",");
                msgArray = msgTemplate.split(" ");
                var count = 1;
                var updateMsg = "";
                for (let a in msgArray) {
                    if (msgArray[a] === "$(var" + count + ")" || msgArray[a] === "$(var" + count + ").") {
                        var x = count;
                        msgArray[a] = varArray[x - 1];
                        count++;
                    }
                    updateMsg = updateMsg + msgArray[a] + " ";
                }
                speechText = updateMsg
            } else {
                speechText = ttsTextArea
            }



            let playSpeed = ttsVoiceSpeed
            AWS.config.region = 'us-east-1';
            AWS.config.engine = "neural";
            let speechParams = {

                OutputFormat: "",
                SampleRate: "",
                Text: "",
                TextType: "ssml",
                VoiceId: ""
            };
            let tag;

            if (playSpeed === "slow") {
                tag = '<speak><prosody rate="slow">';
            }
            else if (playSpeed === "fast") {
                tag = '<speak><prosody rate="fast">';
            }
            else {
                tag = '<speak><prosody>';
            }
            let message = tag + " " + speechText + "</prosody></speak>";
            speechParams.Text = message;
            speechParams.VoiceId = ttsVoiceTone;
            speechParams.OutputFormat = "mp3";
            speechParams.SampleRate = '16000';
            speechParams.TextType = "ssml";

            // Create the Polly service object and presigner object
            let polly = new AWS.Polly({ apiVersion: '2016-06-10' });
            let signer = new AWS.Polly.Presigner(speechParams, polly)

            try {
                signer.getSynthesizeSpeechUrl(speechParams, function (error, url) {
                    if (error) {
                        console.log(error);
                    } else {
                        var audio = new Audio(url);
                        audio.play();
                    }
                })

            } catch (error) {
                console.error('Error generating speech:', error);
            }
        }
    };

    const audioPlay = (file, doing) => {
        // console.log(file, doing);

        const audioURL = URL.createObjectURL(file);
        const stateProperty = `${doing}`;

        if (this.state[stateProperty]) {
            audio.pause()
            this.setState({
                [stateProperty]: false
            })
        } else {
            audio = new Audio(audioURL)
            audio.play()
            this.setState({
                [stateProperty]: true
            })
        }

    }

    const daysEntry = (event) => {
        const { value, checked } = event.target;
        // let { days } = this.state;

        let newDays = '';
        let inserted = false;
        let removed = false;

        for (let i = 0; i < days.length; i++) {
            const currentValue = days[i];
            if (parseInt(currentValue) > parseInt(value) && !inserted && checked) {
                newDays += value;
                inserted = true;
            }
            if (parseInt(currentValue) !== parseInt(value)) {
                newDays += currentValue;
            } else {
                removed = true; // Mark as removed
            }
        }

        // If value wasn't inserted and it wasn't removed (if it existed), add it to the end
        if (!inserted && !removed && checked && !newDays.includes(value)) {
            newDays += value;
        }

        setdays(newDays)
    };

    let weekDayDisable = ((scheduleFrom === null ? true : false) || (p6 === 'active' ? true : false) || (scheduleTo === null ? true : false) || (startTime === null ? true : false) || (lastTime === null ? true : false))


    if (onLoading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                {/* <ProgressBar>
                    <ProgressBarStep value="1" mode={p1} />
                    <ProgressBarStep value="2" mode={p2} />
                    <ProgressBarStep value="3" mode={p3} />
                    <ProgressBarStep value="4" mode={p4} />
                    <ProgressBarStep value="5" mode={p5} />
                    <ProgressBarStep value="6" mode={p6} />
                    <ProgressBarStep value="7" mode={p7} />
                    <ProgressBarStep value="8" mode={p8} />
                </ProgressBar> */}


                <Heading name='Create Campaign'>
                    <Link
                        to='/camapign/viewCamapign'
                        style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </Heading>


                <div className='my-2 container' >

                    <OuterBox value="1" able='false' >
                        <div className="my-2 w-100" >
                            <label htmlFor="templateName" className="form-label fw-semibold formLabel">Name your PVM campaign. &nbsp;
                                <span className="form-text">This name identifies your campaign so you can re-use it in future. Type your campaign name below - </span></label>
                            <div className="row g-3 justify-content-center">

                                <div className="col-auto">
                                    <input type="text" className="form-control border-secondary" id="templateName" value={templateName} onChange={(e) => { settemplateName(e.target.value) }} placeholder='Enter PVM Campaign Name' />
                                </div>
                                <div className="col-auto d-flex ">
                                    <div className=''>
                                        <Tooltip title={<h6> Per Call 1$ </h6>} style={{ fontSize: '15px' }} >
                                            <input type="number" className="form-control border-secondary" id="callNo" onChange={(e) => { setcallNo(e.target.value) }} placeholder='No. of calls allowed' />
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <CommanButton type="submit" className="btnBack mb-3" onClick={templateNameValidation}>Submit</CommanButton>
                                </div>
                            </div>
                        </div>
                    </OuterBox>


                    <OuterBox value="2" able={p1 === 'active' ? true : false} >
                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Customer Interaction. &nbsp;
                                <span className="form-text">By activating this feature, you
                                    are expecting a call-to-action from the subscriber.
                                    Be sure to make the indication of this call-to-action
                                    clear in your message.</span></label>
                            <div className="d-flex justify-content-center">
                                <ToggleButtonGroup
                                    size='small'
                                    value={CTA}
                                    exclusive
                                    onChange={(e, v) => { setCTA(v) }}
                                    disabled={p1 === 'active' ? true : false}
                                    sx={{
                                        boxShadow: 1,
                                        borderRadius: 2,
                                    }}
                                >
                                    <ToggleButton value="Yes" aria-label="Yes" >
                                        <CheckIcon />
                                    </ToggleButton>
                                    <ToggleButton value="No" aria-label="No" >
                                        <ClearIcon />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </OuterBox>


                    <OuterBox value="3" able={p2 === 'active' ? true : false} >
                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Personalization.&nbsp;
                                <span className="form-text">This feature allows you to personalize each message. Make certain that you include variables in your list in step 6. </span></label>
                            <div className="d-flex justify-content-center">
                                <ToggleButtonGroup
                                    size='small'
                                    value={personalized}
                                    exclusive
                                    onChange={(e, v) => { setpersonalized(v); v === 'Yes' && setaudioRadio('text') }}
                                    disabled={p2 === 'active' ? true : false}
                                    sx={{
                                        boxShadow: 1,
                                        borderRadius: 2,
                                    }}
                                >
                                    <ToggleButton value="Yes" aria-label="Yes" >
                                        <CheckIcon />
                                    </ToggleButton>
                                    <ToggleButton value="No" aria-label="No" >
                                        <ClearIcon />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </OuterBox>


                    <OuterBox value="4" able={p3 === 'active' ? true : false}>
                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Select type of message. &nbsp;
                                <span className="form-text">Please tell us if your message will be personalized per number. If this feature is off it means you will have 1 unique message to many.</span></label>
                            <div className='d-flex flex-column align-items-center'>
                                <div>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={messageRadio} onChange={(event, newValue) => { setmessageRadio(newValue); newValue === 0 ? setcampType('O') : setcampType('S') }} aria-label="basic tabs example">
                                                <Tab label="OBD" {...a11yProps(0)} />
                                                <Tab label="SMS" {...a11yProps(1)} />
                                            </Tabs>
                                        </Box>
                                        <CustomTabPanel value={messageRadio} index={0}>
                                            {/* <div className="form-check m-2">
                                                <div className='d-flex align-items-center'>

                                                    <div className='d-flex justify-content-around'>
                                                        <CommanButton onClick={() => { setwhichAudio('Single') }} className='btnBack btn m-2' disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false)}  >Single Prompt</CommanButton>
                                                        <CommanButton onClick={() => { setwhichAudio('Multiple') }} className='btnBack btn m-2' disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false)} >Multi Prompt</CommanButton>
                                                    </div>
                                                </div>



                                                <div className='mx-4' style={messageRadio === 0 ? { display: 'block' } : { display: 'none' }} >
                                                    <div>
                                                        {
                                                            whichAudio === "Single"
                                                                ?
                                                                <div>
                                                                    <hr />
                                                                    <div className='d-flex'>
                                                                        <div className="mx-2">
                                                                            <input type="file" accept='.wav' className="form-control border-secondary" id="audioMessage" onChange={(e) => { (e.target.files[0].size <= 2000000) ? setaudioMessage(e.target.files[0]) : toast.error("file must be less than 2MB") }} disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false)} />
                                                                            <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .wav file(maxsize-2mb)</label>
                                                                        </div>
                                                                        <div className="mx-2">
                                                                            <CommanButton type="submit" className="btnBack mb-3" onClick={messageTypeValidation} disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false)} >Submit</CommanButton>
                                                                        </div>
                                                                        <div className="col-auto">

                                                                            <CommanButton type="submit" className="btnBack mb-3" onClick={() => audioPlay(audioMessage, "audioPreview")}
                                                                                disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false) || (audioMessage === null ? true : false)} >{audioPreview ? "Pause" : "Play"}</CommanButton>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                :
                                                                undefined


                                                        }
                                                    </div>

                                                    <div>
                                                        {
                                                            whichAudio === "Multiple"
                                                                ?
                                                                <div>
                                                                    <hr />
                                                                    <div className='d-flex justify-content-between'>
                                                                        <label className="form-check-label mt-1 " htmlFor="">Welcome file</label>
                                                                        <div className="mx-2">
                                                                            <input type="file" accept='.wav' className="form-control border-secondary" id="welcomeFile" onChange={(e) => { (e.target.files[0].size <= 2000000) ? setwelcomeFile(e.target.files[0]) : toast.error("file must be less than 2MB") }} disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false)} />
                                                                            <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .wav file(maxsize-2mb)</label>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <CommanButton type="submit" className="btnBack mb-3" onClick={() => audioPlay(welcomeFile, "welcomePreview")}
                                                                                disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false) || (welcomeFile === null ? true : false)} >{welcomePreview ? "Pause" : "Play"}</CommanButton>
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-between'>
                                                                        <label className="form-check-label mt-1 " htmlFor="">Menu file</label>
                                                                        <div className="mx-2">
                                                                            <input type="file" accept='.wav' className="form-control border-secondary" id="menuFile" onChange={(e) => { (e.target.files[0].size <= 2000000) ? setmenuFile(e.target.files[0]) : toast.error("file must be less than 2MB") }} disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false)} />
                                                                            <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .wav file(maxsize-2mb)</label>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <CommanButton type="submit" className="btnBack mb-3" onClick={() => audioPlay(menuFile, "menuPreview")}
                                                                                disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false) || (menuFile === null ? true : false)} >{menuPreview ? "Pause" : "Play"}</CommanButton>
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-between'>
                                                                        <label className="form-check-label mt-1 " htmlFor="">Thanks file</label>
                                                                        <div className="mx-2">
                                                                            <input type="file" accept='.wav' className="form-control border-secondary" id="thanksFile" onChange={(e) => { (e.target.files[0].size <= 2000000) ? setthanksFile(e.target.files[0]) : toast.error("file must be less than 2MB") }} disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false)} />
                                                                            <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .wav file(maxsize-2mb)</label>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <CommanButton type="submit" className="btnBack mb-3" onClick={() => this.audioPlay(thanksFile, "thanksPreview")}
                                                                                disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false) || (thanksFile === null ? true : false)} >{thanksPreview ? "Pause" : "Play"}</CommanButton>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mx-2 d-flex justify-content-center">
                                                                        <CommanButton type="submit" className="btnBack mb-3" onClick={messageTypeValidation} disabled={(messageRadio === 1 ? true : false) || (p3 === 'active' ? true : false)} >Submit</CommanButton>
                                                                    </div>
                                                                </div>
                                                                :
                                                                undefined
                                                        }
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div>
                                                <div className="form-check m-2">
                                                    <div className='d-flex align-items-center'>
                                                        <input className="form-check-input mx-2 border-secondary" type="radio" name="audioRadio" onChange={(e) => { setaudioRadio(e.target.value) }} id="audioRadio" value="audio" disabled={(personalized === 'Yes') || (p3 === 'active' ? true : false)} />
                                                        <label className="form-check-label mx-2" htmlFor="">
                                                            Audio file
                                                        </label>

                                                        <div className='d-flex justify-content-around'>
                                                            <CommanButton onClick={() => { setwhichAudio('Single') }} className='btnBack btn m-2' disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false)}  >Single Prompt</CommanButton>
                                                            <CommanButton onClick={() => { setwhichAudio('Multiple') }} className='btnBack btn m-2' disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false)} >Multi Prompt</CommanButton>
                                                        </div>
                                                    </div>



                                                    <div className='mx-4' style={audioRadio === 'audio' ? { display: 'block' } : { display: 'none' }} >
                                                        <div>
                                                            {
                                                                whichAudio === "Single"
                                                                    ?
                                                                    <div>
                                                                        <hr />
                                                                        <div className='d-flex'>
                                                                            <div className="mx-2">
                                                                                <input type="file" accept='.wav' className="form-control border-secondary" id="audioMessage" onChange={(e) => { (e.target.files[0].size <= 2000000) ? setaudioMessage(e.target.files[0]) : toast.error("file must be less than 2MB") }} disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false)} />
                                                                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .wav file(maxsize-2mb)</label>
                                                                            </div>
                                                                            <div className="mx-2">
                                                                                <CommanButton type="submit" className="btnBack mb-3" onClick={messageTypeValidation} disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false)} >Submit</CommanButton>
                                                                            </div>
                                                                            <div className="col-auto">

                                                                                <CommanButton type="submit" className="btnBack mb-3" onClick={() => audioPlay(audioMessage, "audioPreview")}
                                                                                    disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false) || (audioMessage === null ? true : false)} >{audioPreview ? "Pause" : "Play"}</CommanButton>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    undefined


                                                            }
                                                        </div>

                                                        <div>
                                                            {
                                                                whichAudio === "Multiple"
                                                                    ?
                                                                    <div>
                                                                        <hr />
                                                                        <div className='d-flex justify-content-between'>
                                                                            <label className="form-check-label mt-1 " htmlFor="">Welcome file</label>
                                                                            <div className="mx-2">
                                                                                <input type="file" accept='.wav' className="form-control border-secondary" id="welcomeFile" onChange={(e) => { (e.target.files[0].size <= 2000000) ? setwelcomeFile(e.target.files[0]) : toast.error("file must be less than 2MB") }} disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false)} />
                                                                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .wav file(maxsize-2mb)</label>
                                                                            </div>
                                                                            <div className="col-auto">
                                                                                <CommanButton type="submit" className="btnBack mb-3" onClick={() => audioPlay(welcomeFile, "welcomePreview")}
                                                                                    disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false) || (welcomeFile === null ? true : false)} >{welcomePreview ? "Pause" : "Play"}</CommanButton>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex justify-content-between'>
                                                                            <label className="form-check-label mt-1 " htmlFor="">Menu file</label>
                                                                            <div className="mx-2">
                                                                                <input type="file" accept='.wav' className="form-control border-secondary" id="menuFile" onChange={(e) => { (e.target.files[0].size <= 2000000) ? setmenuFile(e.target.files[0]) : toast.error("file must be less than 2MB") }} disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false)} />
                                                                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .wav file(maxsize-2mb)</label>
                                                                            </div>
                                                                            <div className="col-auto">
                                                                                <CommanButton type="submit" className="btnBack mb-3" onClick={() => audioPlay(menuFile, "menuPreview")}
                                                                                    disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false) || (menuFile === null ? true : false)} >{menuPreview ? "Pause" : "Play"}</CommanButton>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex justify-content-between'>
                                                                            <label className="form-check-label mt-1 " htmlFor="">Thanks file</label>
                                                                            <div className="mx-2">
                                                                                <input type="file" accept='.wav' className="form-control border-secondary" id="thanksFile" onChange={(e) => { (e.target.files[0].size <= 2000000) ? setthanksFile(e.target.files[0]) : toast.error("file must be less than 2MB") }} disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false)} />
                                                                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .wav file(maxsize-2mb)</label>
                                                                            </div>
                                                                            <div className="col-auto">
                                                                                <CommanButton type="submit" className="btnBack mb-3" onClick={() => this.audioPlay(thanksFile, "thanksPreview")}
                                                                                    disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false) || (thanksFile === null ? true : false)} >{thanksPreview ? "Pause" : "Play"}</CommanButton>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mx-2 d-flex justify-content-center">
                                                                            <CommanButton type="submit" className="btnBack mb-3" onClick={messageTypeValidation} disabled={(audioRadio === 'text' ? true : false) || (p3 === 'active' ? true : false)} >Submit</CommanButton>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    undefined
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-check m-2 ">
                                                    <div className='d-flex align-items-center mt-2'>
                                                        <input className="form-check-input m-2 border-secondary" type="radio" disabled={p3 === 'active' ? true : false} name="audioRadio" onChange={(e) => { setaudioRadio(e.target.value) }} id="audioRadio" value="text" />
                                                        <label className="form-check-label m-2" htmlFor="flexRadioDefault1">
                                                            Text to Speech – TTS tool
                                                        </label>
                                                        <CommanButton type="submit" className="btnBack mx-3" onClick={() => { setmodal(!modal) }} disabled={(audioRadio === 'audio' ? true : false) || (p3 === 'active' ? true : false)} >Add Template</CommanButton>

                                                    </div>
                                                    <Modal show={modal} onHide={() => { setmodal(!modal) }} aria-labelledby="contained-modal-title-vcenter">
                                                        <Modal.Header closeButton>
                                                            <Modal.Title id="contained-modal-title-vcenter">
                                                                Select message
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body className="grid-example">
                                                            <div className='d-flex justify-content-center '>
                                                                <CommanButton onClick={() => { setwhichMessage('write') }} className='btnBack btn m-2' >Writing Message</CommanButton>
                                                                <CommanButton onClick={() => { setwhichMessage('exist') }} value='exist' className='btnBack btn m-2' >Existing Template</CommanButton>
                                                            </div>
                                                            <div>
                                                                {
                                                                    whichMessage === "write"
                                                                        ?
                                                                        <textarea className="form-control border-secondary" placeholder="Write your message here" id="writeMessage" rows={3} cols={20} onChange={(e) => { setwriteMessage(e.target.value) }}  >
                                                                        </textarea>
                                                                        :
                                                                        undefined


                                                                }
                                                            </div>

                                                            <div>
                                                                {
                                                                    whichMessage === "exist"
                                                                        ?
                                                                        <select className="form-select border-secondary" id="existMessage" onChange={(e) => { setexistMessage(e.target.value) }}  >
                                                                            <option value="" >Select your template</option>
                                                                            {
                                                                                getTemplates?.map((temp) => {
                                                                                    return <option key={temp?.templateid} value={temp?.templatemessage} >{temp?.templatemessage}</option>
                                                                                })
                                                                            }

                                                                        </select>
                                                                        :
                                                                        undefined
                                                                }
                                                            </div>


                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <CommanButton className='btn btn-success' onClick={onWhatMessage}>Submit</CommanButton>
                                                        </Modal.Footer>
                                                    </Modal>

                                                    <div className='m-2 d-flex'>
                                                        <div className="mx-2">
                                                            <textarea className="form-control border-secondary" placeholder="" id="ttsTextArea" rows={3} cols={25} disabled={(audioRadio === 'audio' ? true : false) || (p3 === 'active' ? true : false)} value={ttsTextArea} readOnly="true"  ></textarea>
                                                        </div>


                                                        <div className='mx-2'>
                                                            <div className="input-group mb-3 ">
                                                                <select className="form-select border-secondary" id="ttsVoiceTone" onChange={(e) => { setttsVoiceTone(e.target.value) }} disabled={(audioRadio === 'audio' ? true : false) || (p3 === 'active' ? true : false)}>
                                                                    <option value="">Select your voice tone</option>
                                                                    {
                                                                        getVoice?.map((voice, index) => {
                                                                            return <option key={index} value={voice.id} >{voice.aws_name}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="input-group ">
                                                                <select className="form-select border-secondary" id="ttsVoiceSpeed" onChange={(e) => { setttsVoiceSpeed(e.target.value) }} disabled={(audioRadio === 'audio' ? true : false) || (p3 === 'active' ? true : false)} >
                                                                    <option value="" >Select your voice speed</option>
                                                                    <option value="slow">Slow</option>
                                                                    <option value="medium">Medium</option>
                                                                    <option value="fast">Fast</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    {
                                                        personalized ?
                                                            <div className='mx-2 my-2 '>
                                                                <Tooltip title="Put var value for existing selected template" >
                                                                    <input type="text" id='textData' className='form-control border-secondary w-50 m-auto' placeholder='Text Data'
                                                                        disabled={(audioRadio === 'audio' ? true : false) || (p3 === 'active' ? true : false)} onChange={(e) => { settextData(e.target.value) }} />
                                                                </Tooltip>
                                                            </div>
                                                            : undefined
                                                    }
                                                    <div className="mx-2 d-flex justify-content-center">
                                                        <CommanButton type="submit" className="btnBack m-2" onClick={handleGenerateSpeech} disabled={(audioRadio === 'audio' ? true : false) || (p3 === 'active' ? true : false)}>Preview</CommanButton>
                                                        <div style={{ display: 'none' }}>
                                                            {Url && <audio controls src={Url} autoPlay="true" />}
                                                        </div>

                                                        <CommanButton type="submit" className="btnBack m-2" onClick={messageTypeValidation} disabled={(audioRadio === 'audio' ? true : false) || (p3 === 'active' ? true : false)}>Submit</CommanButton>
                                                    </div>

                                                </div>
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={messageRadio} index={1}>
                                            <div className="form-check m-2 ">
                                                <div className='d-flex align-items-center mt-2'>
                                                    {/* <input className="form-check-input m-2 border-secondary" type="radio" disabled={p3 === 'active' ? true : false} name="messageRadio" onChange={(e) => { setmessageRadio(e.target.value) }} id="messageRadio" value="text" />
                                                    <label className="form-check-label m-2" htmlFor="flexRadioDefault1">
                                                        Text to Speech – TTS tool
                                                    </label> */}
                                                    <CommanButton type="submit" className="btnBack mx-3" onClick={() => { setmodal((prev) => !prev) }} disabled={(messageRadio === 0 ? true : false) || (p3 === 'active' ? true : false)} >Add Template</CommanButton>

                                                </div>
                                                <Modal show={modal} onHide={() => { setmodal((prev) => !prev) }} aria-labelledby="contained-modal-title-vcenter">
                                                    <Modal.Header closeButton>
                                                        <Modal.Title id="contained-modal-title-vcenter">
                                                            Select message
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body className="grid-example">
                                                        <div className='d-flex justify-content-center '>
                                                            <CommanButton onClick={() => { setwhichMessage('write') }} className='btnBack btn m-2' >Writing Message</CommanButton>
                                                            <CommanButton onClick={() => { setwhichMessage('exist') }} value='exist' className='btnBack btn m-2' >Existing Template</CommanButton>
                                                        </div>
                                                        <div>
                                                            {
                                                                whichMessage === "write"
                                                                    ?
                                                                    <textarea className="form-control border-secondary" placeholder="Write your message here" id="writeMessage" rows={3} cols={20} onChange={(e) => { setwriteMessage(e.target.value) }}  >
                                                                    </textarea>
                                                                    :
                                                                    undefined


                                                            }
                                                        </div>

                                                        <div>
                                                            {
                                                                whichMessage === "exist"
                                                                    ?
                                                                    <select className="form-select border-secondary" id="existMessage" onChange={(e) => { setexistMessage(e.target.value) }}  >
                                                                        <option value="" >Select your template</option>
                                                                        {
                                                                            getTemplates?.map((temp) => {
                                                                                return <option key={temp?.templateid} value={temp?.templatemessage} >{temp?.templatemessage}</option>
                                                                            })
                                                                        }

                                                                    </select>
                                                                    :
                                                                    undefined
                                                            }
                                                        </div>


                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <CommanButton className='btn btn-success' onClick={onWhatMessage}>Submit</CommanButton>
                                                    </Modal.Footer>
                                                </Modal>

                                                <div className='m-2 d-flex'>
                                                    <div className="mx-2">
                                                        <textarea className="form-control border-secondary" placeholder="Click to add templete button" id="ttsTextArea" rows={3} cols={25} disabled={(messageRadio === 0 ? true : false) || (p3 === 'active' ? true : false)} value={ttsTextArea} readOnly="true"  ></textarea>
                                                    </div>


                                                    {/* <div className='mx-2'>
                                                        <div className="input-group mb-3 ">
                                                            <select className="form-select border-secondary" id="ttsVoiceTone" onChange={(e) => { setttsVoiceTone(e.target.value) }} disabled={(messageRadio === 0 ? true : false) || (p3 === 'active' ? true : false)}>
                                                                <option value="">Select your voice tone</option>
                                                                {
                                                                    getVoice?.map((voice, index) => {
                                                                        return <option key={index} value={voice?.name} >{voice?.name}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="input-group ">
                                                            <select className="form-select border-secondary" id="ttsVoiceSpeed" onChange={(e) => { setttsVoiceSpeed(e.target.value) }} disabled={(messageRadio === 0 ? true : false) || (p3 === 'active' ? true : false)} >
                                                                <option value="" >Select your voice speed</option>
                                                                <option value="slow">Slow</option>
                                                                <option value="medium">Medium</option>
                                                                <option value="fast">Fast</option>
                                                            </select>
                                                        </div>
                                                    </div> */}

                                                </div>

                                                {/* {
                                                    personalized ?
                                                        <div className='mx-2 my-2 '>
                                                            <Tooltip title="Put var value for existing selected template" >
                                                                <input type="text" id='textData' className='form-control border-secondary w-50 m-auto' placeholder='Text Data'
                                                                    disabled={(messageRadio === 0 ? true : false) || (p3 === 'active' ? true : false)} onChange={(e) => { settextData(e.target.value) }} />
                                                            </Tooltip>
                                                        </div>
                                                        : undefined
                                                } */}
                                                <div className="mx-2 d-flex justify-content-center">
                                                    {/* <CommanButton type="submit" className="btnBack m-2" onClick={handleGenerateSpeech} disabled={(messageRadio === 0 ? true : false) || (p3 === 'active' ? true : false)}>Preview</CommanButton>
                                                    <div style={{ display: 'none' }}>
                                                        {Url && <audio controls src={Url} autoPlay="true" />}
                                                    </div> */}

                                                    <CommanButton type="submit" className="btnBack m-2" onClick={messageTypeValidation} disabled={(messageRadio === 0 ? true : false) || (p3 === 'active' ? true : false)}>Submit</CommanButton>
                                                </div>

                                            </div>
                                        </CustomTabPanel>
                                    </Box>


                                </div>
                            </div>
                        </div>
                    </OuterBox>


                    <OuterBox value="5" able={p4 === 'active' ? true : false} >
                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Origination Number. &nbsp;
                                <span className="form-text">Origin of a communication, such as a phone call or text message</span></label>
                            <div className="row g-4 justify-content-center">

                                <div className="col-auto w-25">
                                    <div className="input-group mb-3 ">
                                        <select className="form-select border-secondary" id="originNo" onChange={(e) => { setoriginNo(e.target.value) }}
                                            disabled={p4 === 'active' ? true : false}
                                        >
                                            <option >Select Origination Number</option>
                                            {
                                                originationNumber?.map((each) => {
                                                    return <option key={each?.id} value={each?.origination_no}>{each?.origination_no}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <CommanButton type="submit" className="btnBack mb-3" onClick={originNoValidation} disabled={p4 === 'active' ? true : false} >Submit</CommanButton>
                                </div>
                            </div>
                        </div>
                    </OuterBox>


                    <OuterBox value="6" able={p5 === 'active' ? true : false} >
                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Upload your list . &nbsp;
                                <span className="form-text">Your list must include personalization variables in the text file. </span></label>

                            <div className="row g-3 justify-content-center ">

                                <div className='col-auto w-25'>
                                    <div className="input-group mb-3">
                                        <select className="form-select border-secondary" id="country" onChange={(e) => { setcountry(e.target.value) }}
                                            disabled={p5 === 'active' ? true : false}
                                        >
                                            <option >Select Country Code</option>
                                            {
                                                countryCodes?.map((each) => {
                                                    return <option key={each?.id} value={each?.country_code}>{each?.country_name} [{each?.country_code}]</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col-auto">
                                    <Tooltip title={<h6>"Inside in csv file must having following content like this - Number , $var1 , $var2 , $var3 "</h6>} style={{ fontSize: '15px' }} >

                                        <input type="file" accept='.txt' className="form-control border-secondary" id="listTxt" onChange={(e) => { (e.target?.files[0]?.size <= 2000000) ? setlistTxt(e.target?.files[0]) : toast.error("file must be less than 2MB") }} disabled={p5 === 'active' ? true : false} />
                                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension Must be .txt file(maxsize-2mb)</label>
                                    </Tooltip>
                                </div>
                                <div className="col-auto">
                                    <CommanButton type="submit" className="btnBack mb-3" onClick={listTxtValidation} disabled={p5 === 'active' ? true : false} >Submit</CommanButton>
                                </div>

                            </div>
                        </div>
                    </OuterBox>

                    <OuterBox value="7" able={p6 === 'active' ? true : false} >
                        <div className="my-2 w-100" >
                            <label htmlFor="" className="form-label fw-semibold formLabel">Schedule. &nbsp;
                                <span id="" className="form-text" >Set up days and time at which your campaign will run. Please notice that the platform does not make any call on sunday.</span></label>
                            <div className="row g-4 justify-content-center">
                                <div className='d-flex justify-content-center align-items-center' >
                                    <span className='align-self-center mx-4' >Date range</span>
                                    <CalendarMonthIcon fontSize='large' className='mx-2' />
                                    <span className='align-self-center mx-2' >From</span>
                                    <ReactDatePicker
                                        selected={scheduleFrom}
                                        onChange={(date) => { setscheduleFrom(date) }}
                                        dateFormat="dd-MM-YYYY"
                                        minDate={new Date()}
                                        className='p-2 border-1 rounded'
                                        disabled={(p6 === 'active' ? true : false)}
                                    />

                                    <span className='align-self-center mx-2' >to</span>
                                    <ReactDatePicker
                                        selected={scheduleTo}
                                        onChange={(date) => { setscheduleTo(date) }}
                                        dateFormat="dd-MM-YYYY"
                                        minDate={scheduleFrom}
                                        className='p-2 border-1 rounded'
                                        disabled={(scheduleFrom === null ? true : false) || (p6 === 'active' ? true : false)}
                                    />

                                </div>
                                <div className='d-flex justify-content-center align-items-center' >
                                    <span className='align-self-center mx-4' >Hour range</span>
                                    <AccessTimeIcon fontSize='large' className='mx-2' />
                                    <span className='align-self-center mx-2' >From</span>
                                    <ReactDatePicker
                                        selected={startTime}
                                        onChange={(time) => { setstartTime(time) }}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={5}
                                        dateFormat="hh:mm aa"
                                        minTime={new Date().setHours(7, 0)}
                                        maxTime={new Date().setHours(19, 0)}
                                        className='p-2 border-1 rounded'
                                        disabled={(scheduleFrom === null ? true : false) || (p6 === 'active' ? true : false) || (scheduleTo === null ? true : false)}
                                    />
                                    <span className='align-self-center mx-2' >to</span>
                                    <ReactDatePicker
                                        selected={lastTime}
                                        onChange={(time) => { setlastTime(time) }}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={5}
                                        dateFormat="hh:mm aa"
                                        minTime={(dayjs(scheduleFrom).format() === dayjs(scheduleTo).format()) ? startTime : new Date().setHours(7, 0)}
                                        maxTime={new Date().setHours(19, 0)}
                                        className='p-2 border-1 rounded'
                                        disabled={(scheduleFrom === null ? true : false) || (p6 === 'active' ? true : false) || (scheduleTo === null ? true : false) || (startTime === null ? true : false)}
                                    />

                                </div>
                                <div className='d-flex justify-content-center align-items-center' >
                                    <p className='align-self-center mx-4' >Day Range</p>
                                    <CalendarTodayIcon fontSize='large' className='mx-2' />
                                    <div
                                        className="col-auto"
                                        style={{
                                            margin: '5px 10px',
                                            minWidth: '100px',
                                            maxWidth: '150px',
                                            height: '100px',
                                            overflowY: 'scroll',
                                            padding: '4px',
                                            border: '1px solid ',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        <SelectInput type="checkbox" id="monday" onChange={daysEntry} value="1" title="Monday" disabled={weekDayDisable} />
                                        <br />
                                        <SelectInput type="checkbox" id="tuesday" onChange={daysEntry} value="2" title="Tuesday" disabled={weekDayDisable} />
                                        <br />
                                        <SelectInput type="checkbox" id="wednesday" onChange={daysEntry} value="3" title="Wednesday" disabled={weekDayDisable} />
                                        <br />
                                        <SelectInput type="checkbox" id="thursday" onChange={daysEntry} value="4" title="Thursday" disabled={weekDayDisable} />
                                        <br />
                                        <SelectInput type="checkbox" id="friday" onChange={daysEntry} value="5" title="Friday" disabled={weekDayDisable} />
                                        <br />
                                        <SelectInput type="checkbox" id="saturday" onChange={daysEntry} value="6" title="Saturday" disabled={weekDayDisable} />
                                        <br />
                                        <SelectInput type="checkbox" id="sunday" onChange={daysEntry} value="7" title="Sunday" disabled={weekDayDisable} />
                                    </div>


                                </div>

                            </div>
                        </div>
                    </OuterBox>


                    {/* <OuterBox value="8" able={p7 === 'active' ? true : false} >
                        <div className="my-2 w-100" >
                            <label htmlFor="exampleInputEmail1" className="form-label fw-semibold formLabel">Campaign Type. &nbsp;</label>
                            <div className="row g-3 justify-content-center">

                                <div className="form-check col-auto my-3">
                                    <input type="radio" value={campType} onChange={(() => { setcampType("O") })} name="campType" disabled={p7 === 'active' ? true : false} />
                                    <label className="form-check-label" htmlFor="review">
                                        OBD
                                    </label>
                                    <input type="radio" value={campType} onChange={(() => { setcampType('S') })} name="campType" disabled={p7 === 'active' ? true : false} />
                                    <label className="form-check-label" htmlFor="review">
                                        SMS
                                    </label>
                                </div>
                            </div>
                        </div>
                    </OuterBox> */}

                    <OuterBox value="8" able={p7 === 'active' ? true : false} >
                        <div className="my-2 w-100" >
                            <label htmlFor="exampleInputEmail1" className="form-label fw-semibold formLabel">Review. &nbsp;
                                <span id="emailHelp" className="form-text">Confirm that all the information has been filled correctly.</span></label>
                            <div className="row g-3 justify-content-center">

                                <div className="form-check col-auto">
                                    <input className="form-check-input border-secondary" type="checkbox" onChange={onReviewChange} id="review" disabled={p7 === 'active' ? true : false} />
                                    <label className="form-check-label" htmlFor="review">
                                        I ́ve reviewed all the information that will be submitted
                                    </label>
                                </div>
                            </div>
                        </div>
                    </OuterBox>


                </div>
                <div className="d-flex justify-content-center">
                    <CommanButton type="submit" className="btnBack mb-3" onClick={onSubmitHandler} >Save and submit campaign</CommanButton>
                </div>
                <BackDropLoader opener={loading} />
            </div>
        )
    }


}


export default CreateCampaign;