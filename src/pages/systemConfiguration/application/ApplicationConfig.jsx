import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, Redirect } from 'react-router-dom';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { LineWave } from 'react-loader-spinner';


function ApplicationConfig() {
    const [loading, setLoading] = useState(false);

    const appConfigList = [
        {
            "paramId": "1",
            "owner": "SYSTEM",
            "paramType": "int",
            "paramTag": "TOTAL_CALLS",
            "paramValue": "160",
            "remarks": "NUMBER OF simultaneous CALLS"
        },
        {
            "paramId": "2",
            "owner": "SYSTEM",
            "paramType": "int",
            "paramTag": "SMS_WINDOW_SIZE",
            "paramValue": "5",
            "remarks": "NUMBER OF simultaneous CALLS"
        },
        {
            "paramId": "3",
            "owner": "SYSTEM",
            "paramType": "int",
            "paramTag": "OBD_WINDOW_SIZE",
            "paramValue": "40",
            "remarks": "NUMBER OF simultaneous CALLS"
        },
        {
            "paramId": "4",
            "owner": "SYSTEM",
            "paramType": "int",
            "paramTag": "FB_WINDOW_SIZE",
            "paramValue": "100",
            "remarks": "NUMBER OF simultaneous CALLS"
        },
        {
            "paramId": "5",
            "owner": "SYSTEM",
            "paramType": "int",
            "paramTag": "TW_WINDOW_SIZE",
            "paramValue": "100",
            "remarks": "NUMBER OF simultaneous CALLS"
        },
        {
            "paramId": "6",
            "owner": "SYSTEM",
            "paramType": "int",
            "paramTag": "USSD_WINDOW_SIZE",
            "paramValue": "100",
            "remarks": "NUMBER OF simultaneous CALLS"
        },

    ]




    return (
        <div className='d-flex'>
            <Container>
                <b>
                    <h3 className='pvmHeading text-slate-800'>Application Configuration ✨</h3>
                </b>
                {loading ? (
                    <div className='d-flex justify-content-center align-items-center w-100'>
                        <LineWave
                            height="100"
                            width="100"
                            color="#6366F1"
                            ariaLabel="line-wave"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            firstLineColor=""
                            middleLineColor=""
                            lastLineColor=""
                        />
                    </div>
                ) :
                    <div className='w-75'>
                        <TableContainer style={{ backgroundColor: '' }} >
                            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow className='bodyColor'>
                                        <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Param Tag</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Param Value</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>View</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Modify</TableCell>
                                    </TableRow>
                                </TableHead>
                                {appConfigList.map((configList, index) => (
                                    <ViewAppConfig
                                        key={index}
                                        list={configList}
                                    // remove={onDelete}
                                    />
                                ))}
                            </Table>
                        </TableContainer>
                    </div>
                }
            </Container>
        </div>
    );


}
export default ApplicationConfig;


const ViewAppConfig = ({ list, remove }) => {
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
                <TableCell component="th" align="center" scope="row" style={{ fontWeight: '600', fontSize: '12px' }}>
                    {data.paramTag}
                </TableCell>
                <TableCell align="center" style={{ color: 'blueviolet', fontWeight: 'bolder', fontSize: '12px' }}>
                    {data.paramValue}
                </TableCell>
                <TableCell align="center" >
                    <Link style={{ color: 'rgb(100,116,139)' }} to={{
                        pathname: '/systemConfiguration/viewApplicationConfiguration',
                        state: { data: data },
                    }}>
                        <VisibilityOutlinedIcon />
                    </Link>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px', height: '4em' }}>
                    <Link style={{ color: 'rgb(100,116,139)' }} to={{
                        pathname: '/systemConfiguration/modifyApplicationConfiguration',
                        state: { data: data },
                    }}>
                        <EditNoteSharpIcon />
                    </Link>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}