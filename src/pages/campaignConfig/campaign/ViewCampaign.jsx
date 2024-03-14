import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Modal } from 'react-bootstrap';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CommanButton from "../../../components/CommanButton";
import { deleteCampaignById, getCampaignByDistinct } from "./slice/Campaign";
import Heading from "../../../components/header/Heading";
import Empty from "../../../components/empty/Empty";
import Loader from "../../../components/loader/Loader";
import BackDropLoader from "../../../components/loader/BackDropLoader";
import DynamicTable from "../../../components/table/DynamicTable";


function ViewCampaign() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)

    const [campFilter, setCampFilter] = useState(false)
    const [campList, setCampList] = useState([])
    const [loading, setloading] = useState(true)
    const [backdrop, setbackdrop] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;

    const getCampaignList = () => {
        setloading(true)
        dispatch(getCampaignByDistinct(token))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setCampList(resp?.payload?.data);
                } else {
                    toast.error("Internal server error")
                }
                setloading(false)
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching list');
                setloading(false)
            });
    }

    useEffect(() => {
        getCampaignList();
    }, [])

    const onDelete = (id) => {
        setbackdrop(true)
        dispatch(deleteCampaignById({ id: id, token: token }))
            .then((res) => {
                if (res?.payload?.status === 200) {
                    toast.success("Deleted Successfully");
                    getCampaignList();
                } else {
                    toast.error('Error While Deleting');
                }
                setbackdrop(false)
            })
            .catch((error) => {
                console.error(error);
                setbackdrop(false)
                toast.error('Error While Deleting');
            });
    }

    const headers = ['Campaign Id', 'Campaign Name', 'Campaign Status', 'View', 'Delete ']

    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = campList?.slice(indexofFirst, indexofLast)

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className="mx-3">
                {/* <b>
                            <h5 className='campFilter '> Campaign Filter
                                <div className=''>
                                    <CommanButton style={{ border: 'none', textDecoration: 'none', backgroundColor: 'transparent', }} onClick={() => { setCampFilter(!campFilter) }}>
                                        {campFilter ?
                                            <div className="btnBack mb-3" ><IndeterminateCheckBoxIcon /></div>
                                            :
                                            <div className="btnBack mb-3" ><AddBoxIcon /></div>
                                        }
                                    </CommanButton>
                                </div>
                            </h5>
                        </b>
                        {
                            campFilter &&
    
                            <div className="d-flex justify-content-end mx-2 " style={{ fontSize: '13px' }}>
                                New | Running | Approve | Paused | Completed | Reject | All | Date Wise
                            </div>
                        } */}


                <Heading name='View Campaign' >
                    {/* <Link to="/campaign/createCampaign" style={{ textDecoration: 'none' }}>
                                    <CommanButton type="submit" className="btnBack mb-3" ><AddIcon />Create Campaign</CommanButton>
                                </Link> */}
                </Heading>
                {
                    campList?.length === 0
                        ?
                        <Empty name='Template Not Found' />
                        :
                        <DynamicTable data={headers} >
                            {
                                activePage?.map((each, index) => {
                                   return <ViewCampList key={index} list={each} remove={onDelete} />
                                })
                            }
                        </DynamicTable>
                }
                {
                    campList?.length > perPage
                    &&
                    <div className='d-flex justify-content-center my-4'>
                        <Pagination count={Math.ceil(campList?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                    </div>
                }
                <BackDropLoader opener={backdrop} />
            </div>
        );
    }

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

    const campStatus = () => {
        let statusCamp = '';
        let color = '';

        if (data.STATUS === 'N') {
            statusCamp = "NEW";
            color = 'orange';
        } else if (data.STATUS === 'R') {
            statusCamp = "RUNNING";
            color = 'green';
        } else if (data.STATUS === 'A') {
            statusCamp = "ACTIVE";
            color = '#6366f1';
        } else {
            statusCamp = "PENDING";
            color = 'red';
        }

        return { statusCamp, color };
    };

    const { statusCamp, color } = campStatus();

    return (
        <TableRow >
            <TableCell className="border border-2 fw-bolder" align="center" style={{ color: '#6366f1' }}>
                {data.CAMPAIGN_ID}
            </TableCell>
            <TableCell className="border border-2" align="center">
                {data.CAMPAIGN_NAME}
            </TableCell>
            <TableCell className="border border-2 fw-bolder" align="center" style={{ color: color }}>
                {/* <Link style={{ color: 'blueviolet', textDecoration: 'none', fontWeight: 'bolder' }}> */}
                {statusCamp}
                {/* {data.status} */}
                {/* </Link> */}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link to='/camapign/viewCampDetails' state={{ data: data }}>
                    <VisibilityOutlinedIcon style={{ color: 'black' }} />
                </Link>
            </TableCell>
            {/* <TableCell className="border border-2" align="center" >
                <Link to='/campaign/modifyCampaign' state={{ data: data.CAMPAIGN_ID }}>
                    <EditNoteSharpIcon style={{color:'black'}} />
                </Link>
            </TableCell> */}
            <TableCell className="border border-2" align="center" >
                <button className="border-0" onClick={showModal} style={{ background: 'transparent' }}>
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
            {/* <TableCell className="border border-2" align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>
                    <Input type="checkbox" style={{ borderColor: 'black' }} />
                </TableCell> */}
        </TableRow>
    );
}