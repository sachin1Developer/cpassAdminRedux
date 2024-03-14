import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlacklistManagerGroup, searchSpecificMsisdninBlacklist } from './slice/BlacklistManagement';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';



const mdnId = "mdnId"
function SearchBlacklist() {
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)
    const [msisdn, setMsisdn] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [isActive, setIsActive] = useState(false)

    const handleSearchedMsisdn = (e) => {
        let maxLength = 5;
        if (e.target.value.length >= maxLength) {
            setMsisdn(e.target.value);
        }
        else if (e.target.value.length === maxLength) {
            setMsisdn(e.target.value);
        }
        else {
            toast.error("Please Enter Msisdn atleast 5 length", {
                toastId: mdnId
            })
        }
    }


    const searchMsisdn = (msisdn) => {
        console.log(msisdn)
        dispatch(searchSpecificMsisdninBlacklist({ token: token, id: msisdn }))
            .then((res) => {
                console.log(res)
                if (res?.payload?.status === 200) {
                    setSearchData(res?.payload?.data);
                }
                else {
                    toast.error("Error to fetch MSISDN")
                }

            })
            .catch((error) => {
                console.error(error.response.data);
                toast.info("This number is not in Blacklist range");
            });
    }


    const onDelete = (rangeId) => {
        dispatch(deleteBlacklistManagerGroup({ token: token, id: rangeId }))
            .then((res) => {
                // console.log(res)
                if (res?.payload?.status === 200) {
                    toast.success('Deleted successfully');
                } else {
                    toast.error('Error while delete');
                }
            });
    }


    return (
        <div className='mx-3'>
            <div>
                <Heading name='Search Blacklist'>
                    <Link to='/operatorConfig/blacklistManagemment/addBlacklist'>
                        <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </Heading>
                <div className='d-flex container justify-content-center align-items-center '>
                    <div className='d-flex flex-column'>
                        <TextField id="outlined-basic" type='number' label="Search MSISDN" variant="outlined" autoFocus='true' onChange={handleSearchedMsisdn} />
                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Enter MSISDN with country code</label>
                    </div>
                    <div className='d-flex justify-content-center mx-4'>
                        <CommanButton className='btnSend' onClick={() => { searchMsisdn(msisdn); setIsActive(true) }} >Submit</CommanButton>
                    </div>
                </div>
            </div>


            {searchData != "" &&

                < div >
                    {isActive &&
                        <div className='my-4' id='search'>
                            <TableContainer style={{ backgroundColor: '', width: '900px' }} >
                                <Table sx={{}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow className='bodyColor'>
                                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Serial No.</TableCell>
                                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Range Id</TableCell>
                                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Msisdn</TableCell>
                                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Created At</TableCell>
                                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {searchData.map((searchList, index) => (
                                        < SearchListData
                                            key={index}
                                            index={index}
                                            list={searchList}
                                            remove={onDelete}
                                        />
                                    ))}
                                </Table>
                            </TableContainer>
                        </div>
                    }
                </div>

            }
        </div >
    );


}



const SearchListData = ({ index, list, remove }) => {
    const [data, setData] = useState({});
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setData(list);
        // console.log(list)
    }, [list]);


    const token = localStorage.getItem("Bearer");


    return (
        <TableBody className="">
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" style={{ fontWeight: '600', fontSize: '12px', height: '4em', padding: '0' }}>
                    {index + 1}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '600', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data.RANGE_ID}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data.MSISDN}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data.CREATE_DATE?.slice(0, 10)}
                </TableCell>
                <TableCell align="center">
                    <button className="border-0" onClick={() => { setModal(!modal) }}>
                        <DeleteForeverIcon style={{ color: 'red' }} />
                    </button>
                    <Modal show={modal} onHide={() => { setModal(!modal) }}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-danger'>Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure, you want to delete this {data.RANGE_NAME} ?</Modal.Body>
                        <Modal.Footer>
                            <CommanButton className='btn btn-danger' onClick={() => { remove(data.RANGE_ID); setModal(false) }}>
                                Delete
                            </CommanButton>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}



export default SearchBlacklist;