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


function ViewParam() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)

    const [paramList, setParamList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;
    const [loading, setLoading] = useState(true)
    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = paramList.slice(indexofFirst, indexofLast);



    const getParam = () => {
        dispatch(getParamList(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                setParamList(resp?.payload?.data?.body);
                }else {
                    toast.error('Intenal server error');
                }
                // setLoading(false);
                // console.log(resp.data.body)
            })
            .catch((error) => {
                console.error(error);
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







    return (
        <Container>

            <div className=' d-flex justify-content-between my-2 align-items-center'>
                <h4 className='fw-bold mx-2'>View Param ✨
                </h4>
                <div className='mx-2'>
                    <Link to="/systemConfiguration/addAppConfigParam"
                        state={{ data: paramList }}
                        style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Param</CommanButton>
                    </Link>
                </div>
            </div>

            <div className=''>
                <TableContainer style={{ backgroundColor: '' }} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bodyColor'>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10, fontSize: '12px' }}>Param ID</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10, fontSize: '12px' }}>Param Tag</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10, fontSize: '12px' }}>Param Value</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10, fontSize: '12px' }}>Remarks</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10, fontSize: '12px' }}>Owner</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10, fontSize: '12px' }}>Modify</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10, fontSize: '12px' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        {activePage.map((paramList, index) => (
                            <ViewParamList
                                key={index}
                                list={paramList}
                                remove={onDelete}
                            />
                        ))}
                    </Table>
                </TableContainer>
            </div>
            <div className='d-flex justify-content-center my-4'>
                <Pagination count={Math.ceil(paramList.length / 10)} color="primary" onChange={(e, p) => setCurrentPage(p)} />
            </div>
        </Container>
    );


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
        <TableBody className="">
            <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0, fontSize: '12px', padding: 1 } }}>
                <TableCell component="th" align="center" scope="row" >
                    {data?.paramId}
                </TableCell>
                <TableCell align="center" >
                    {data?.paramTag}
                </TableCell>
                <TableCell align="center">
                    {data?.paramValue}
                </TableCell>
                <TableCell align="center" >
                    {data?.remarks}
                </TableCell>
                <TableCell align="center" >
                    {data?.owner}
                </TableCell>
                <TableCell align="center" >
                    <Link style={{ color: 'rgb(100,116,139)' }} to={{
                        pathname: '/systemConfiguration/modifyAppConfigParam',
                        state: { data: data },
                    }}>
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
                        <Modal.Body>Are you sure, you want to delete this {data.paramTag} ?</Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-danger' onClick={() => { remove(data.paramId); setModal(false) }}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}