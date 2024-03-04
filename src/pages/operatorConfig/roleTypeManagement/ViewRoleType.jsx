import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CommanButton from '../../../components/CommanButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoleTypeManagement, viewRoleTypeManagement } from './slice/RoleTypeManagement';
import Heading from '../../../components/header/Heading';
import Empty from '../../../components/empty/Empty';
import Loader from '../../../components/loader/Loader';




function ViewRoleType() {
    const dispatch = useDispatch()
    const [roleView, setRoleView] = useState([]);
    let token = useSelector(state => state.token?.data?.token)
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;

    const getRoles = () => {
        setloading(true)
        dispatch(viewRoleTypeManagement(token))
            .then((resp) => {
                if (resp?.payload?.status) {
                    setRoleView(resp?.payload?.data?.body);
                } else {
                    toast.error('Internal server error')
                }
                setloading(false);
            })
            .catch((error) => {
                console.error(error);
                setloading(false)
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
                    getRoles();
                } else {
                    toast.error('Internal server error')
                }
            }).catch((error) => {
                console.error(error);
                toast.error('Error while deleting');
            });
    }


    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = roleView?.slice(indexofFirst, indexofLast)

    if (loading) {
        return <Loader />
    } else
    return (
        <div className='mx-3'>
            <Heading name='View Role'>
                <Link to='/operatorConfig/addRoleType'>
                    <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Role</CommanButton>
                </Link>
            </Heading>
            {
                roleView?.length === 0
                    ?
                    <Empty name='Template Not Found' />
                    :
                    <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded"  >
                        <Table sx={{}} aria-label="simple table">
                            <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                                <TableRow className='bodyColor'>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" > Serial No.</TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" > Role Name</TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" > Description</TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" > View</TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" > Modify</TableCell>
                                    <TableCell className="border border-2 fw-bolder fs-6" align="center" > Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    activePage?.map((roles, index) => (
                                        <ViewRoles key={index} index={index} list={roles} remove={onDelete} />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
            {
                    roleView?.length > perPage
                    &&
                    <div className='d-flex justify-content-center my-4'>
                        <Pagination count={Math.ceil(roleView?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                    </div>
                }
        </div>
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
        <TableRow >
            <TableCell className="border border-2" align="center" >
                {index + 1}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }} >
                {data.roleName}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.description}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'rgb(100,116,139)' }} to={`/operatorConfig/viewDetailsRole/${data.roleId}`}
                    state={{ data: data }}>
                    <VisibilityOutlinedIcon style={{color:'black'}} />
                </Link>
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.roleId === 1 ? <EditNoteSharpIcon style={{ color: 'rgb(100,116,139)' }} />
                    : <Link style={{ color: 'rgb(100,116,139)' }} to={`/operatorConfig/modifyRoleType/${data.roleId}`} >
                        <EditNoteSharpIcon style={{color:'black'}} />
                    </Link>
                }
            </TableCell>
            <TableCell className="border border-2" align="center">
                {data.roleId === 1 ? <DeleteForeverIcon style={{ color: 'rgb(100,116,139)' }} />
                    : <button className="border-0" style={{background:'transparent'}} onClick={() => { setModal(!modal) }}>
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
    );
}



export default ViewRoleType;