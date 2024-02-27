import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link, Redirect, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from 'react-bootstrap';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import callApi from '../../../../serviceApi/CallApi';
import { toast } from 'react-toastify';
import { NavMenuContext } from 'rsuite/esm/Nav/NavMenu';


function ViewUser() {
    const [userView, setUserView] = useState([]);

    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;

    const getListofUser = () => {
        callApi.getUserList()
            .then((resp) => {
                setUserView(resp.data.body[0]);
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
        callApi.deleteuserByName(name)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Deleted successfully');
                    getListofUser();
                } else {
                    toast.error('Error while delete');
                }
            });
    };


    return (
        <Container>
            <div className=''>
                <b>
                    <h3 className='pvmHeading text-slate-800'>View User ✨
                        <div className='d-flex align-items-center '>
                            <Link to='/operatorConfig/userTypeManagement/addUserType' style={{ textDecoration: 'none' }}>
                                <Button type="submit" className="btnBack mb-3 d-flex align-items-center"  ><AddIcon />Add User</Button>
                            </Link>
                            {/*  <Link to='/operatorConfig/blacklistManagemment/searchBlacklist' style={{ textDecoration: 'none' }} >
                                <Button type="submit" className="btnBack mb-3 mx-2  d-flex align-items-center" ><ManageSearchIcon />Search Blacklist</Button>
                            </Link> */}
                        </div>
                    </h3>
                </b>
            </div>
            <div>
                <TableContainer style={{ backgroundColor: '', width: '900px' }} >
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
        </Container>
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

    const token = localStorage.getItem("Bearer");


    return (
        <TableBody className="">
            {
                token === null && <Redirect to='/' />
            }
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
                    <Link style={{ color: 'rgb(100,116,139)' }} to={{
                        pathname: '/operatorConfig/userTypeManagement/viewUserTypeDetail',
                        state: { data: data },
                    }}>
                        <VisibilityOutlinedIcon />
                    </Link>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: '0' }}>
                    <Link style={{ color: 'black' }} to={{
                        pathname: '/operatorConfig/userTypeManagement/modifyUserType',
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