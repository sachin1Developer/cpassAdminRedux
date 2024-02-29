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
import { deleteVoiceById, getSystemVoiceList } from './slice/VoiceConfiguration';
import CommanButton from '../../../components/CommanButton';


function ViewVoice() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)

    const [voiceList, setVoiceList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)



    const getVoiceList = () => {
        dispatch(getSystemVoiceList(token))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setVoiceList(resp?.payload?.data?.body);
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching voice list');
            });
    }

    const onDelete = (id) => {
        dispatch(deleteVoiceById({ token: token, id: id }))
            .then((res) => {
                if (res?.payload?.data?.httpStatusCode === 200) {
                    toast.success('Deleted successfully');
                    getVoiceList()
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while deleting');
            });
    };

    useEffect(() => {
        getVoiceList();
    }, [])

    const perPage = 10;
    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = voiceList?.slice(indexofFirst, indexofLast);
    return (
        <div className='mx-3'>
            <div className=' d-flex justify-content-between my-2 align-items-center'>
                <h4 className='fw-bold mx-2'>View Voice Type ✨</h4>
                <div className='mx-2'>
                    <Link to="/systemConfiguration/AddVoiceConfiguration"
                        state={{ data: voiceList }}
                        style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Voice Type </CommanButton>
                    </Link>
                </div>
            </div>

            <div className=''>
                <TableContainer style={{ backgroundColor: '' }} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow className='bodyColor'>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}> ID</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}>Voice Name</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}>AWS Name</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}>Country</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}>Status</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}>Modify</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', fontSize: '12px', padding: 10 }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            activePage?.map((each, index) => {
                                return <ViewVoiceList
                                    key={index}
                                    list={each}
                                    remove={onDelete}
                                />
                            })
                        }
                    </Table>
                </TableContainer>
            </div>
            <div className='d-flex justify-content-center my-4'>
                <Pagination count={Math.ceil(voiceList?.length / 10)} color="primary" onChange={(e, p) => setCurrentPage(p)} />
            </div>
        </div>
    );


}
export default ViewVoice;


const ViewVoiceList = ({ list, remove }) => {

    const [modal, setModal] = useState(false);
    const [data, setData] = useState({});

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
                    {data?.name}
                </TableCell>
                <TableCell align="center" >
                    {data?.aws_name}
                </TableCell>
                <TableCell align="center" >
                    {data?.country}
                </TableCell>
                <TableCell align="center" >
                    {data?.status}
                </TableCell>
                <TableCell align="center" >
                    <Link style={{ color: 'rgb(100,116,139)' }} to='/systemConfiguration/modifyVoiceConfiguration'
                        state={ {data: data }}
                    >
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
                        <Modal.Body>Are you sure, you want to delete this {data.name} ?</Modal.Body>
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