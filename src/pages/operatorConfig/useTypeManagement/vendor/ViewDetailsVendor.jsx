import React, { useEffect, useState } from 'react';
import { Button, Container } from 'reactstrap';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useLocation, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { toast } from 'react-toastify';
import { getVendorById } from '../slice/UserTypeManagement';
import { useDispatch, useSelector } from 'react-redux';
import CommanButton from '../../../../components/CommanButton';


function ViewDetailsVendor() {
    const { id } = useParams()
    const dispatch = useDispatch()
    let token = useSelector(state => state.token?.data?.token)
    const [dataById, setDataById] = useState([]);

    const getVendorbyId = () => {

        dispatch(getVendorById({ id: id, token: token }))
            .then((resp) => {
                if (resp?.payload?.status === 200) {
                    setDataById(resp?.payload?.data);
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching Vendor Data');
            });
    }

    useEffect(() => {
        getVendorbyId();
    }, [])

    return (
        <Container>

            <div className=' d-flex justify-content-between my-2 align-items-center'>
                <h4 className='fw-bold mx-2'>View Vendor Detail ✨
                </h4>
                <div className='d-flex align-items-center'>
                    <Link to='/operatorConfig/userTypeManagement/viewUserType' state={{value:'1'}} >
                        <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                    </Link>
                </div>
            </div>




            <div className='mb-5' style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                User Id
                            </td>
                            <td className='px-5 py-3'> {dataById?.useridd}</td>
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
                            <td className='px-5 py-3'>{dataById?.personcontact}</td>
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
                            <td className='px-5 py-3'> {dataById?.compphone}</td>
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
                            <td className='px-5 py-3'>{dataById?.availbalance} </td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Credit Limit
                            </td>
                            <td className='px-5 py-3'>{dataById?.creditlimit}</td>
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

                    </thead>
                </table>
            </div>
        </Container>
    );


}

export default ViewDetailsVendor;