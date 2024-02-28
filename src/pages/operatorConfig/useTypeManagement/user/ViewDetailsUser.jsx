import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import { getUserbyName } from '../slice/UserTypeManagement';
import { toast } from 'react-toastify';
import CommanButton from '../../../../components/CommanButton';


function ViewDetailsUser() {
    const { name } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state.token?.data?.token)
    const [data, setData] = useState({})
    const [limit, setlimit] = useState()
    const [status, setstatus] = useState()


    if ((name === null) || (name === undefined)) {
        navigate('/operatorConfig/userTypeManagement/viewUserType')
    }

    useEffect(() => {
        dispatch(getUserbyName({ name: name, token: token }))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setData(resp?.payload?.data?.body[0][0])
                    setlimit(JSON.parse(resp?.payload?.data?.body[0][0]?.total_limit)?.obdLimit)
                    setstatus(JSON.parse(resp?.payload?.data?.body[0][0]?.current_status)?.obdLimit)
                } else {
                    toast.error('Internal server error')
                }
            }).catch((err) => {
                console.log(err)
            })
    }, [])




    return (
        <Container>
            <div className=' d-flex justify-content-between my-2 align-items-center'>
                <h4 className='fw-bold mx-2'>View User Detail ✨
                </h4>
                <div className='d-flex align-items-center'>
                    <Link to='/operatorConfig/userTypeManagement/viewUserType'>
                        <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </div>
            </div>
            <div className='mb-5' style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                UserName
                            </td>
                            <td className='px-5 py-3'> {data?.USERNAME}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3'
                                style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Role Type
                            </td>
                            <td className='px-5 py-3'>{data?.ROLE_ID}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                OBD Limit
                            </td>
                            <td className='px-5 py-3'>{limit} </td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                OBD Status
                            </td>
                            <td className='px-5 py-3'>{status}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Email Id
                            </td>
                            <td className='px-5 py-3'>{data?.EMAIL}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Mobile No.
                            </td>
                            <td className='px-5 py-3'> {data?.MOBILE_NUM}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </Container>
    );


}

export default ViewDetailsUser;