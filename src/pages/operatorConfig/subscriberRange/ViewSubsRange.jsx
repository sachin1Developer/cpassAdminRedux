import React, { useEffect, useState } from 'react';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from 'react-router-dom';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import CommanButton from '../../../components/CommanButton';
import { Modal } from 'react-bootstrap';
import { deleteSubscriberRange, viewSubscriberRange } from './slice/SubscriberRange';
import Loader from '../../../components/loader/Loader';
import Heading from '../../../components/header/Heading';
import Empty from '../../../components/empty/Empty';
import DynamicTable from '../../../components/table/DynamicTable';


function ViewSubsRange() {
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)
    const [subsRange, setSubsRange] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;

    const getSubsRange = () => {
        dispatch(viewSubscriberRange(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setSubsRange(resp?.payload?.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching subscriber range list');
            });
    }


    const onDelete = (id) => {
        dispatch(deleteSubscriberRange({ id: id, token: token }))
            .then((res) => {
                if (res?.payload?.status === 200) {
                    toast.success('Deleted successfully');
                    getSubsRange();
                } else {
                    toast.error('Error while delete');
                }
            });
    };


    useEffect(() => {
        getSubsRange()
    }, [])


    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = subsRange?.slice(indexofFirst, indexofLast)

    const headers = ['Range Name', 'Start Range', 'End Range', 'Country Code', 'View', 'Modify', 'Delete']

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-2'>
                <Heading name='View Range'>
                    <Link to='/operatorConfig/addSubscriberRange' state={{ data: subsRange }} style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" ><AddIcon />Add Range</CommanButton>
                    </Link>
                </Heading>
                {
                    subsRange?.length === 0
                        ?
                        <Empty name='Template Not Found' />
                        :
                        <DynamicTable data={headers} >
                            {
                                activePage?.map((listCamp, index) => (
                                    <ViewCampList
                                        key={index}
                                        list={listCamp}
                                        remove={onDelete}
                                    />
                                ))
                            }
                        </DynamicTable>
                }
                {
                    subsRange?.length > perPage
                    &&
                    <div className='d-flex justify-content-center my-4'>
                        <Pagination count={Math.ceil(subsRange?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                    </div>
                }
            </div>
        );
    }


}
export default ViewSubsRange;


const ViewCampList = ({ list, remove }) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);


    useEffect(() => {
        setData(list);
        // console.log(list)
    }, [list]);

    const token = localStorage.getItem("Bearer");



    return (
        <TableRow key={data.key} >
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }} >
                {data.rangeName}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.startsAt}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data.endsAt}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: 'green', fontWeight: '600' }}>
                {data.countryCode}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link to='/operatorConfig/viewDetailSubsRange' state={{ data: data }} >
                    <VisibilityOutlinedIcon style={{ color: 'black' }} />
                </Link>
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link to={'/operatorConfig/modifySubscriberRange'} state={{ data: data }} >
                    <EditNoteSharpIcon style={{ color: 'black' }} />
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
                    <Modal.Body>Are you sure, you want to delete this {data.rangeName} ?</Modal.Body>
                    <Modal.Footer>
                        <CommanButton className='btn btn-danger' onClick={() => { remove(data.rangeId); setModal(false) }}>
                            Delete
                        </CommanButton>
                    </Modal.Footer>
                </Modal>
            </TableCell>
        </TableRow>
    );
}