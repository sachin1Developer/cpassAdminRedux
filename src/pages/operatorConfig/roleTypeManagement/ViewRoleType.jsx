import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CommanButton from '../../../components/CommanButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoleTypeManagement, viewRoleTypeManagement } from './slice/RoleTypeManagement';




function ViewRoleType() {
    const dispatch = useDispatch()
    const [roleView, setRoleView] = useState([]);
    const [deleteResp, setDeleteResp] = useState("");
    let token = useSelector(state => state.token?.data?.token)

    const getRoles = () => {
        dispatch(viewRoleTypeManagement(token))
            .then((resp) => {
                if (resp?.payload?.status) {
                    setRoleView(resp?.payload?.data?.body);
                } else {
                    toast.error('Internal server error')
                }
                // setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching subscriber range list');
            });
    }

    useEffect(() => {
        getRoles()
    }, [])


    const onDelete = (roleId) => {
        dispatch(deleteRoleTypeManagement({ token: token, id: roleId }))
            .then((res) => {
                // console.log(res?.payload?.data)
                if (res?.payload?.status === 200) {
                    toast.success('Deleted successfully');
                    setDeleteResp(res?.payload?.data)
                    getRoles();
                } else {
                    toast.error('Internal server error')
                }
            }).catch((error) => {
                console.error(error);
                toast.error('Error while deleting');
            });
    }


    return (
        <Container>
            <div>
                <div className=' d-flex justify-content-between my-2 align-items-center'>
                    <h4 className='fw-bold mx-2'>View Role ✨
                    </h4>
                    <div>
                        <Link to='/operatorConfig/addRoleType'>
                            <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Role</CommanButton>
                        </Link>
                    </div>
                </div>
                <div className='my-4 ' id='search'>
                    <TableContainer >
                        <Table sx={{}} aria-label="simple table">
                            <TableHead>
                                <TableRow className='bodyColor'>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Serial No.</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Role Name</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Description</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> View</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Modify</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            {roleView.map((roles, index) => (
                                <ViewRoles
                                    key={index}
                                    index={index}
                                    list={roles}
                                    remove={onDelete}
                                />
                            ))}
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Container >
    );


}



const ViewRoles = ({ index, list, remove }) => {
    const [data, setData] = useState({});
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setData(list);
        // console.log(list)
    }, [list]);


    const token = localStorage.getItem("Bearer");


    return (
        <TableBody className="">
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" style={{ fontWeight: '600', fontSize: '12px', height: '4em', padding: '0' }}>
                    {index + 1}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '600', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data.roleName}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data.description}
                </TableCell>
                <TableCell align="center" >
                    <Link style={{ color: 'rgb(100,116,139)' }} to={`/operatorConfig/viewDetailsRole/${data.roleId}`}
                        state={{ data: data }}>
                        <VisibilityOutlinedIcon />
                    </Link>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px', height: '4em' }}>
                    {data.roleId === 1 ? <EditNoteSharpIcon style={{ color: 'rgb(100,116,139)' }} />
                        : <Link style={{ color: 'rgb(100,116,139)' }} to={`/operatorConfig/modifyRoleType/${data.roleId}`} >
                            <EditNoteSharpIcon />
                        </Link>
                    }
                </TableCell>
                <TableCell align="center">
                    {data.roleId === 1 ? <DeleteForeverIcon style={{ color: 'red' }} />
                        : <button className="border-0" onClick={() => { setModal(!modal) }}>
                            <DeleteForeverIcon style={{ color: 'red' }} />
                        </button>
                    }
                    <Modal show={modal} onHide={() => { setModal(!modal) }}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-danger'>Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure, you want to delete this {data.roleName} ?</Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-danger' onClick={() => { remove(data.roleId); setModal(false) }}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}



export default ViewRoleType;