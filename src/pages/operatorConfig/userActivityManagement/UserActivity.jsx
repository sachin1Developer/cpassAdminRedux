import React, { useEffect, useState } from 'react';
import { Button, Container } from 'reactstrap';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from "@mui/material";
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getUserActivity } from './slice/UserActivityManagement';
import CommanButton from '../../../components/CommanButton';





function UserActivity() {
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)
    let userId = useSelector(state => state.vendor?.data?.user_id)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);
    // console.log(userId)
    const [responseData, setResponseData] = useState([]);
    const [isActive, setIsActive] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10;

    let submitDate = (startDate, endDate) => {
        if (startDate === null) {
            toast.error("Enter Start Date")
        } else if (endDate === null) {
            toast.error("Enter End Date")
        } else {
            // let request = { startDate: (`${startDate.$y}-${startDate.$M + 1}-${startDate.$D}` + " 00:00:00"), endDate: (`${endDate.$y}-${endDate.$M + 1}-${endDate.$D}` + " 23:59:59"), userId: userId }
            let sDate = dayjs(startDate).format().slice(0, 19);
            let eDate = dayjs(endDate).format().slice(0, 19)

            // callApi.getUserActivity(sDate, eDate, userId)
            dispatch(getUserActivity({ token: token, startDate: sDate, endDate: eDate, userId: userId }))
                .then((resp) => {
                    setResponseData(resp?.payload?.data?.body[0]);
                    // console.log(resp.data.body[0])
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Error while fetching list');
                });
        }
    }
    let indexofLast = currentPage * perPage
    let indexofFirst = indexofLast - perPage
    let activePage = responseData?.slice(indexofFirst, indexofLast)


    return (
        <Container>
            <b>
                <h3 className='pvmHeading text-slate-800'>User Activity Management ✨</h3>
            </b>
            <div className='d-flex align-items-center justify-content-center my-4 h-25 ' >
                <div className='d-flex'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}  >
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker label="Select Start Date" format='YYYY-MM-DD' value={startDate || null} onChange={(e) => { setStartDate(e) }} className='w-25' />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className='d-flex'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Select End Date" format='YYYY-MM-DD' value={endDate || null} minDate={startDate} onChange={(e) => { setEndDate(e) }} className='w-25' />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className='d-flex'>
                    <CommanButton className='btnBack' onClick={() => { submitDate(startDate, endDate); setIsActive(true) }}>
                        Submit
                    </CommanButton>
                </div>
            </div>


            {responseData !== "" &&
                < div >
                    {isActive &&
                        <div className='my-4' id='search'>
                            <TableContainer style={{ backgroundColor: '', width: '100%' }} >
                                <Table sx={{}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow className='bodyColor'>
                                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Updated By</TableCell>
                                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Updated Date</TableCell>
                                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Event</TableCell>
                                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Remarks</TableCell>
                                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(63 72 85)', backgroundColor: '#d6d6f7' }}> Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {activePage?.map((searchList, index) => (
                                        < SearchListData
                                            key={index}
                                            index={index}
                                            list={searchList}
                                        />
                                    ))}
                                </Table>
                            </TableContainer>
                            <div className='d-flex justify-content-center my-4'>
                                <Pagination count={Math.ceil(responseData?.length / 10)} color="primary" onChange={(e, p) => setCurrentPage(p)} />
                            </div>
                        </div>

                    }
                </div>

            }
        </Container >
    );


}

export default UserActivity;


const SearchListData = ({ index, list, remove }) => {
    const [data, setData] = useState({});
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setData(list);
    }, [list]);


    return (
        <TableBody className="">
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" style={{ fontWeight: '600', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data?.username}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '600', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data?.UPDATED_DATE?.slice(0, 19)}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data?.ACTION}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data?.REMARK}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em', padding: '0' }}>
                    {data?.DETAIL}
                </TableCell>
            </TableRow>
        </TableBody>
    );
}

