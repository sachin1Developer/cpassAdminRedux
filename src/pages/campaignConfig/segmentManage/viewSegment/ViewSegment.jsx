import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Modal } from 'react-bootstrap';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';







function ViewSegment() {

    // const [segmentList, setSegmentList] = useState([]);

    const segmentList = [
        {
            "segmentId": "1",
            "segmentName": "Test",
            "totalGroup": "4",
            "inSchedule": "No"
        },
        {
            "segmentId": "2",
            "segmentName": "CWC_BASE",
            "totalGroup": "9",
            "inSchedule": "No"
        },
    ]

    return (
        <div className='d-flex mb-4'>
            <div className='container-fluid my-2'>
                <div className="mx-4">
                    <b>
                        <h3 className='pvmHeading text-slate-800'>View Segment ✨
                            <div className='my-2'>
                                <Link to="/segment/createSegment" style={{ textDecoration: 'none' }}>
                                    <Button type="submit" className="btnBack mb-3" ><AddIcon />Create Segment</Button>
                                </Link> &nbsp;
                            </div>
                        </h3>
                    </b>
                    <TableContainer style={{ backgroundColor: '' }} >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className='bodyColor'>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Segment Name</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Total Group</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>In Schedule</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>View</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Modify</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            {segmentList.map((list, index) => (
                                <ViewSegmentList
                                    key={index}
                                    list={list}
                                // remove={onDelete}
                                />
                            ))}
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default ViewSegment;




const ViewSegmentList = ({ list, remove }) => {
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
    const campStatus = () => {
        let statusCamp = ''
        if (status === 'N') {
            statusCamp = "NEW"
        }
        else if (status === 'R') {
            statusCamp = "RUNNING"
        }
        else if (status === 'A') {
            statusCamp = "ACTIVE"
        }
        else {
            statusCamp = "PENDING"
        }
        return statusCamp;
    }


    return (
        <TableBody className="">
            {
                token === null && <Redirect to='/' />
            }
            <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" align="center" scope="row" style={{ fontWeight: '600', fontSize: '15px', height: '4em' }}>
                    {data.segmentName}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px', height: '4em' }}>
                    {data.totalGroup}
                </TableCell>
                <TableCell align="center" style={{ color: 'blueviolet', fontWeight: 'bolder', fontSize: '15px', height: '4em' }}>
                    {data.inSchedule}
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
                        state: { data: data.CAMPAIGN_ID },
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
                            <Button className='btn btn-danger' onClick={() => remove(data.segmentId)}>
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