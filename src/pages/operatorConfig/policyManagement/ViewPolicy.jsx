import React, { useEffect, useState } from 'react';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, Redirect } from 'react-router-dom';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import CommanButton from '../../../components/CommanButton';
import Loader from '../../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { deletePolicyManagement, viewPolicyManagement } from './slice/PolicyManagement';
import Heading from '../../../components/header/Heading';
import Empty from '../../../components/empty/Empty';


function ViewPolicy() {
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)
    const [policyList, setPolicyList] = useState([]);
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;

    const getPolicy = () => {
        setLoading(true)
        dispatch(viewPolicyManagement(token))
            .then((resp) => {
                console.log(resp)
                if (resp?.payload?.status === 200) {
                    setPolicyList(resp.payload.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                toast.error('Error while fetching subscriber range list');
            });
    }

    const onDelete = (id) => {
        dispatch(deletePolicyManagement({ id: id, token: token }))
            .then((res) => {
                if (res?.payload?.status === 200) {
                    toast.success('Deleted successfully');
                    getPolicy();
                } else {
                    toast.error('Internal server error');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while delete');
            });
    };

    useEffect(() => {
        getPolicy();
    }, [])


    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = policyList?.slice(indexofFirst, indexofLast)


    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='View Policy'>
                    <Link to='/operatorConfig/addPolicy'
                        state={{ data: policyList }} style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Policy</CommanButton>
                    </Link>
                </Heading>
                {
                    policyList?.length === 0
                        ?
                        <Empty name='Data Not Found' />
                        :
                        <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded" >
                            <Table >
                                <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                                    <TableRow className='bodyColor'>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Policy ID</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Policy Name</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Description</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Exist</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >View</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Modify</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Delete</TableCell>
                                        {/* <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>
                                        <Input type="checkbox" style={{ borderColor: 'black' }} />
                                    </TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {activePage?.map((listpolicy, index) => (
                                        <ViewPolicyList
                                            key={index}
                                            list={listpolicy}
                                            remove={onDelete}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
                {
                    policyList?.length > perPage
                    &&
                    <div className='d-flex justify-content-center my-4'>
                        <Pagination count={Math.ceil(policyList?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                    </div>
                }
            </div>
        );
    }


}
export default ViewPolicy;


const ViewPolicyList = ({ list, remove }) => {
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
                {data.policyId}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: 'black', fontWeight: '600' }} >
                {data.policyName}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.description}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }} >
                {data.status}
            </TableCell>
            <TableCell className="border border-2" align="center"  >
                <Link style={{ color: 'black' }} to='/operatorConfig/detailsPolicy'
                    state={{ data: data }}>
                    <VisibilityOutlinedIcon />
                </Link>
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'black' }} to='/operatorConfig/modifyPolicy'
                    state={{ data: data }}>
                    <EditNoteSharpIcon />
                </Link>
            </TableCell>
            <TableCell className="border border-2" align="center">
                <button className="border-0" onClick={() => { setModal(!modal) }}>
                    <DeleteForeverIcon style={{ color: 'red' }} />
                </button>
                <Modal show={modal} onHide={() => { setModal(!modal) }}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-danger'>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure, you want to delete this {data.policyName} ?</Modal.Body>
                    <Modal.Footer>
                        <CommanButton className='btn btn-danger' onClick={() => { remove(data.policyId); setModal(false) }}>
                            Delete
                        </CommanButton>
                    </Modal.Footer>
                </Modal>
            </TableCell>
        </TableRow>
    );
}