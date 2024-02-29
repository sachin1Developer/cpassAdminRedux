import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from 'react-router-dom';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteServer, getServer } from './slice/Server';
import CommanButton from '../../../components/CommanButton';


function ViewServer() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)

    const [serverList, setServerList] = useState([]);
    // const [countryList, setCountryList] = useState([]);
    // const [responseData, setResponseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;
    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = serverList.slice(indexofFirst, indexofLast);

    const getServerList = () => {
        dispatch(getServer(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setServerList(resp?.payload?.data?.body);
                } else {
                    toast.error('Internal server Error');
                }
                // console.log(resp.data.body)
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching Server list');
            });
    }

    const onDelete = (id) => {
        dispatch(deleteServer({ token: token, id: id }))
            .then((res) => {
                if (res?.payload?.status === 200) {
                    toast.success('Deleted successfully');
                    getServerList();
                } else {
                    toast.error('Internal server Error');
                }
            }).catch((error) => {
                console.error(error);
                toast.error('Error while deleting');
            });
    };

    useEffect(() => {
        getServerList();
    }, [])

    return (
        <div className='mx-3'>
            <div className=' d-flex justify-content-between my-2 align-items-center'>
                <h4 className='fw-bold mx-2'>View Server Country✨</h4>
                <div className='mx-2'>
                    <Link to="/systemConfiguration/addServerManagement"
                        state={{ data: serverList }}
                        style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Server </CommanButton>
                    </Link>
                </div>
            </div>

            <div className=''>
                <TableContainer style={{ backgroundColor: '' }} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bodyColor'>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}> ID</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}>Server Name</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}>Country Code</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}>Modify</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        {activePage.map((listServer, index) => (
                            <ViewCountryList
                                key={index}
                                list={listServer}
                                country={JSON.parse(listServer.countryCode)}
                                remove={onDelete}
                            />
                        ))}
                    </Table>
                </TableContainer>
            </div>
            <div className='d-flex justify-content-center my-4'>
                <Pagination count={Math.ceil(serverList.length / 10)} color="primary" onChange={(e, p) => setCurrentPage(p)} />
            </div>
        </div>
    );


}
export default ViewServer;


const ViewCountryList = ({ list, remove, country }) => {

    const [modal, setModal] = useState(false);
    const [data, setData] = useState({});
    const datass = country;

    useEffect(() => {
        setData(list);

    }, [list]);

    const showModal = () => {
        setModal(!modal);
    }

    return (
        <TableBody className="">
            <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0, fontSize: '12px' } }}>
                <TableCell component="th" align="center" scope="row" >
                    {data?.id}
                </TableCell>
                <TableCell align="center" >
                    {data?.serverName}
                </TableCell>

                <TableCell align="center" >
                    {
                        datass.map((name) => {
                            return <TableCell align="center" className='d-flex flex-column' style={{ padding: 0 }} >{name.countryName}({name.countryCode})</TableCell>
                        })

                    }
                </TableCell>
                <TableCell align="center" >
                    <Link style={{ color: 'rgb(100,116,139)' }} to='/systemConfiguration/modifyServerManagement'
                        state={{ data: data }}>
                        <EditNoteSharpIcon />
                    </Link>
                </TableCell>
                <TableCell align="center">
                    <button className="border-0" onClick={() => { setModal(!modal) }}>
                        <DeleteForeverIcon style={{ color: 'red' }} />
                    </button>
                    <Modal show={modal} onHide={() => { setModal(!modal) }}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-danger'>Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure, you want to delete this {data.serverName} ?</Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-danger' onClick={() => { remove(data.id); setModal(false) }}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}