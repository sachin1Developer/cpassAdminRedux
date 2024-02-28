import React, { useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import { useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { Modal } from 'react-bootstrap';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";





function MediaGroup() {


    // const [mediaGroupList, setMediaGroupList] = useState([]);

    const mediaGroupList = [
        {
            "groupId": "1784",
            "groupName": "TestGroup1",
            "totalMasisdn": "2",
            "status": "A",
            "createdDate": "2020-12-31",
            "inUsed": "No",
        },
        {
            "groupId": "1785",
            "groupName": "TestGroup2",
            "totalMasisdn": "2",
            "status": "A",
            "createdDate": "2020-12-31",
            "inUsed": "No",
        },
        {
            "groupId": "1786",
            "groupName": "TestGroup3",
            "totalMasisdn": "2",
            "status": "A",
            "createdDate": "2020-12-31",
            "inUsed": "No",
        },
    ]


    return (
        <Container>
            <div className=''>
                <b>
                    <h3 className='pvmHeading text-slate-800'>View Media Group ✨
                        <div className='d-flex align-items-center '>
                            <Link to='/groupManagement/groupManager/addMediaGroup' style={{ textDecoration: 'none' }}>
                                <Button type="submit" className="btnBack mb-3 d-flex align-items-center"  ><AddIcon />Add Media Group</Button>
                            </Link>
                        </div>
                    </h3>
                </b>
            </div>

            <div>
                <TableContainer style={{ backgroundColor: '', width: '900px' }} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow className='bodyColor'>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Group ID</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Group Name</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Total MSISDN</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Status</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Create Date</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>In Used</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Download</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}>Delete Group</TableCell>
                            </TableRow>
                        </TableHead>
                        {mediaGroupList.map((mediaList, index) => (
                            <ViewMediaGroupList
                                key={index}
                                list={mediaList}
                            // deleteRange={deleteRange}
                            />
                        ))}
                    </Table>
                </TableContainer>
            </div>

        </Container>
    );
}


export default MediaGroup;


const ViewMediaGroupList = ({ list, deleteRange }) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState({});


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
            {
                token === null && <Redirect to='/' />
            }
            <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" align="center" scope="row" style={{ fontWeight: '600', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data.groupId}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data.groupName}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data.totalMasisdn}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data.status}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data.createdDate}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data.inUsed}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    <Link style={{ color: 'black' }} to={{
                        pathname: '',
                        state: { data: data },
                    }}>
                        <FileDownloadSharpIcon />
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
                        <Modal.Body>Are you sure, you want to delete this {data.groupName} ?</Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-danger' onClick={() => { deleteRange(data.groupId); setModal(false) }}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}