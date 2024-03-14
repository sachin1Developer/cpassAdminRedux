import React, { useEffect, useState } from 'react';
import Heading from '../../../components/header/Heading';
import { Col, Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { createChannel, createChannelandServerID, deleteChannel, getServersWithIds } from './slice/CIC';
import CommanButton from '../../../components/CommanButton';
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader';
import BackDropLoader from '../../../components/loader/BackDropLoader';


function AddChannel() {
    const dispatch = useDispatch()
    const token = useSelector(state => state?.token?.data?.token)
    const [tableData, settableData] = useState([])
    const [list, setlist] = useState([])
    const [selectServer, setselectServer] = useState('')
    const [addCount, setAddCount] = useState('')
    const [loading, setloading] = useState(true)
    const [backDropLoading, setbackDropLoading] = useState(false)

    useEffect(() => {
        getServerData()
    }, [])

    const getServerData = () => {
        setloading(true)
        dispatch(createChannelandServerID(token))
            .then((response) => {
                console.log(response)
                if (response?.payload?.data?.httpStatusCode === 200) {
                    settableData(response?.payload?.data?.body)
                    return dispatch(getServersWithIds(token))
                } else {
                    toast.error('Internal server error')
                }
            }).then((response) => {
                if (response?.payload?.data?.httpStatusCode === 200) {
                    setlist(response?.payload?.data?.body)
                } else {
                    toast.error('Internal server error')
                }
                setloading(false)
            }).catch((err) => {
                console.log(err)
                setloading(false)
                toast.error('Error while getting list')
            })
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    const count = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']

    const onSubmit = () => {
        if (selectServer?.length === 0) {
            toast.error("Please select server")
        } else if (addCount?.length === 0) {
            toast.error("Please select no. of channels")
        } else {
            setbackDropLoading(true)
            dispatch(createChannel({ token: token, count: addCount, server: selectServer }))
                .then((response) => {
                    if (response?.payload?.data?.httpStatusCode === 200) {
                        setselectServer('')
                        setAddCount('')
                        getServerData()
                    } else {
                        toast.error('Internal server error')
                    }
                    setbackDropLoading(false)
                }).catch((err) => {
                    console.log(err)
                    toast.error('Error while adding channels')
                    setbackDropLoading(false)
                })
        }
    }

    const onDelete = () => {
        if (selectServer?.length === 0) {
            toast.error("Please select server")
        } else if (addCount?.length === 0) {
            toast.error("Please select no. of channels")
        } else {

            const server = tableData?.find(item => item.serverId === selectServer);
            const cicCount = server ? parseInt(server.Count) : 0 ;
            if(cicCount < addCount){
                toast.error("Please select no. of channel minimum than count")
            }else{
                setbackDropLoading(true)
                dispatch(deleteChannel({ token: token, count: addCount, server: selectServer }))
                    .then((response) => {
                        if (response?.payload?.data?.httpStatusCode === 200) {
                            setselectServer('')
                            setAddCount('')
                            getServerData()
                        } else {
                            toast.error('Internal server error')
                        }
                        setbackDropLoading(false)
                    }).catch((err) => {
                        console.log(err)
                        toast.error('Error while adding channels')
                        setbackDropLoading(false)
                    })
            }

        }
    }

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='Add Channel' >

                </Heading>
                <>
                    <div className='container-fluid fs-6 fw-medium w-75 p-2 shadow-lg mb-2 bg-body-tertiary rounded border border-2'>
                        {
                            tableData?.map((each) => {
                                return (
                                    <Row className='text-left'>
                                        <Col className='text-center' >Server - {each?.serverName}[{each?.serverId}]</Col>
                                        {/* <Col className='text-center'>:</Col> */}
                                        <Col className='text-center' >Count - {each?.Count}</Col>
                                    </Row>
                                )
                            })
                        }

                    </div>
                    <div className='mt-5 mb-2 d-flex justify-content-center flex-wrap '>
                        <Box sx={{ minWidth: 250 }} >
                            <FormControl fullWidth className='m-2 '>
                                <InputLabel id="demo-simple-select-label">Select Server</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectServer}
                                    label="Select Server"
                                    onChange={(event) => { setselectServer(event.target.value) }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        list?.map((each) => {
                                            return <MenuItem value={`${each?.ServerId}`}>{each?.ServerName}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 250 }}>
                            <FormControl fullWidth className='m-2'>
                                <InputLabel id="demo-simple-select-label">Select Number of channels</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={addCount}
                                    label="Select Number of channels"
                                    onChange={(event) => { setAddCount(event.target.value) }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        count?.map((each) => {
                                            return <MenuItem value={`${each}`}>{each}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <CommanButton type="submit" onClick={onSubmit} className='mx-2' > Add Channel </CommanButton>
                        <CommanButton type="submit" onClick={onDelete} className='mx-2' > Delete Channel </CommanButton>
                    </div>
                </>
                <BackDropLoader opener={backDropLoading} />
            </div>
        );
    }


}

export default AddChannel;