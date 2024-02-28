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


function ViewUser() {
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)
    const [userView, setUserView] = useState([]);

    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;

    const getListofUser = () => {
        dispatch(getUserList(token))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setUserView(resp?.payload?.data?.body[0]);
                }else{
                    toast.error('Internal server error')
                }
                // setLoading(false);
                // console.log(resp.data.body)
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching subscriber range list');
            });
    }

    useEffect(() => {
        getListofUser()
    }, [])


    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = userView.slice(indexofFirst, indexofLast)


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


    return (
        <div>

            <div className=' d-flex justify-content-between my-2 align-items-center'>
                <h4 className='fw-bold mx-2'>View User ✨
                </h4>
                <div className='d-flex align-items-center'>
                    <Link to='/operatorConfig/userTypeManagement/addUserType' style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><AddIcon />Add User</CommanButton>
                    </Link>
                </div>
            </div>

            <div className='d-flex justify-content-center w-100'>
                <TableContainer  >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow className='bodyColor'>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>User Name</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Role Type</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Total Limit OBD</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>View</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Modify</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        {activePage.map((userList, index) => (
                            <ViewUserTypeList
                                key={index}
                                data={userList}
                                deleteUser={onDelete}
                            />
                        ))}
                    </Table>
                </TableContainer>
            </div>
            <div className='d-flex justify-content-center my-4'>
                <Pagination count={Math.ceil(userView.length / 10)} color="primary" onChange={(e, p) => setCurrentPage(p)} />
            </div>
        </div>
    );


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
        <TableBody className="">
            <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0, padding: 1 } }}>
                <TableCell component="th" align="center" scope="row" style={{ fontWeight: '600', fontSize: '12px', padding: '0' }}>
                    {data?.USERNAME}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: '0' }}>
                    {data?.ROLE_ID}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: '0' }}>
                    {/* {data.total_limit} */}
                    {limit.obdLimit}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: '0' }}>
                    <Link style={{ color: 'rgb(100,116,139)' }} to={`/operatorConfig/userTypeManagement/viewUserTypeDetail/${data?.USERNAME}`} >
                        <VisibilityOutlinedIcon />
                    </Link>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: '0' }}>
                    <Link style={{ color: 'black' }} to='/operatorConfig/userTypeManagement/modifyUserType'
                        state={ {data: data} } >
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
                        <Modal.Body>Are you sure, you want to delete this {data.USERNAME} ?</Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-danger' onClick={() => { deleteUser(data.USERNAME); setModal(false) }}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}