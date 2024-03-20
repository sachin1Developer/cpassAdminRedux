import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "reactstrap";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Textarea } from "@mui/joy";
import CommanButton from "../../../components/CommanButton";
import Heading from "../../../components/header/Heading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addLbsTemplate } from "./slice/Templates";
import BackDropLoader from "../../../components/loader/BackDropLoader";


function AddTemplate() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state?.token?.data?.token)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setloading] = useState(false)

    // const [voices, setvoices] = useState([])

    // const getVoice = () => {
    //     dispatch(getSystemVoiceList(token))
    //     .then((response)=>{
    //         if (response?.payload?.data?.httpStatusCode === 200) {
    //             setvoices(response?.payload?.data?.body)
    //         } else {
    //             toast.error("Internal server error")
    //         }
    //     }).catch((err)=>{
    //         console.log(err)
    //         toast.error('Error while Voices list')
    //     })
    // }
    // useEffect(() => {
    //   getVoice()
    // }, [])

    // console.log(voices)

    const onSubmit = () => {
        if (name?.length === 0) {
            toast.error('Please enter name')
        } else if (message?.length === 0) {
            toast.error('Please enter message')
        } else if (description?.length === 0) {
            toast.error('Please enter description')
        } else {
            let data = {
                "templatedescription": description,
                "templatemessage": message,
                "tokensallowed": "NA",
                "languageid": 11,
                "templatetype": 120,
                "templatename": name
            }
            setloading(true)
            dispatch(addLbsTemplate({ token: token, data: data }))
                .then((response) => {
                    if (response?.payload?.data?.httpStatusCode === 200) {
                        toast.success('Template created successfully')
                       navigate('/templates/viewTemplates')
                    } else {
                        if (response?.payload?.data?.message === ' Template Aldry Exists') {
                            toast.error('Template Name Already Exists')
                        } else {
                            
                            toast.error("Internal server error")
                        }
                    }
                    setloading(false)
                }).catch((err)=>{
                    console.log(err)
                    setloading(false)
                    toast.error('Error while creating template')
                })
        }
    }

    return (
        <div className='mx-3'>
            <Heading name='Add Template' >
                <Link to="/templates/viewTemplates" style={{ textDecoration: 'none' }}>
                    <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </Heading>
            <div className="container w-75" >
                <div className="d-flex justify-content-between align-items-center my-2 ">
                    <label htmlFor="name" className="fw-bold">Template Name : </label>&nbsp;
                    <Input type="text" id="name" className=" w-50 border-secondary" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="d-flex justify-content-between align-items-center my-2 ">
                    <label htmlFor="" className="fw-bold">Template Message : </label>&nbsp;
                    <Textarea type="text" minRows={3} value={message} className=" border-secondary w-50" required onChange={(event) => setMessage(event.target.value)} />
                </div>
                <div className="d-flex justify-content-between align-items-center my-2 ">
                    <label htmlFor="" className="fw-bold">Template Description : </label>&nbsp;
                    <Textarea type="text" minRows={3} value={description} className=" border-secondary w-50" required onChange={(event) => setDescription(event.target.value)} />
                </div>

                {/* <div className="d-flex justify-content-between align-items-center my-2 ">
                    <label htmlFor="" className="fw-bold">Voice Type : </label>&nbsp;
                    <div className="mt-2" >
                        <select className="form-select border-secondary text-center" id="country"  >
                            {
                                voices?.map((each,index)=>{
                                    return <option key={index} value={each?.name} >{each?.name}</option>
                                })
                            }
                            
                        </select>
                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> Specify NA As Default </label>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center my-2 ">
                    <label htmlFor="" className="fw-bold">Play Speed : </label>&nbsp;
                    <div className="mt-2" >
                        <select className="form-select border-secondary text-center" id="country"  >
                            <option value="">NA</option>
                        </select>
                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> Specify NA As Default </label>
                    </div>
                </div> */}

            </div>
            <div className="d-flex justify-content-center">
                {/* <CommanButton className="m-2">Play</CommanButton> */}
                <CommanButton className="m-2" onClick={onSubmit} >Submit</CommanButton>
            </div>
            <BackDropLoader opener={loading} />
        </div>
    );
}

export default AddTemplate;