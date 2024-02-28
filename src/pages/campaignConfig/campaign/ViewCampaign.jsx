import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Input } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import callApi from "../../../serviceApi/CallApi";
import { Modal } from 'react-bootstrap';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from "react-toastify";


function ViewCampaign() {

    const [campFilter, setCampFilter] = useState(false)

    const [campList, setCampList] = useState([])

    const getCampaignList = () => {
        callApi.getCampaignByDistinct()
            .then((resp) => {
                setCampList(resp.data);
                console.log(resp.data)
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching Campaign list');
            });
    }




    useEffect(() => {
        getCampaignList();
    }, [])


    const onDelete = (id) => {
        callApi.deleteCampaign(id)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Deleted Successfully");
                    getCampaignList();
                } else {
                    toast.error('Error While Deleting');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error While Deleting');
            });
    }

    const token = localStorage.getItem("Bearer");

    return (
        <div className='d-flex'>
            {token === null && <Redirect to='/' />}
            <div className='container my-2'>
                <div className="mx-4">
                    <b>
                        <h5 className='campFilter '> Campaign Filter
                            <div className=''>
                                <Button style={{ border: 'none', textDecoration: 'none', backgroundColor: 'transparent', }} onClick={() => { setCampFilter(!campFilter) }}>
                                    {campFilter ?
                                        <div className="btnBack mb-3" ><IndeterminateCheckBoxIcon /></div>
                                        :
                                        <div className="btnBack mb-3" ><AddBoxIcon /></div>
                                    }
                                </Button>
                            </div>
                        </h5>
                    </b>
                    {
                        campFilter &&

                        <div className="d-flex justify-content-end mx-2 " style={{ fontSize: '13px' }}>
                            New | Running | Approve | Paused | Completed | Reject | All | Date Wise
                        </div>
                    }

                    <b>
                        <h3 className='pvmHeading text-slate-800'>View Campaign ✨
                            <div className='my-2'>
                                {/* <Link to="/createCampaign/pvm/addPVM" style={{ textDecoration: 'none' }}>
                                    <Button type="submit" className="btnBack mb-3" ><AddIcon />Create Dynamic Campaign</Button>
                                </Link> &nbsp; */}
                                <Link to="/campaign/createCampaign" style={{ textDecoration: 'none' }}>
                                    <Button type="submit" className="btnBack mb-3" ><AddIcon />Create Campaign</Button>
                                </Link>
                            </div>
                        </h3>
                    </b>

                    <TableContainer style={{ backgroundColor: '' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className='bodyColor'>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Campaign Id</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Campaign Name</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Campaign Status</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>View</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Modify</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Delete</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>
                                        <Input type="checkbox" style={{ borderColor: 'black' }} />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {campList.map((listCamp) => (
                                <ViewCampList
                                    key={listCamp.CAMPAIGN_ID}
                                    list={listCamp}
                                    remove={onDelete}
                                />
                            ))}
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );

}

export default ViewCampaign;


const ViewCampList = ({ list, remove }) => {
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
                <TableCell component="th" align="center" scope="row" style={{ color: 'rgb(40,165,233)', fontWeight: '600', fontSize: '15px', height: '4em' }}>
                    {data.CAMPAIGN_ID}
                </TableCell>
                <TableCell align="left" style={{ color: 'rgb(100,116,139)', fontWeight: '500', fontSize: '15px', height: '4em' }}>
                    {data.CAMPAIGN_NAME}
                </TableCell>
                <TableCell align="center" style={{ color: 'blueviolet', fontWeight: 'bolder', fontSize: '15px', height: '4em' }}>
                    {/* <Link style={{ color: 'blueviolet', textDecoration: 'none', fontWeight: 'bolder' }}> */}
                    {campStatus()}
                    {/* {data.status} */}
                    {/* </Link> */}
                </TableCell>
                <TableCell align="center" >
                    <Link style={{ color: 'rgb(100,116,139)' }} to={{
                        pathname: '/camapign/viewCampDetails',
                        state: { data: data },
                    }}>
                        <VisibilityOutlinedIcon />
                    </Link>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px', height: '4em' }}>
                    <Link style={{ color: 'rgb(100,116,139)' }} to={{
                        pathname: '/campaign/modifyCampaign',
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
                        <Modal.Body>Are you sure, you want to delete this {data.campaign_name} ?</Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-danger' onClick={() => remove(data.CAMPAIGN_ID)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                    <Input type="checkbox" style={{ borderColor: 'black' }} />
                </TableCell>
            </TableRow>
        </TableBody>
    );
}