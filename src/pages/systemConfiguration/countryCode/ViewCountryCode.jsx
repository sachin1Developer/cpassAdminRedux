import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from 'react-router-dom';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSystemCountryCode, getSystemCountryCode } from './slice/CountryCode';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';
import Empty from '../../../components/empty/Empty';
import Loader from '../../../components/loader/Loader';




function ViewCountryCode() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)
    const [countryList, setCountryList] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;
    const [loading, setLoading] = useState(true)
    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = countryList.slice(indexofFirst, indexofLast);


    const getCountryList = () => {
        setLoading(true)
        dispatch(getSystemCountryCode(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setCountryList(resp?.payload?.data?.body);
                } else {
                    toast.error('Internal server error')
                }
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
                setLoading(false)
                toast.error('Error While List');
            });
    }

    const onDelete = (id) => {
        dispatch(deleteSystemCountryCode({ token: token, id: id }))
            .then((res) => {
                if (res?.payload?.status === 200) {
                    toast.success('Deleted successfully');
                    getCountryList();
                } else {
                    toast.error('Error while delete');
                }
            });
    };

    useEffect(() => {
        getCountryList();
    }, [])


    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3' >
                <Heading name='View Country Code'>
                    <Link to="/systemConfiguration/addCountryCodeManagement"
                        state={{ data: countryList }}
                        style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Country </CommanButton>
                    </Link>
                </Heading>
                {
                    countryList?.length === 0
                        ?
                        <Empty name='Data Not Found' />
                        :
                        <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded" >
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                                    <TableRow className='bodyColor' >
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" > ID</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Country Name</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Country Code</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Create Time</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Site Id</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Modify</TableCell>
                                        <TableCell align="center" className="border border-2 fw-bolder fs-6" >Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        activePage?.map((countryList, index) => (
                                            <ViewCountryList
                                                key={index}
                                                list={countryList}
                                                remove={onDelete}
                                            />
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
                {
                    countryList?.length > perPage
                    &&
                    <div className='d-flex justify-content-center my-4'>
                        <Pagination count={Math.ceil(countryList?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                    </div>
                }
            </div>
        );
    }

}
export default ViewCountryCode;


const ViewCountryList = ({ list, remove }) => {
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
            <TableCell className="border border-2" align="center" style={{ color: 'black', fontWeight: '600' }} >
                {data?.id}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }} >
                {data?.country_name}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: 'green', fontWeight: '600' }}>
                {data?.country_code}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data?.create_time}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data?.site_id}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'black' }} to='/systemConfiguration/modifyCountryCode'
                    state={{ data: data }}>
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
                    <Modal.Body>Are you sure, you want to delete this {data.country_name} ?</Modal.Body>
                    <Modal.Footer>
                        <Button className='btn btn-danger' onClick={() => { remove(data.id); setModal(false) }}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </TableCell>
        </TableRow>
    );
}