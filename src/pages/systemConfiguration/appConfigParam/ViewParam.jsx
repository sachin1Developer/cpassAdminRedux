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
import { deleteParams, getParamList } from './slice/AppConfigParam';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';
import Empty from '../../../components/empty/Empty';
import Loader from '../../../components/loader/Loader';


function ViewParam() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)

    const [paramList, setParamList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;
    const [loading, setLoading] = useState(true)
    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = paramList?.slice(indexofFirst, indexofLast);



    const getParam = () => {
        setLoading(true)
        dispatch(getParamList(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setParamList(resp?.payload?.data?.body);
                } else {
                    toast.error('Intenal server error');
                }
                setLoading(false)
                // console.log(resp.data.body)
            })
            .catch((error) => {
                console.error(error);
                setLoading(false)
                toast.error('Error while fetching list');
            });
    }

    const onDelete = (id) => {
        dispatch(deleteParams({ id: id, token: token }))
            .then((res) => {
                console.log(res)
                if (res?.payload?.status === 200) {
                    toast.success('Deleted successfully');
                    getParam();
                } else {
                    toast.error('Intenal server error');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while deleting');
            });
    };

    useEffect(() => {
        getParam();
    }, [])






    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='View Param'>
                    <Link to="/systemConfiguration/addAppConfigParam"
                        state={{ data: paramList }}
                        style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Param</CommanButton>
                    </Link>
                </Heading>
                {
                    paramList?.length === 0
                        ?
                        <Empty name='Data Not Found' />
                        :
                        <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded" >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                                    <TableRow className='bodyColor' >
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Param ID</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Param Tag</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Param Value</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Remarks</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Owner</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Modify</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {activePage?.map((paramList, index) => (
                                        <ViewParamList
                                            key={index}
                                            list={paramList}
                                            remove={onDelete}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
                {
                    paramList?.length > perPage
                    &&
                    <div className='d-flex justify-content-center my-4'>
                        <Pagination count={Math.ceil(paramList?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                    </div>
                }
            </div>
        );

    }
}
export default ViewParam;


const ViewParamList = ({ list, remove }) => {
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
            <TableCell className="border border-2" align="center"  style={{ color: 'black', fontWeight: '600' }} >
                {data?.paramId}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }} >
                {data?.paramTag}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: 'black', fontWeight: '600' }}>
                {data?.paramValue}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data?.remarks}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data?.owner}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'black' }} to='/systemConfiguration/modifyAppConfigParam' state={{ data: data }} >
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
                    <Modal.Body>Are you sure, you want to delete this {data.paramTag} ?</Modal.Body>
                    <Modal.Footer>
                        <Button className='btn btn-danger' onClick={() => { remove(data.paramId); setModal(false) }}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </TableCell>
        </TableRow>
    );
}