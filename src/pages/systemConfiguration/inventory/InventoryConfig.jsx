import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from 'react-router-dom';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaignInventory } from './slice/Inventory';
import Heading from '../../../components/header/Heading';


function InventoryConfig() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)
    const [loading, setLoading] = useState(true);
    const [getData, setGetData] = useState([])

    const getInventory = () => {
        setLoading(true)
        dispatch(getCampaignInventory(token))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setGetData(resp?.payload?.data?.body)
                } else {
                    toast.error('Internal server error')
                }
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
                setLoading(false)
                toast.error('Error while fetching list');
            });
    }

    useEffect(() => {
        getInventory();
    }, [])

    
    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='mx-3'>
                <Heading name='Inventory Configuration'></Heading>
                <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded" >
                    <Table aria-label="simple table">
                        <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                            <TableRow >
                                <TableCell className="border border-2 fw-bolder fs-6" align="center" >Interface</TableCell>
                                <TableCell className="border border-2 fw-bolder fs-6" align="center" >Total Count</TableCell>
                                <TableCell className="border border-2 fw-bolder fs-6" align="center" >Current Count</TableCell>
                                {/* <TableCell className="border border-2 fw-bolder fs-6" align="center" >View</TableCell> */}
                                <TableCell className="border border-2 fw-bolder fs-6" align="center" >Modify</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                getData.map((configList, index) => (
                                    <ViewAppConfig key={index} list={configList} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }


}
export default InventoryConfig;


const ViewAppConfig = ({ list }) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState({});


    useEffect(() => {
        setData(list);
    }, [list]);


    return (
        <TableRow >
            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }} >
                {
                    (data.interface === 'S' && 'SMS' || data.interface === 'O' && 'OBD' || data.interface === 'F' && 'Facebook' || data.interface === 'T' && 'Twitter' || data.interface === 'U' && 'USSD')
                }
                {/* {data.interface} */}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: 'black', fontWeight: '600' }} >
                {data.total_COUNT}
            </TableCell>
            <TableCell className="border border-2" align="center" style={{ color: 'green', fontWeight: '600' }} >
                {data.current_COUNT}
            </TableCell>
            <TableCell className="border border-2" align="center" >
                <Link style={{ color: 'black' }} to='/systemConfiguration/modifyInventoryConfiguration'
                    state={{ data: data }} >
                    <EditNoteSharpIcon />
                </Link>
            </TableCell>
        </TableRow>
    );
}