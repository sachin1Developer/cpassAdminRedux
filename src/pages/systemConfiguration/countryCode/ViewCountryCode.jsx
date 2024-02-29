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
        dispatch(getSystemCountryCode(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setCountryList(resp?.payload?.data?.body);
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
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

    return (
        <div className='mx-3' >
            <div className=' d-flex justify-content-between my-2 align-items-center'>
                <h4 className='fw-bold mx-2'>View Country Code ✨</h4>
                <div className='mx-2'>
                    <Link to="/systemConfiguration/addCountryCodeManagement"
                        state={{ data: countryList }}
                        style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Country </CommanButton>
                    </Link>
                </div>
            </div>

            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className='bodyColor' >
                            <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10 }}> ID</TableCell>
                            <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10 }}>Contry Name</TableCell>
                            <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10 }}>Country Code</TableCell>
                            <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10 }}>Create Time</TableCell>
                            <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10 }}>Site Id</TableCell>
                            <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10 }}>Modify</TableCell>
                            <TableCell align="center" style={{ fontSize: '12px', fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7', padding: 10 }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    {activePage.map((countryList, index) => (
                        <ViewCountryList
                            key={index}
                            list={countryList}
                            remove={onDelete}
                        />
                    ))}
                </Table>
            </TableContainer>
            <div className='d-flex justify-content-center my-4'>
                <Pagination count={Math.ceil(countryList.length / 10)} color="primary" onChange={(e, p) => setCurrentPage(p)} />
            </div>
        </div>
    );


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
        <TableBody className="">
            <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0, fontSize: '12px', padding: 1 } }}>
                <TableCell component="th" align="center" scope="row">
                    {data?.id}
                </TableCell>
                <TableCell align="center" >
                    {data?.country_name}
                </TableCell>
                <TableCell align="center">
                    {data?.country_code}
                </TableCell>
                <TableCell align="center" >
                    {data?.create_time}
                </TableCell>
                <TableCell align="center" >
                    {data?.site_id}
                </TableCell>
                <TableCell align="center" >
                    <Link style={{ color: 'rgb(100,116,139)' }} to='/systemConfiguration/modifyCountryCode'
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
                        <Modal.Body>Are you sure, you want to delete this {data.country_name} ?</Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-danger' onClick={() => { remove(data.id); setModal(false) }}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}