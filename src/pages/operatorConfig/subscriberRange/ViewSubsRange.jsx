import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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


function ViewSubsRange() {
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)
    const [subsRange, setSubsRange] = useState([]);
    const [loading, setLoading] = useState(true);


    // const subsRange = [
    //     {
    //         "RangeName": "Inventory",
    //         "StartRange": "0000000000",
    //         "EndRange": "2999999999",
    //         "CountryCode": "220",
    //         "RangeOwner": "O"
    //     },
    //     {
    //         "RangeName": "January",
    //         "StartRange": "0000000000",
    //         "EndRange": "1999999999",
    //         "CountryCode": "221",
    //         "RangeOwner": "O"
    //     },
    //     {
    //         "RangeName": "Temp",
    //         "StartRange": "0000000000",
    //         "EndRange": "2000999999",
    //         "CountryCode": "200",
    //         "RangeOwner": "O"
    //     },
    //     {
    //         "RangeName": "Test",
    //         "StartRange": "0000000000",
    //         "EndRange": "2000099900",
    //         "CountryCode": "220",
    //         "RangeOwner": "O"
    //     }

    // ]


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


    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-2'>
                <div className=' d-flex justify-content-between my-2 align-items-center'>
                    <h4 className='fw-bold mx-2'>View Range ✨
                    </h4>
                    <div className='mx-2'>
                        <Link to={{
                            pathname: '/operatorConfig/addSubscriberRange',
                            state: { data: subsRange },
                        }} style={{ textDecoration: 'none' }}>
                            <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Add Range</CommanButton>
                        </Link>
                    </div>
                </div>

                <div className=''>
                    <TableContainer  >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow className='bodyColor'>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Range Name</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Start Range</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>End Range</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Country Code</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>View</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Modify</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            {subsRange?.map((listCamp, index) => (
                                <ViewCampList
                                    key={index}
                                    list={listCamp}
                                    remove={onDelete}
                                />
                            ))}
                        </Table>
                    </TableContainer>
                </div>
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

    const showModal = () => {
        setModal(!modal);
    }

    const token = localStorage.getItem("Bearer");



    return (
        <TableBody className="">
            <TableRow key={data.key} >
                <TableCell component="th" align="center" scope="row" style={{ fontWeight: '600' }}>
                    {data.rangeName}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500' }}>
                    {data.startsAt}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500' }}>
                    {data.endsAt}
                </TableCell>
                <TableCell align="center" style={{ color: 'blueviolet', fontWeight: 'bolder' }}>
                    {data.countryCode}
                </TableCell>
                <TableCell align="center" >
                    <Link to='/operatorConfig/viewDetailSubsRange' state={{ data: data }} >
                        <VisibilityOutlinedIcon style={{ color: 'black' }} />
                    </Link>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500' }}>
                    <Link to={'/operatorConfig/modifySubscriberRange'} state={{ data: data }} >
                        <EditNoteSharpIcon style={{ color: 'black' }} />
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
                        <Modal.Body>Are you sure, you want to delete this {data.rangeName} ?</Modal.Body>
                        <Modal.Footer>
                            <CommanButton className='btn btn-danger' onClick={() => { remove(data.rangeId); setModal(false) }}>
                                Delete
                            </CommanButton>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
            </TableRow>
        </TableBody >
    );
}