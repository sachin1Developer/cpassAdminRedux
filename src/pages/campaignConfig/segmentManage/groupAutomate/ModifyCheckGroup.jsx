import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Input, Row, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Modal } from 'react-bootstrap';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";






function ModifyCheckGroup() {

    // const [listData, setListData] = useState([]);


    const listData = [
        {
            "groupId": 1,
            "groupName": "admin",
            "groupType": "MOBILE",
            "startTime": "08:00",
            "endTime": "12:00",
            "status": "Active",
            "action": "Active",
            "fileName": "file.txt",
            "networkType": "GSM",
            "createDate": "2020-02-12"
        },
        {
            "groupId": 2,
            "groupName": "test",
            "groupType": "MOBILE",
            "startTime": "08:00",
            "endTime": "12:00",
            "status": "Active",
            "action": "Active",
            "fileName": "file.txt",
            "networkType": "GSM",
            "createDate": "2020-02-12"
        },
        {
            "groupId": 3,
            "groupName": "pankaj",
            "groupType": "MOBILE",
            "startTime": "08:00",
            "endTime": "12:00",
            "status": "Active",
            "action": "Active",
            "fileName": "file.txt",
            "networkType": "GSM",
            "createDate": "2020-02-12"
        },
    ]

    return (
        <Container>
            {/* <div className=" mx-4">
                    <b>
                        <h3 className='pvmHeading text-slate-800'>Modify/Check Group✨ </h3>
                    </b>
                </div> */}
            <div className='d-flex'>
                <TableContainer style={{ backgroundColor: '' }} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bodyColor'>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Group ID</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Group Name</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Group Type</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Start Time</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>End Time</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Status</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Action</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>View</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Modify</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        {listData.map((list, index) => (
                            <CheckGroupList
                                key={index}
                                list={list}
                            // remove={onDelete}
                            />
                        ))}
                    </Table>
                </TableContainer>
            </div>
        </Container>
    );
}

export default ModifyCheckGroup;

const CheckGroupList = ({ list, remove }) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState({});
    const status = data.STATUS;


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
                <TableCell component="th" align="center" scope="row" style={{ fontSize: '12px' }}>
                    {data.groupId}
                </TableCell>
                <TableCell align="center" style={{ fontSize: '12px' }}>
                    {data.groupName}
                </TableCell>
                <TableCell align="center" style={{ fontSize: '12px' }}>
                    {data.groupType}
                </TableCell>
                <TableCell align="center" style={{ fontSize: '12px' }}>
                    {data.startTime}
                </TableCell>
                <TableCell align="center" style={{ fontSize: '12px' }}>
                    {data.endTime}
                </TableCell>
                <TableCell align="center" style={{ fontSize: '12px' }}>
                    {data.status}
                </TableCell>
                <TableCell align="center" style={{ fontSize: '12px' }}>
                    {data.action}
                </TableCell>
                <TableCell align="center" >
                    <Link style={{ color: 'rgb(100,116,139)' }} to={{
                        pathname: '/segment/viewDetailsSegmenet',
                        state: { data: data },
                    }}>
                        <VisibilityOutlinedIcon />
                    </Link>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px', height: '4em' }}>
                    <Link style={{ color: 'rgb(100,116,139)' }} to={{
                        pathname: '',
                        state: { data: data.groupId },
                    }}>
                        <EditNoteSharpIcon />
                    </Link>
                </TableCell>
                <TableCell align="center">
                    <button className="border-0" onClick={showModal}>
                        <DeleteForeverIcon style={{ color: 'red' }} />
                    </button>

                    <Modal show={modal} onHide={showModal}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-danger'>Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure, you want to delete this {data.segmentName} ?</Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-danger' onClick={() => remove(data.groupId)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
                {/* <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                    <Input type="checkbox" style={{ borderColor: 'black' }} />
                </TableCell> */}
            </TableRow>
        </TableBody>
    );
}