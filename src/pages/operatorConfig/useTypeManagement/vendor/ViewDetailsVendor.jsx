import React, { useEffect, useState } from 'react';
import { Button, Container } from 'reactstrap';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import callApi from '../../../../serviceApi/CallApi';
import { toast } from 'react-toastify';


function ViewDetailsVendor() {
    const location = useLocation();
    console.log(location.state.data)
    const useId = location.state.data
    const [dataById, setDataById] = useState([]);

    const getVendorbyId = (useId) => {
        // let useId =  location.state.data
        callApi.getVenderDetails(useId)
            .then((resp) => {
                console.log(resp.data)
                setDataById(resp.data);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching Vendor Data');
            });
    }

    useEffect(() => {
        let useId = location.state.data
        getVendorbyId(useId);
    }, [])

    return (
        <Container>
            <b>
                <h3 className='pvmHeading text-slate-800'>View Vendor Detail ✨
                    <div className='my-2'>
                        <Link to='/operatorConfig/userTypeManagement/viewUserType'>
                            <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                        </Link>
                    </div>
                </h3>
            </b>
            <div className='mb-5' style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                User Id
                            </td>
                            <td className='px-5 py-3'> {dataById.useridd}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                User Name
                            </td>
                            <td className='px-5 py-3'> {dataById.username}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3'
                                style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Person Contact
                            </td>
                            <td className='px-5 py-3'>{dataById.personcontact}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Position
                            </td>
                            <td className='px-5 py-3'>{dataById.position} </td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Mobile
                            </td>
                            <td className='px-5 py-3'>{dataById.mobile}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Email
                            </td>
                            <td className='px-5 py-3'>{dataById.email}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Comp Phone
                            </td>
                            <td className='px-5 py-3'> {dataById.compphone}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3'
                                style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Ext.
                            </td>
                            <td className='px-5 py-3'>{dataById.ext}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Avail Balance
                            </td>
                            <td className='px-5 py-3'>{dataById.availbalance} </td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Credit Limit
                            </td>
                            <td className='px-5 py-3'>{dataById.creditlimit}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Sales Rep.
                            </td>
                            <td className='px-5 py-3'>{dataById.salesresp}</td>
                        </tr>  <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Sales Email
                            </td>
                            <td className='px-5 py-3'> {dataById.salesemail}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3'
                                style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Sales Mob
                            </td>
                            <td className='px-5 py-3'>{dataById.salesemobile}</td>
                        </tr>

                    </thead>
                </table>
            </div>
        </Container>
    );


}

export default ViewDetailsVendor;