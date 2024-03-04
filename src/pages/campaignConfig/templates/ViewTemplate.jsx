import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CommanButton from "../../../components/CommanButton";
import { useDispatch, useSelector } from "react-redux";
import { getLbsTemplates } from "./slice/Templates";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import Heading from "../../../components/header/Heading";
import Empty from "../../../components/empty/Empty";

function ViewTemplate() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)
    const [data, setData] = useState()
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;

    const getTemplates = () => {
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

    useEffect(() => {
        getTemplates()
    }, [])

    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = data?.slice(indexofFirst, indexofLast)

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className="mx-3">
                <Heading name='View Template' >
                    {/* <Link to="/templates/addTemplates" style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack " ><AddIcon /> Add Template </CommanButton>
                    </Link> */}
                </Heading>
                {
                    data?.length === 0
                        ?
                        <Empty name='Template Not Found' />
                        :
                        <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded" >
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                                    <TableRow>
                                        <TableCell className="border border-2 fw-bolder fs-6" align="center" > Id</TableCell>
                                        <TableCell className="border border-2 fw-bolder fs-6" align="center" > Name</TableCell>
                                        <TableCell className="border border-2 fw-bolder fs-6" align="center" >Description</TableCell>
                                        <TableCell className="border border-2 fw-bolder fs-6" align="center" >Message</TableCell>
                                        <TableCell className="border border-2 fw-bolder fs-6" align="center" >Language Id</TableCell>
                                        <TableCell className="border border-2 fw-bolder fs-6" align="center" >Created By</TableCell>
                                        <TableCell className="border border-2 fw-bolder fs-6" align="center" > Type</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {
                                        activePage?.map((each, index) => {
                                            return <ViewTemplateList data={each} key={index} />
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
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




const ViewTemplateList = ({ data }) => {
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
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }}>
                {data?.languageid}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data?.createdby}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                {data?.templatetype}
            </TableCell>
        </TableRow>
    );
}