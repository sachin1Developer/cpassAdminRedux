import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addGroupMsisdnToBlacklist, addMsisdnToBlacklist, deleteBlacklistGroup, deleteBlacklistRange, getBlacklistGroupName, getBlacklistRange } from './slice/BlacklistManagement';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';
import Loader from '../../../components/loader/Loader';
import Empty from '../../../components/empty/Empty';



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div className='d-flex '
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


CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function tabsProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function BlacklistManage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state.token?.data?.token)
    const [loading, setloading] = useState(true)
    const [blackgrp, setBlackgrp] = useState([]);
    const [blacklistRange, setBlacklistRange] = useState([]);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getList = () => {
        setloading(true)
        dispatch(getBlacklistRange(token))
            .then((resp) => {
                console.log(resp)
                if (resp?.payload?.status === 200) {
                    setBlacklistRange(resp?.payload?.data?.data);
                    return dispatch(getBlacklistGroupName(token))
                } else {
                    toast.error('Internal server error')
                }
            }).then((resp) => {
                console.log(resp)
                if (resp?.payload?.status === 200) {
                    setBlackgrp(resp?.payload?.data);

                } else {
                    toast.error('Internal server error')
                }
                setloading(false)
            })
            .catch((error) => {
                console.error(error);
                setloading(false)
                toast.error('Error while fetching blacklist list');
            });
    }



    useEffect(() => {
        getList();
    }, [])



    const onAdd = (rangeId, msisdn) => {
        dispatch(addMsisdnToBlacklist({ token: token, id: rangeId, msisdn: msisdn }))
            .then((res) => {
                // console.log(res)
                if (res?.payload?.status === 200) {
                    toast.success('Added successfully');
                    getList();
                } else {
                    toast.error('Error while adding');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error(error);
            });;
    };

    const addFile = (rangeId, dataFile) => {
        let formData = null;
        console.log(rangeId, dataFile)
        formData = new FormData();
        formData.append('rangeID', rangeId);
        formData.append('file', dataFile);
        // console.log(formData)
        dispatch(addGroupMsisdnToBlacklist({ token: token, data: formData }))
            .then((res) => {
                // console.log(res)
                if (res?.payload?.status === 200) {
                    toast.success('Added successfully');
                    getList();
                } else {
                    toast.error('Error while adding');
                }
            });
    }


    const onDelete = (rangeId) => {
        dispatch(deleteBlacklistGroup({ token: token, id: rangeId }))
            .then((res) => {
                // console.log(res)
                if (res?.payload?.status === 200) {
                    toast.success('Deleted successfully');
                    getList();
                } else {
                    toast.error('Internal server error');
                }
            }).catch(() => {
                toast.error('Error while delete');
            })
    }


    const deleteRange = (rangeId) => {
        dispatch(deleteBlacklistRange({ token: token, id: rangeId }))
            .then((res) => {
                // console.log(res)
                if (res?.payload?.status === 200) {
                    toast.success('Deleted successfully');
                    getList();
                } else {
                    toast.error('Error while delete');
                }
            });
    }

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='Manage Blacklist'>
                    <Link to='/operatorConfig/blacklistManagemment/addBlacklist'>
                        <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </Heading>
                <div className='d-flex'>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab style={{ fontWeight: '700' }} label="Blacklist Range" {...tabsProps(0)} />
                                <Tab style={{ fontWeight: '700' }} label="Blacklist Group" {...tabsProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0} className='d-flex justify-content-center' >
                            {
                                blacklistRange?.length === 0
                                    ?
                                    <Empty name='Data Not Found' />
                                    :
                                    <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded"  >
                                        <Table aria-label="simple table">
                                            <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Range ID</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Range Name</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Start Range</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">End Range</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Modify</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    blacklistRange?.map((listpolicy, index) => (
                                                        <ViewBlacklistRange
                                                            key={index}
                                                            list={listpolicy}
                                                            deleteRange={deleteRange}

                                                        />
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                            }
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1} className='d-flex justify-content-center' >
                            {
                                blackgrp?.length === 0
                                    ?
                                    <Empty name='Data Not Found' />
                                    :
                                    <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded" >
                                        <Table sx={{}} aria-label="simple table">
                                            <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                                                <TableRow className='bodyColor'>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Range ID</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Range Name</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Total Msisdn Blacklisted</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Create Date</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Status</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Download</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">ADD</TableCell>
                                                    <TableCell align="center" className="border border-2 fw-bolder fs-6">Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    blackgrp?.map((listpolicy, index) => (
                                                        <ViewBlacklistGrp key={index} list={listpolicy} addOn={onAdd} addFile={addFile} remove={onDelete} />
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                            }
                        </CustomTabPanel>
                    </Box>
                </div>
                <div className='d-flex justify-content-center my-4'>
                    <CommanButton className='btnSend mx-4' >Delete</CommanButton>
                    <CommanButton className='btnSend mx-4' >Clear</CommanButton>
                </div>
            </div>
        );
    }



}

export default BlacklistManage;


const ViewBlacklistRange = ({ list, deleteRange }) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState({});


    useEffect(() => {
        setData(list);
        // console.log(list)
    }, [list]);

    const showModal = () => {
        setModal(!modal);
    }



    return (
        <TableRow >
            <TableCell className="border border-2" align="center" >
                {data.rangeId}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.rangeName}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.startsAt}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.endsAt}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'black' }} to='/operatorConfig/blacklistManagemment/modifyBlacklist'
                    state={{ data: data }}
                >
                    <EditNoteSharpIcon />
                </Link>
            </TableCell>
            <TableCell className="border border-2" align="center">
                <button className="border-0" style={{ background: 'transparent' }} onClick={() => { setModal(!modal) }}>
                    <DeleteForeverIcon style={{ color: 'red' }} />
                </button>
                <Modal show={modal} onHide={() => { setModal(!modal) }}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-danger'>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure, you want to delete this {data.rangeName} ?</Modal.Body>
                    <Modal.Footer>
                        <CommanButton className='btn btn-danger' onClick={() => { deleteRange(data.rangeId); setModal(false) }}>
                            Delete
                        </CommanButton>
                    </Modal.Footer>
                </Modal>
            </TableCell>
        </TableRow>
    );
}






let codeId = "codeId";

const ViewBlacklistGrp = ({ list, addOn, remove, addFile }) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState({});
    const [addModal, setAddModal] = useState(false);
    const [value, setValue] = useState(0);
    const [dataFile, setDataFile] = useState(null)



    const [msisdn, setMsisdn] = useState("");
    const handleMsisdn = (e) => {
        // let cCode = 221;
        let maxLength = 12;
        // setMsisdn(e.target.value)

        if (e.target.value.length <= maxLength) {
            if (e.target.value.startsWith("221")) {
                setMsisdn(e.target.value)
            }
            else if (e.target.value.length > 3) {
                toast.error("Please enter valid MSISDN", {
                    toastId: codeId
                })
            }
            setMsisdn(e.target.value)
        }
        else {
            toast.error("Maximum length is 12", {
                toastId: codeId
            })
        }
    }

    const handleDataFile = (e) => {
        console.log(e.target.files[0])
        // if (e.target.files[0] != null) {
        setDataFile(e.target.files[0])
        // }
        // else {
        //     toast.error("Please choose any file")
        // }
    }



    useEffect(() => {
        setData(list);
        // console.log(list)
    }, [list]);

    const showModal = () => {
        setModal(!modal);
    }

    const handleChange = (event, newValue) => {
        // console.log(newValue)
        setValue(newValue);
    };

    const clearText = () => {
        setMsisdn("")
    }

    return (
        <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell className="border border-2" align="center" >
                {data.RANGE_ID}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.RANGE_NAME}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.totalMsisdn}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.CREATE_DATE?.slice(0, 10)}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: 'blueviolet', fontWeight: '600' }}>
                {data.STATUS}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'rgb(63 72 85)' }} to='/operatorConfig/modifyPolicy'
                    state={{ data: data }}
                >
                    <FileDownloadOutlinedIcon />
                </Link>
            </TableCell>
            {/* <TableCell className="border border-2" align="center" >
                    <Link style={{ color: 'rgb(63 72 85)' }} to={{
                        pathname: '/operatorConfig/modifyPolicy',
                        state: { data: data },
                    }}>
                        <AddIcon />
                    </Link>
                </TableCell> */}


            <TableCell className="border border-2" align="center">
                <CommanButton className="border-0" onClick={() => { setAddModal(!addModal) }}>
                    <AddIcon />
                </CommanButton>
                <Modal show={addModal} onHide={() => { setAddModal(!addModal) }}>
                    <Modal.Header closeButton onClick={clearText}>
                        <Modal.Title className='fw-bold d-flex justify-content-center'>Add To Blacklist Range</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <div className='d-flex container '> */}
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: '800' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab style={{ fontWeight: '700' }} label="Add MSISDN To Group" {...tabsProps(0)} />
                                    <Tab style={{ fontWeight: '700' }} label="Add File To Group" {...tabsProps(1)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0} >
                                <TextField className='' id="outlined-basic" type='number' label="Enter MSISDN" variant="outlined" style={{ width: '350px', padding: '0px' }} onChange={handleMsisdn} />
                                <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter MSISDN with country code</label>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <Input className='' id="outlined-basic" type='file' accept='.txt' label="" variant="standard" style={{ padding: '0px', border: '1px ' }} onChange={handleDataFile} />
                            </CustomTabPanel>
                        </Box>

                        {/* </div> */}
                    </Modal.Body>
                    <Modal.Footer style={{ padding: '0px', paddingRight: '10px', paddingBottom: '10px' }}>
                        <CommanButton className=' btnBack' onClick={() => { if (value === 0) { addOn(data.RANGE_ID, msisdn) } else if (value === 1) { addFile(data.RANGE_ID, dataFile) }; setAddModal(!addModal) }}>
                            Submit
                        </CommanButton>
                    </Modal.Footer>
                </Modal>
            </TableCell>
            <TableCell className="border border-2" align="center">
                <button className="border-0" style={{ background: 'transparent' }} onClick={() => { setModal(!modal) }}>
                    <DeleteForeverIcon style={{ color: 'red' }} />
                </button>
                <Modal show={modal} onHide={() => { setModal(!modal) }}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-danger'>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure, you want to delete this {data.RANGE_NAME} ?</Modal.Body>
                    <Modal.Footer>
                        <CommanButton className='btn btn-danger' onClick={() => { remove(data.RANGE_ID); setModal(false) }}>
                            Delete
                        </CommanButton>
                    </Modal.Footer>
                </Modal>
            </TableCell>
        </TableRow>
    );
}






