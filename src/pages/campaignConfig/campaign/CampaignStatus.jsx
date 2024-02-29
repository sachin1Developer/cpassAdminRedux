import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "reactstrap";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/material";
import { LinearProgress } from "@mui/material";
// import { ProgressBar } from "react-bootstrap";
import ProgressBar from "@ramonak/react-progress-bar";
import CampaignSharpIcon from '@mui/icons-material/CampaignSharp';
import CommanButton from "../../../components/CommanButton";

function CampaignStatus() {

    const [campFilter, setCampFilter] = useState(false)
    // const [campStatus, setCampStatus] = useState([]);
    let progress = ""

    const campStatus = [
        {
            "name": "abs",
            "group": "grp-1",
            "total": "20000",
            "Processed": "15000",
            "PerDayLimit": "15", // if dailylimit === -1 ==> UNLIMITED elseif dailylimit !== -1 ==> dailylimit
            "LastUpdate": "Nov-20-2023",
            "TodaySent": "10",
            "Interface": "O",
            "Status": "N",
            "Progress": "",  // {(Processed/total)*100}
        },
        {
            "name": "abs",
            "group": "grp-1",
            "total": "25675",
            "Processed": "25000",
            "PerDayLimit": "25", // if dailylimit === -1 ==> UNLIMITED elseif dailylimit !== -1 ==> dailylimit
            "LastUpdate": "Nov-20-2023",
            "TodaySent": "10",
            "Interface": "O",
            "Status": "R",
            "Progress": "",  // {(Processed/total)*100}
        },
        {
            "name": "abs",
            "group": "grp-1",
            "total": "25675",
            "Processed": "25675",
            "PerDayLimit": "25", // if dailylimit === -1 ==> UNLIMITED elseif dailylimit !== -1 ==> dailylimit
            "LastUpdate": "Nov-20-2023",
            "TodaySent": "10",
            "Interface": "S",
            "Status": "E",
            "Progress": "",  // {(Processed/total)*100}
        },
        {
            "name": "abs",
            "group": "grp-1",
            "total": "25675",
            "Processed": "25675",
            "PerDayLimit": "25", // if dailylimit === -1 ==> UNLIMITED elseif dailylimit !== -1 ==> dailylimit
            "LastUpdate": "Nov-20-2023",
            "TodaySent": "10",
            "Interface": "U",
            "Status": "C",
            "Progress": "",  // {(Processed/total)*100}
        },
        {
            "name": "abs",
            "group": "grp-1",
            "total": "25675",
            "Processed": "25675",
            "PerDayLimit": "55", // if dailylimit === -1 ==> UNLIMITED elseif dailylimit !== -1 ==> dailylimit
            "LastUpdate": "Nov-20-2023",
            "TodaySent": "10",
            "Interface": "U",
            "Status": "P",
            "Progress": "",  // {(Processed/total)*100}
        },
        {
            "name": "abs",
            "group": "grp-1",
            "total": "25675",
            "Processed": "25675",
            "PerDayLimit": "35", // if dailylimit === -1 ==> UNLIMITED elseif dailylimit !== -1 ==> dailylimit
            "LastUpdate": "Nov-20-2023",
            "TodaySent": "10",
            "Interface": "U",
            "Status": "A",
            "Progress": "",  // {(Processed/total)*100}
        },
        {
            "name": "abs",
            "group": "grp-1",
            "total": "25675",
            "Processed": "25675",
            "PerDayLimit": "25", // if dailylimit === -1 ==> UNLIMITED elseif dailylimit !== -1 ==> dailylimit
            "LastUpdate": "Nov-20-2023",
            "TodaySent": "10",
            "Interface": "U",
            "Status": "T",
            "Progress": "",  // {(Processed/total)*100}
        }
    ]


    return (
        // progress = Math.round((statusCamp.Processed / statusCamp.total) * 100)
        < div className='d-flex' >
            <div className='container '>
                <div className="">
                    {/* <Link style={{ textDecoration: 'none', color: 'black' }}>
                        <h5>
                            Campaign Filter
                        </h5>
                    </Link> */}
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

                    <b>
                        <h3 className='pvmHeading text-slate-800'>View Campaign Status ✨ </h3>
                    </b>
                </div>

                <TableContainer style={{ backgroundColor: '' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bodyColor'>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Name</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Group</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Total</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Processed</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Per Day Limit</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Last Update</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}> Today Sent</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}> Interface</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Status</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Progress</TableCell>

                            </TableRow>
                        </TableHead>
                        {campStatus.map((statusCamp, index) => (
                            <TableRow>
                                <TableCell align="center">{statusCamp.name}</TableCell>
                                <TableCell align="center">{statusCamp.group}</TableCell>
                                <TableCell align="center">{statusCamp.total}</TableCell>
                                <TableCell align="center">{statusCamp.Processed}</TableCell>
                                <TableCell align="center">{statusCamp.PerDayLimit}</TableCell>
                                <TableCell align="center">{statusCamp.LastUpdate}</TableCell>
                                <TableCell align="center">{statusCamp.TodaySent}</TableCell>
                                <TableCell align="center">
                                    {statusCamp.Interface === 'S' && "SMS" || statusCamp.Interface === 'U' && "USSD" || statusCamp.Interface === 'T' && "Twiter" || statusCamp.Interface === 'F' && "Fecebook" || statusCamp.Interface === 'O' && "OBD" || statusCamp.Interface}
                                </TableCell>
                                <TableCell align="center">{statusCamp.Status === 'N' && "New" || statusCamp.Status === 'E' && "Reject" || statusCamp.Status === 'R' && "Running" || statusCamp.Status === 'C' && "Completed" || statusCamp.Status === 'A' && "Active" || statusCamp.Status === 'P' && "Pending" || statusCamp.Status === 'T' && "Tested"}</TableCell>
                                <TableCell align="center">
                                    {/* <Box sx={{ width: '100%' }}> */}
                                    {

                                    }
                                    <ProgressBar completed={Math.round((statusCamp.Processed / statusCamp.total) * 100)} bgColor="#6366f1" height="" labelSize="10px" />
                                    {/* <ProgressBar completed={progress} bgColor="#6366f1" height="" labelSize="10px" /> */}
                                    {/* </Box> */}

                                </TableCell>
                            </TableRow>



                            // <ViewCampList
                            //     key={statusCamp.index}
                            //     list={listCamp}
                            //     remove={onDelete}
                            // />
                        ))}
                    </Table>
                </TableContainer>
            </div>
        </div >
    );
}


export default CampaignStatus;