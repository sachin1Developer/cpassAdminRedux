import React, { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from "@mui/material";
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getUserActivity } from './slice/UserActivityManagement';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';
import Empty from '../../../components/empty/Empty';





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
        <div className='mx-3'>
            <Heading name='User Activity Management'>
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
            </Heading>
            {
                responseData?.length === 0
                    ?
                    <Empty name='Data Not Found' />
                    :
                    <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded" >
                        <Table >
                            <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                                <TableRow className='bodyColor'>
                                    <TableCell align="center" className="border border-2 fw-bolder fs-6" > Updated By</TableCell>
                                    <TableCell align="center" className="border border-2 fw-bolder fs-6" > Updated Date</TableCell>
                                    <TableCell align="center" className="border border-2 fw-bolder fs-6" > Event</TableCell>
                                    <TableCell align="center" className="border border-2 fw-bolder fs-6" > Remarks</TableCell>
                                    <TableCell align="center" className="border border-2 fw-bolder fs-6" > Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activePage?.map((searchList, index) => (
                                    < SearchListData
                                        key={index}
                                        index={index}
                                        list={searchList}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
            {
                responseData?.length > perPage
                &&
                <div className='d-flex justify-content-center my-4'>
                    <Pagination count={Math.ceil(responseData?.length / perPage)} variant="outlined" shape="rounded" onChange={(e, p) => setCurrentPage(p)} />
                </div>
            }
        </div>
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
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center" className="border border-2" style={{ color: '#6366f1', fontWeight: '600' }}>
                {data?.username}
            </TableCell>
            <TableCell align="center" className="border border-2">
                {data?.UPDATED_DATE?.slice(0, 10)}
            </TableCell>
            <TableCell align="center" className="border border-2">
                {data?.ACTION}
            </TableCell>
            <TableCell align="center" className="border border-2">
                {data?.REMARK}
            </TableCell>
            <TableCell align="center" className="border border-2">
                {data?.DETAIL}
            </TableCell>
        </TableRow>
    );
}

