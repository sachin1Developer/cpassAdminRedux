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
import Heading from '../../../components/header/Heading';
import Empty from '../../../components/empty/Empty';
import Loader from '../../../components/loader/Loader';


function ViewServer() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)

    const [serverList, setServerList] = useState([]);
    // const [countryList, setCountryList] = useState([]);
    // const [responseData, setResponseData] = useState([]);
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;
    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = serverList.slice(indexofFirst, indexofLast);

    const getServerList = () => {
        setloading(true)
        dispatch(getServer(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setServerList(resp?.payload?.data?.body);
                } else {
                    toast.error('Internal server Error');
                }
                setloading(false)
                // console.log(resp.data.body)
            })
            .catch((error) => {
                console.error(error);
                setloading(false)
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


    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='View Server Country'>
                    <Link to="/systemConfiguration/addServerManagement"
                        state={{ data: serverList }}
                        style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Server </CommanButton>
                    </Link>
                </Heading>
                {
                    serverList?.length === 0
                        ?
                        <Empty name='Server Not Found' />
                        :
                        <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded" >
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                                    <TableRow className='bodyColor'>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" > ID</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Server Name</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Country Code</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Modify</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {activePage.map((listServer, index) => (
                                        <ViewCountryList
                                            key={index}
                                            list={listServer}
                                            country={JSON.parse(listServer.countryCode)}
                                            remove={onDelete}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
                {
                    serverList?.length > perPage
                    &&
                    <div className='d-flex justify-content-center my-4'>
                        <Pagination count={Math.ceil(serverList?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                    </div>
                }
            </div>
        );

    }
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
        <TableRow >
            <TableCell className="border border-2" align="center" style={{ color: 'green', fontWeight: '600' }} >
                {data?.id}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }} >
                {data?.serverName}
            </TableCell>

            <TableCell className="border border-2" align="center" >
                {
                    datass?.map((name) => {
                        return <TableCell className="border border-2 d-flex flex-column m-1" align="center" style={{ padding: 0 }} >{name.countryName}({name.countryCode})</TableCell>
                    })

                }
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'black' }} to='/systemConfiguration/modifyServerManagement'
                    state={{ data: data }}>
                    <EditNoteSharpIcon />
                </Link>
            </TableCell>
            <TableCell className="border border-2" align="center">
                <button className="border-0" style={{background:'transparent'}} onClick={() => { setModal(!modal) }}>
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
    );
}