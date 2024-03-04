import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Link, } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from 'react-bootstrap';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserByName, getUserList } from '../slice/UserTypeManagement';
import CommanButton from '../../../../components/CommanButton';
import Heading from '../../../../components/header/Heading';
import Empty from '../../../../components/empty/Empty';
import Loader from '../../../../components/loader/Loader';


function ViewUser() {
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)
    const [userView, setUserView] = useState([]);
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;

    const getListofUser = () => {
        setloading(true)
        dispatch(getUserList(token))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setUserView(resp?.payload?.data?.body[0]);
                } else {
                    toast.error('Internal server error')
                }
                setloading(false);
                // console.log(resp.data.body)
            })
            .catch((error) => {
                console.error(error);
                setloading(false);
                toast.error('Error while fetching subscriber range list');
            });
    }

    useEffect(() => {
        getListofUser()
    }, [])


    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = userView?.slice(indexofFirst, indexofLast)


    const onDelete = (name) => {
        dispatch(deleteUserByName({ token: token, id: name }))
            .then((res) => {
                if (res?.payload?.status === 200) {
                    toast.success('Deleted successfully');
                    getListofUser();
                } else {
                    toast.error('Error while delete');
                }
            });
    };

    if (loading) {
        return <Loader />
    } else {
        return (
            <div>
                <Heading name='View User'>
                    <Link to='/operatorConfig/userTypeManagement/addUserType' style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><AddIcon />Add User</CommanButton>
                    </Link>
                </Heading>

                {
                    userView?.length === 0
                        ?
                        <Empty name='Template Not Found' />
                        :
                        <TableContainer className='p-2 shadow-lg mb-2 bg-body-tertiary rounded' >
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: '#d6d6f7' }} >
                                    <TableRow className='bodyColor'>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >User Name</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Role Type</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Total Limit OBD</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >View</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Modify</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        activePage.map((userList, index) => (
                                            <ViewUserTypeList
                                                key={index}
                                                data={userList}
                                                deleteUser={onDelete}
                                            />
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
                {
                    userView?.length > perPage
                    &&
                    <div className='d-flex justify-content-center my-4'>
                        <Pagination count={Math.ceil(userView?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                    </div>
                }
            </div>
        );
    }


}

export default ViewUser;


const ViewUserTypeList = ({ key, data, deleteUser }) => {

    const [modal, setModal] = useState(false);
    // const [data, setData] = useState({});

    const limit = JSON.parse(data?.total_limit)

    // useEffect(() => {
    //     // setData(data);
    //     // console.log(limit.obdLimit)
    // }, []);

    const showModal = () => {
        setModal(!modal);
    }



    return (
        <TableRow >
            <TableCell className="border border-2" align="center"  >
                {data?.USERNAME}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data?.ROLE_ID}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {/* {data.total_limit} */}
                {limit.obdLimit}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'black' }} to={`/operatorConfig/userTypeManagement/viewUserTypeDetail/${data?.USERNAME}`} >
                    <VisibilityOutlinedIcon />
                </Link>
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'black' }} to='/operatorConfig/userTypeManagement/modifyUserType'
                    state={{ data: data }} >
                    <EditNoteSharpIcon />
                </Link>
            </TableCell>
            <TableCell className="border border-2" align="center">
                <button style={{ background: 'transparent' }} className="border-0" onClick={() => { setModal(!modal) }}>
                    <DeleteForeverIcon style={{ color: 'red' }} />
                </button>
                <Modal show={modal} onHide={() => { setModal(!modal) }}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-danger'>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure, you want to delete this {data.USERNAME} ?</Modal.Body>
                    <Modal.Footer>
                        <Button className='btn btn-danger' onClick={() => { deleteUser(data.USERNAME); setModal(false) }}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </TableCell>
        </TableRow>
    );
}