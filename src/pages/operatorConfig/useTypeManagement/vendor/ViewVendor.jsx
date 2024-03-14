import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Pagination, TableCell, TableRow } from "@mui/material";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from 'react-bootstrap';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVendorById, getVendorList } from '../slice/UserTypeManagement';
import CommanButton from '../../../../components/CommanButton';
import Heading from '../../../../components/header/Heading';
import Empty from '../../../../components/empty/Empty';
import Loader from '../../../../components/loader/Loader';
import DynamicTable from '../../../../components/table/DynamicTable';


function ViewVendor() {
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)
    const [loading, setloading] = useState(true)
    const [vendorList, setVendorList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;

    const getVendorData = () => {
        setloading(true)
        dispatch(getVendorList(token))
            .then((resp) => {
                console.log(resp)
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setVendorList(resp?.payload?.data?.body);
                } else {
                    toast.error('Internal server error');
                }
                setloading(false)
            })
            .catch((error) => {
                console.error(error);
                setloading(false)
                toast.error('Error while fetching Vendor List');
            });
    }


    const deleteVendorData = (id) => {
        dispatch(deleteVendorById({ id: id, token: token }))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
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

    const headers = ['User ID', 'User Name', 'Person Contact', 'Position', 'Mobile', 'View', 'Modify', 'Delete'];


    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = vendorList?.slice(indexofFirst, indexofLast)

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='View Vendor'>
                    <Link style={{ textDecoration: 'none' }} to='/operatorConfig/userTypeManagement/addVendor'>
                        <CommanButton type="submit" className="btnBack mb-3 d-flex align-items-center"  ><AddIcon />Add Vendor</CommanButton>
                    </Link>
                </Heading>

                {
                    vendorList?.length === 0
                        ?
                        <Empty name='Template Not Found' />
                        :
                        <DynamicTable data={headers} >
                            {activePage?.map((userList, index) => (
                                <ViewVendorTypeList
                                    key={index}
                                    list={userList}
                                    remove={deleteVendorData}
                                />
                            ))}
                        </DynamicTable>
                }
                {
                    vendorList?.length > perPage
                    &&
                    <div className='d-flex justify-content-center my-4'>
                        <Pagination count={Math.ceil(vendorList?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                    </div>
                }
            </div>
        );
    }


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
        <TableRow >
            <TableCell className="border border-2" align="center" >
                {data.userid}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }} >
                {data.username}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.personContact}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.position}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.mobileNum}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'black' }} to={`/operatorConfig/userTypeManagement/viewVendorDetail/${data.userid}`} >
                    <VisibilityOutlinedIcon />
                </Link>
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'black' }} to={`/operatorConfig/userTypeManagement/modifyVendor/${data.userid}`}
                    state={{ data: data }} >
                    <EditNoteSharpIcon />
                </Link>
            </TableCell>
            <TableCell className="border border-2" align="center">
                <button className="border-0" style={{ background: 'transparent' }} onClick={() => { setModal(!modal) }}>
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
    );
}