import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CommanButton from "../../../components/CommanButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteLbsTemplate, getLbsTemplates } from "./slice/Templates";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import Heading from "../../../components/header/Heading";
import Empty from "../../../components/empty/Empty";
import DynamicTable from "../../../components/table/DynamicTable";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from "react-bootstrap";

function ViewTemplate() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)
    const [data, setData] = useState()
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;

    const getTemplates = () => {
        setCurrentPage(1)
        setloading(true)
        dispatch(getLbsTemplates(token))
            .then((response) => {
                if (response?.payload?.status === 200) {
                    setData(response?.payload?.data)
                } else {
                    toast.error('Internal server error')
                }
                setloading(false)
            }).catch((err) => {
                setloading(false)
                toast.error('Error while fetching list')
                console.error(err)
            })
    }

    const onDelete = (id) => {
        dispatch(deleteLbsTemplate({ token: token, id: id }))
            .then((response) => {
                if (response?.payload?.data?.httpStatusCode === 200) {
                    toast.success('Template Delete Successfully')
                    getTemplates()
                } else {
                    toast.error("Internal server error")
                }
            })
    }

    useEffect(() => {
        getTemplates()
    }, [])

    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = data?.slice(indexofFirst, indexofLast)

    // const headers = ['Id', 'Name', 'Description', 'Message', 'Language Id', 'Created By', 'Type', 'Modify', 'Delete']
    const headers = ['Id', 'Name', 'Description', 'Message', 'Modify', 'Delete']

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className="mx-3">
                <Heading name='View Template' >
                    <Link to="/templates/addTemplates" style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack " ><AddIcon /> Add Template </CommanButton>
                    </Link>
                </Heading>
                {
                    data?.length === 0
                        ?
                        <Empty name='Template Not Found' />
                        :
                        <DynamicTable data={headers}>
                            {
                                activePage?.map((each, index) => {
                                    return <ViewTemplateList data={each} key={index} remove={onDelete} />
                                })
                            }
                        </DynamicTable>
                }
                {
                    data?.length > perPage
                    &&
                    <div className='d-flex justify-content-center my-4'>
                        <Pagination count={Math.ceil(data?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                    </div>
                }
            </div>
        );
    }

}

export default ViewTemplate;




const ViewTemplateList = ({ data, remove }) => {
    const [modal, setModal] = useState(false);
    return (
        <TableRow  >
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }}>
                {data?.templateid}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data?.templatename}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }}>
                {data?.templatedescription}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data?.templatemessage}
            </TableCell>
            {/* <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }}>
                {data?.languageid}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data?.createdby}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data?.templatetype}
            </TableCell> */}
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'black' }} to={`/templates/modifyTemplates/${data?.templateid}`} >
                <EditNoteSharpIcon />
                </Link>
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <button className="border-0" style={{ background: 'transparent' }} onClick={() => { setModal(!modal) }}>
                    <DeleteForeverIcon style={{ color: 'red' }} />
                </button>
                <Modal show={modal} onHide={() => { setModal(!modal) }}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-danger'>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure, you want to delete this {data?.templatename} ?</Modal.Body>
                    <Modal.Footer>
                        <CommanButton className='btn btn-danger' onClick={() => { remove(data?.templateid); setModal(false) }}>
                            Delete
                        </CommanButton>
                    </Modal.Footer>
                </Modal>
            </TableCell>
        </TableRow>
    );
}