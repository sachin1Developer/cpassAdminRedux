import React, { useEffect, useState } from 'react';
import Heading from '../../../components/header/Heading';
import CommanButton from '../../../components/CommanButton';
import { Link } from 'react-router-dom';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import { useDispatch, useSelector } from 'react-redux';
import { ViewServersAndCICs, getServersAndCICsList } from './slice/CIC';
import { toast } from 'react-toastify';
import { TableCell, TableRow, Tooltip } from '@mui/material';
import Loader from '../../../components/loader/Loader';
import DetailsIcon from '@mui/icons-material/Details';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DynamicTable from '../../../components/table/DynamicTable';
import RefreshIcon from '@mui/icons-material/Refresh';

function ViewChannel() {
    const dispatch = useDispatch()
    const token = useSelector(state => state?.token?.data?.token)
    const [data, setData] = useState([])
    const [serverDetail, setserverDetail] = useState([])
    const [loading, setloading] = useState(true)
    const [obdLog, setobdLog] = useState(false)
    const handleOpen = () => setobdLog(true);
    const handleClose = () => setobdLog(false);
    const style = {
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        getData()
        // setInterval(() => {
        //     getData()
        // }, 10000);
    }, [])

    const getData = () => {
        setloading(true)

        dispatch(getServersAndCICsList(token))
            .then((response) => {
                if (response?.payload?.data?.httpStatusCode === 200) {
                    setserverDetail(response?.payload?.data?.body)
                    return dispatch(ViewServersAndCICs(token))
                } else {
                    toast.error('Internal server error')
                }
            }).then((response) => {
                if (response?.payload?.data?.httpStatusCode === 200) {
                    // setlist(response?.payload?.data?.body)
                    const respData = response?.payload?.data?.body
                    return new Promise(resolve => {
                        const serverGroups = respData.reduce((groups, entry) => {
                            const serverId = entry.SERVER_ID;
                            if (!groups[serverId]) {
                                groups[serverId] = [];
                            }
                            groups[serverId].push(entry);
                            return groups;
                        }, {});

                        // Convert object values to an array
                        const result = Object.values(serverGroups);
                        resolve(result);
                    });
                } else {
                    toast.error('Internal server error')
                }
            }).then((response) => {
                setData(response)
                setloading(false)
            })
            .catch((err) => {
                console.log(err)
                setloading(false)
            })
    }
    console.log(serverDetail)

    const servers = data?.map((eachServer, index) => {
        let total = eachServer?.length;
        let idle = eachServer?.reduce((count, obj) => {
            if (obj.CIC_STATUS === 'IDLE') {
                count++;
            }
            return count;
        }, 0);

        let busy = eachServer?.reduce((count, obj) => {
            if (obj.CIC_STATUS === 'BUSY') {
                count++;
            }
            return count;
        }, 0);

        let ring = eachServer?.reduce((count, obj) => {
            if (obj.CIC_STATUS === 'RING') {
                count++;
            }
            return count;
        }, 0);
        return (
            <div className='d-flex flex-column align-items-center border border-black border-2 mx-1 my-3 col-5 rounded' >
                <p className='fw-bold fs-5' >{eachServer[index]?.server_name}</p>
                <div>
                    <span className='mx-1 fw-bold' style={{ color: '' }}>[Total - {total}]</span>
                    <span className='mx-1 fw-bold' style={{ color: 'rgba(97, 99, 241, 0.6)' }}>[IDLE - {idle}]</span>
                    <span className='mx-1 fw-bold' style={{ color: 'rgba(255, 0, 0, 0.6)' }}>[BUSY - {busy}]</span>
                    <span className='mx-1 fw-bold' style={{ color: 'rgba(54,128,45, 0.7)' }}>[RING - {ring}]</span>
                </div>
                <div className='my-3 d-flex justify-content-center flex-wrap'>
                    {eachServer?.map((each) => {
                        return (
                            <Tooltip title={each?.MSISDN}>
                                <span className='border border-black border-2 rounded px-2 py-1 m-1 fw-bold' style={{
                                    color: 'black',
                                    backgroundColor:
                                        ((each?.CIC_STATUS === "IDLE" && 'rgba(97, 99, 241, 0.6)') || // Adjust the alpha value (0.5) for opacity
                                            (each?.CIC_STATUS === "RING" && 'rgba(54,128,45, 0.7)') ||
                                            (each?.CIC_STATUS === "BUSY" && 'rgba(255, 0, 0, 0.6)'))
                                }}>
                                    {(each?.CIC_STATUS === "IDLE" && 'I') || (each?.CIC_STATUS === "RING" && 'R') || (each?.CIC_STATUS === "BUSY" && 'B')}
                                </span>
                            </Tooltip>
                        )
                    })}
                </div>
            </div>
        )
    })

    const obdHeaders = ['Server Id', 'Camp Id', 'Total', 'Status', 'Refresh']

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='View Channel'>
                    <div className='d-flex justify-content-end flex-wrap'>
                        <CommanButton className="mx-2 my-2" onClick={handleOpen} ><DetailsIcon />OBD LOG DETAILS</CommanButton>
                        <Link to="/systemConfiguration/modifyChannel" style={{ textDecoration: 'none' }}>
                            <CommanButton type="submit" className="m-2" ><EditNoteSharpIcon /> Modify Channel</CommanButton>
                        </Link>
                    </div>
                </Heading>
                <div className='row d-flex justify-content-around flex-wrap'>
                    {servers}
                </div>
                <Modal
                    open={obdLog}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Server details
                        </Typography>
                        <DynamicTable data={obdHeaders}>
                            {
                                serverDetail?.map((each) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{each?.MEDIA_SERVER_ID}</TableCell>
                                            <TableCell>{each?.CAMP_ID}</TableCell>
                                            <TableCell>{each?.total}</TableCell>
                                            <TableCell>{each?.STATUS}</TableCell>
                                            <TableCell><button style={{ border: '0' }} onClick={getData}><RefreshIcon /></button></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </DynamicTable>
                    </Box>
                </Modal>
                <div className='d-flex justify-content-end'>
                    <CommanButton className="mx-2" onClick={getData} ><RefreshIcon />Refresh</CommanButton>
                </div>
            </div>
        );
    }

}

export default ViewChannel;