import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CommanButton from "../../../components/CommanButton";
import { useDispatch, useSelector } from "react-redux";
import { getLbsTemplates } from "./slice/Templates";

function ViewTemplate() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)
    const [data, setData] = useState()

    const getTemplates = () => {
        dispatch(getLbsTemplates(token))
            .then((response) => {
                if (response?.payload?.status === 200) {
                    setData(response?.payload?.data)
                }
            }).catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        getTemplates()
    }, [])


    return (
        <div className="mx-3">
            <div className=' d-flex justify-content-between my-2 align-items-center'>
                <h4 className='fw-bold mx-2'>View Template ✨</h4>
                {/* <div className='d-flex align-items-center'>
                    <Link to="/templates/addTemplates" style={{ textDecoration: 'none' }}>
                        <CommanButton type="submit" className="btnBack mb-3" ><AddIcon /> Add Template </CommanButton>
                    </Link>
                </div> */}
            </div>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                        <TableRow className='bodyColor'>
                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}> Id</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}> Name</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Description</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Message</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Language Id</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}>Created By</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)' }}> Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            data?.map((each) => {
                                return <ViewTemplateList data={each} />
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ViewTemplate;




const ViewTemplateList = ({ data }) => {
    return (
        <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" align="center" scope="row" style={{ color: 'rgb(40,165,233)', fontWeight: '600', fontSize: '15px', height: '4em' }}>
                {data?.templateid}
            </TableCell>
            <TableCell align="left" style={{ color: 'rgb(100,116,139)', fontWeight: '500', fontSize: '15px', height: '4em' }}>
                {data?.templatename}
            </TableCell>
            <TableCell component="th" align="center" scope="row" style={{ color: 'rgb(40,165,233)', fontWeight: '600', fontSize: '15px', height: '4em' }}>
                {data?.templatedescription}
            </TableCell>
            <TableCell align="left" style={{ color: 'rgb(100,116,139)', fontWeight: '500', fontSize: '15px', height: '4em' }}>
                {data?.templatemessage}
            </TableCell>
            <TableCell component="th" align="center" scope="row" style={{ color: 'rgb(40,165,233)', fontWeight: '600', fontSize: '15px', height: '4em' }}>
                {data?.languageid}
            </TableCell>
            <TableCell align="left" style={{ color: 'rgb(100,116,139)', fontWeight: '500', fontSize: '15px', height: '4em' }}>
                {data?.createdby}
            </TableCell>
            <TableCell align="left" style={{ color: 'rgb(100,116,139)', fontWeight: '500', fontSize: '15px', height: '4em' }}>
                {data?.templatetype}
            </TableCell>
        </TableRow>
    );
}