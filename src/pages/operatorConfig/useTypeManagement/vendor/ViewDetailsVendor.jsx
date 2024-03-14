import React, { useEffect, useState } from 'react';
import { Button, Container } from 'reactstrap';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { toast } from 'react-toastify';
import { getVendorById } from '../slice/UserTypeManagement';
import { useDispatch, useSelector } from 'react-redux';
import CommanButton from '../../../../components/CommanButton';
import Heading from '../../../../components/header/Heading';
import Loader from '../../../../components/loader/Loader';


function ViewDetailsVendor() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state.token?.data?.token)
    const [dataById, setDataById] = useState([]);
    const [loading, setloading] = useState(true)
    console.log(typeof(id))

    if((id === undefined)||(id === null)){
        navigate('/operatorConfig/userTypeManagement/viewUserType',{state:{ value: '1' }})
    }

    const getVendorbyId = () => {
        setloading(true)
        dispatch(getVendorById({ id: id, token: token }))
            .then((resp) => {
                console.log(resp)
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    if(resp?.payload?.data?.body[0] === id){
                        toast.error('Not Found')
                        navigate('/operatorConfig/userTypeManagement/viewUserType',{state:{ value: '1' }})
                    }else{
                        setDataById(resp?.payload?.data?.body[0]);
                    }
                } else {
                    toast.error('Internal server error')
                }
                setloading(false)
            })
            .catch((error) => {
                console.error(error);
                setloading(false)
                toast.error('Error while fetching Vendor Data');
            });
    }

    useEffect(() => {
        getVendorbyId();
    }, [])

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='View Vendor Detail'>
                    <Link to='/operatorConfig/userTypeManagement/viewUserType' state={{ value: '1' }} >
                        <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </Heading>




                <div className='mb-5' style={{ display: 'flex', justifyContent: 'center' }}>
                    <table>
                        <thead>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    User Id
                                </td>
                                <td className='px-5 py-3'> {dataById?.userid}</td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    User Name
                                </td>
                                <td className='px-5 py-3'> {dataById?.username}</td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3'
                                    style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Person Contact
                                </td>
                                <td className='px-5 py-3'>{dataById?.personContact}</td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Position
                                </td>
                                <td className='px-5 py-3'>{dataById?.position} </td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Mobile
                                </td>
                                <td className='px-5 py-3'>{dataById?.mobile}</td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Email
                                </td>
                                <td className='px-5 py-3'>{dataById?.email}</td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Comp Phone
                                </td>
                                <td className='px-5 py-3'> {dataById?.compPhone}</td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3'
                                    style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Ext.
                                </td>
                                <td className='px-5 py-3'>{dataById?.ext}</td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Avail Balance
                                </td>
                                <td className='px-5 py-3'>{dataById?.availBalance} </td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Credit Limit
                                </td>
                                <td className='px-5 py-3'>{dataById?.creditLimit}</td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Sales Rep.
                                </td>
                                <td className='px-5 py-3'>{dataById?.salesresp}</td>
                            </tr>  <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Sales Email
                                </td>
                                <td className='px-5 py-3'> {dataById?.salesemail}</td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3'
                                    style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Sales Mob
                                </td>
                                <td className='px-5 py-3'>{dataById?.salesemobile}</td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3'
                                    style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Billing Number
                                </td>
                                <td className='px-5 py-3'>{dataById?.billingmsisdn}</td>
                            </tr>
                            <tr style={{ border: '1px solid #c1bbbb' }}>
                                <td className='px-5 py-3'
                                    style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                    Country Code
                                </td>
                                <td className='px-5 py-3'>{dataById?.countycode}</td>
                            </tr>

                        </thead>
                    </table>
                </div>
            </div>
        );
    }

}

export default ViewDetailsVendor;