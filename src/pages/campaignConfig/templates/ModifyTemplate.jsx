import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "reactstrap";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Textarea } from "@mui/joy";
import CommanButton from "../../../components/CommanButton";
import Heading from "../../../components/header/Heading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addLbsTemplateById, modifyLbsTemplate } from "./slice/Templates";
import BackDropLoader from "../../../components/loader/BackDropLoader";
import Loader from "../../../components/loader/Loader";

export default function ModifyTemplate() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state?.token?.data?.token)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [description, setDescription] = useState('')
    const [dataById, setDataById] = useState({})
    const [loading, setloading] = useState(true)
    const [backdropLoading, setBackdropLoading] = useState(false)

    if ((id === undefined) || (id === null)) {
        navigate('/templates/viewTemplates')
    }

    const getDataById = () => {
        setloading(true)
        dispatch(addLbsTemplateById({ token: token, id: id }))
            .then((response) => {
                if (response?.payload?.status === 200) {
                    setDataById(response?.payload?.data)
                    setName(response?.payload?.data?.templatename)
                    setMessage(response?.payload?.data?.templatemessage)
                    setDescription(response?.payload?.data?.templatedescription)
                } else {
                    toast.error("Internal server error")
                }
                setloading(false)
            }).catch((err) => {
                console.log(err)
                setloading(false)
                toast.error('Error while Voices list')
            })
    }
    useEffect(() => {
        getDataById()
    }, [])


    const onSubmit = () => {
        if (name?.length === 0) {
            toast.error('Please enter name')
        } else if (message?.length === 0) {
            toast.error('Please enter message')
        } else if (description?.length === 0) {
            toast.error('Please enter description')
        } else {
            let data = {
                "templateid": id,
                "templatedescription": description,
                "templatemessage": message,
                "tokensallowed": "NA",
                "languageid": 11,
                "templatetype": 120,
                "templatename": name
            }
            setBackdropLoading(true)
            dispatch(modifyLbsTemplate({ token: token, data: data }))
                .then((response) => {
                    if (response?.payload?.data?.httpStatusCode === 200) {
                        toast.success('Template updated successfully')
                        navigate('/templates/viewTemplates')
                    } else {
                        toast.error("Internal server error")
                    }
                    setBackdropLoading(false)
                }).catch((err) => {
                    console.log(err)
                    setBackdropLoading(false)
                    toast.error('Error while creating template')
                })
        }
    }

    const onReset = () => {
        setName(dataById?.templatename)
        setMessage(dataById?.templatemessage)
        setDescription(dataById?.templatedescription)
    }

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='Modify Template' >
                    <Link to="/templates/viewTemplates" style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </Heading>
                <div className="container w-50" >
                    <div className="d-flex justify-content-between align-items-center my-2 ">
                        <label htmlFor="name" className="fw-bold">Template Name : </label>&nbsp;
                        <Input type="text" id="name" className=" w-50 border-secondary" value={name} onChange={(event) => setName(event.target.value)} readOnly />
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
                    <CommanButton className="m-2" onClick={onReset} >Reset</CommanButton>
                    <CommanButton className="m-2" onClick={onSubmit} >Submit</CommanButton>
                </div>
                <BackDropLoader opener={backdropLoading} />
            </div>
        );
    }


}
