import React, { useEffect, useState } from 'react';
import { Button, Container } from 'reactstrap';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


function ViewDetailsSegment() {
    const location = useLocation();
    console.log(location.state.data)

    const segmentList = [
        {
            "groupName": "ANT_1192",
            "groupType": "MSISDN",
            "createdDate": "2020-11-09"
        },
        {
            "groupName": "ANT_1109	",
            "groupType": "MSISDN",
            "createdDate": "2020-11-09"
        },
        {
            "groupName": "JAM_TEST_2",
            "groupType": "MSISDN",
            "createdDate": "2020-11-09"
        },

    ]

    return (
        <Container>
            <div className=''>
                <b>
                    <h3 className='pvmHeading text-slate-800'>View Details Segment ✨
                        <div className='my-2'>
                            <Link to='/segment/viewSegmenet'>
                                <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                            </Link>
                        </div>
                    </h3>
                </b>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TableContainer className='d-flex justify-content-center' style={{ backgroundColor: '' }} >
                        <Table sx={{ maxWidth: 500 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className='bodyColor'>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', backgroundColor: '#d6d6f7' }}>Group Name</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', backgroundColor: '#d6d6f7' }}>Group Type</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bolder', backgroundColor: '#d6d6f7' }}>Create Date</TableCell>
                                </TableRow>
                            </TableHead>
                            {segmentList.map((list, index) => (
                                <ViewSegmentDetailsList
                                    key={index}
                                    list={list}
                                />
                            ))}
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Container>
    );


}

export default ViewDetailsSegment;

const ViewSegmentDetailsList = ({ list }) => {


    const [data, setData] = useState({});
    const status = data.STATUS;

    useEffect(() => {
        setData(list);
        // console.log(list)
    }, [list]);



    return (
        <TableBody className="">
            <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" align="center" scope="row" style={{ fontWeight: '600', fontSize: '15px', height: '4em' }}>
                    {data.groupName}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px', height: '4em' }}>
                    {data.groupType}
                </TableCell>
                <TableCell align="center" style={{ color: 'blueviolet', fontWeight: 'bolder', fontSize: '15px', height: '4em' }}>
                    {data.createdDate}
                </TableCell>
            </TableRow>
        </TableBody>
    );
}