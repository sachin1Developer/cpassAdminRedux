import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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


function ViewPolicy() {
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)
    const [policyList, setPolicyList] = useState([]);
    const [loading, setLoading] = useState(true)

    const getPolicy = () => {
        setLoading(true)
        dispatch(viewPolicyManagement(token))
            .then((resp) => {
                if (resp?.payload?.status) {
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





    if (loading) {
        return <Loader />
    } else {
        return (
            <div className=''>
                <div className=' d-flex justify-content-between my-2 align-items-center'>
                    <h4 className='fw-bold mx-2'>View Policy ✨
                    </h4>
                    <div className='mx-2'>
                        <Link to='/operatorConfig/addPolicy'
                            state={{ data: policyList }} style={{ textDecoration: 'none' }}>
                            <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Policy</CommanButton>
                        </Link>
                    </div>
                </div>

                <div className=''>
                    <TableContainer style={{ backgroundColor: '' }} >
                        <Table >
                            <TableHead>
                                <TableRow className='bodyColor'>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Policy ID</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Policy Name</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Description</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Exist</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>View</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Modify</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Delete</TableCell>
                                    {/* <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>
                                        <Input type="checkbox" style={{ borderColor: 'black' }} />
                                    </TableCell> */}
                                </TableRow>
                            </TableHead>
                            {policyList?.map((listpolicy, index) => (
                                <ViewPolicyList
                                    key={index}
                                    list={listpolicy}
                                    remove={onDelete}
                                />
                            ))}
                        </Table>
                    </TableContainer>
                </div>
            </div >
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
        <TableBody className="">
            <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" align="center" scope="row" style={{ fontWeight: '600', fontSize: '15px', height: '4em' }}>
                    {data.policyId}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px', height: '4em' }}>
                    {data.policyName}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px', height: '4em' }}>
                    {data.description}
                </TableCell>
                <TableCell align="center" style={{ color: 'blueviolet', fontWeight: 'bolder', fontSize: '15px', height: '4em' }}>
                    {data.status}
                </TableCell>
                <TableCell align="center" >
                    <Link style={{ color: 'rgb(100,116,139)' }} to='/operatorConfig/detailsPolicy'
                        state={{ data: data }}>
                        <VisibilityOutlinedIcon />
                    </Link>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px', height: '4em' }}>
                    <Link style={{ color: 'rgb(100,116,139)' }} to='/operatorConfig/modifyPolicy'
                        state={{ data: data }}>
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
                        <Modal.Body>Are you sure, you want to delete this {data.policyName} ?</Modal.Body>
                        <Modal.Footer>
                            <CommanButton className='btn btn-danger' onClick={() => { remove(data.policyId); setModal(false) }}>
                                Delete
                            </CommanButton>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}