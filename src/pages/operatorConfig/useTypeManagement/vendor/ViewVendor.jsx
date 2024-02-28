import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from 'react-bootstrap';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVendorById, getVendorList } from '../slice/UserTypeManagement';
import CommanButton from '../../../../components/CommanButton';


function ViewVendor() {
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)

    const [vendorList, setVendorList] = useState([]);

    const getVendorData = () => {
        dispatch(getVendorList(token))
            .then((resp) => {
                // console.log(resp.data)
                if (resp?.payload?.status === 200) {
                    setVendorList(resp?.payload?.data);
                } else {
                    toast.error('Internal server error');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching Vendor List');
            });
    }


    const deleteVendorData = (id) => {
        dispatch(deleteVendorById({ id: id, token: token }))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    toast.success('Deleted successfully');
                    getVendorData();
                } else {
                    toast.error('Internal server error');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while Deleting Vendor ');
            });
    }



    useEffect(() => {
        getVendorData();
    }, [])


    return (
        <div className='mx-3'>

            <div className=' d-flex justify-content-between my-2 align-items-center'>
                <h4 className='fw-bold mx-2'>View Vendor ✨
                </h4>
                <div className='d-flex align-items-center'>
                    <Link style={{ textDecoration: 'none' }} to='/operatorConfig/userTypeManagement/addVendor'>
                        <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><AddIcon />Add Vendor</CommanButton>
                    </Link>
                </div>
            </div>


            <div>
                <TableContainer style={{ backgroundColor: '', width: '900px' }} >
                    <Table sx={{}} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bodyColor'>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>User ID</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>User Name</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Person Contact</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Postion</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Mobile</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>View</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Modify</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        {vendorList.map((userList, index) => (
                            <ViewVendorTypeList
                                key={index}
                                list={userList}
                                remove={deleteVendorData}
                            />
                        ))}
                    </Table>
                </TableContainer>
            </div>
        </div>
    );


}

export default ViewVendor;


const ViewVendorTypeList = ({ list, remove }) => {
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
            <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" align="center" scope="row" style={{ fontWeight: '600', fontSize: '12px', padding: '0' }}>
                    {data.userid}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: '0' }}>
                    {data.username}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: '0' }}>
                    {data.personContact}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: '0' }}>
                    {data.position}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: '0' }}>
                    {data.mobileNum}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: '0' }}>
                    <Link style={{ color: 'rgb(100,116,139)' }} to={`/operatorConfig/userTypeManagement/viewVendorDetail/${data.userid}`}
                    >
                        <VisibilityOutlinedIcon />
                    </Link>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', padding: '0' }}>
                    <Link style={{ color: 'black' }} to='/operatorConfig/userTypeManagement/modifyVendor'
                        state={{ data: data }} >
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
                        <Modal.Body>Are you sure, you want to delete this {data.username} ?</Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-danger' onClick={() => { remove(data.userid); setModal(false) }}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}