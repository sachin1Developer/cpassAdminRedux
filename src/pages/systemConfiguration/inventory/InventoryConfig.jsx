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


function InventoryConfig() {
    const dispatch = useDispatch()
    let token = useSelector(state => state?.token?.data?.token)
    const [loading, setLoading] = useState(true);
    const [getData, setGetData] = useState([])

    const getInventory = () => {
        dispatch(getCampaignInventory(token))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setGetData(resp?.payload?.data?.body)
                    setLoading(false);
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching list');
            });
    }

    useEffect(() => {
        getInventory();
    }, [])


    // const appConfigList = [
    //     {
    //         current_COUNT : 32328,
    //         interface: "S",
    //         total_COUNT  : 70301934
    //     }
    // ]


    return (
        <div className='mx-3'>
            <b>
                <h4 className='pvmHeading text-slate-800 m-2'>Inventory Configuration ✨</h4>
            </b>
            <TableContainer >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow className='bodyColor'>
                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Interface</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Total Count</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Current Count</TableCell>
                            {/* <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>View</TableCell> */}
                            <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}>Modify</TableCell>
                        </TableRow>
                    </TableHead>
                    {getData.map((configList, index) => (
                        <ViewAppConfig
                            key={index}
                            list={configList}
                        />
                    ))}
                </Table>
            </TableContainer>
        </div>
    );


}
export default InventoryConfig;


const ViewAppConfig = ({ list }) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState({});


    useEffect(() => {
        setData(list);
    }, [list]);


    return (
        <TableBody className="">
            <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" align="center" scope="row" style={{ fontWeight: '600', fontSize: '12px' }}>
                    {
                        (data.interface === 'S' && 'SMS' || data.interface === 'O' && 'OBD' || data.interface === 'F' && 'Facebook' || data.interface === 'T' && 'Twitter' || data.interface === 'U' && 'USSD')
                    }
                    {/* {data.interface} */}
                </TableCell>
                <TableCell align="center" style={{ color: 'blueviolet', fontWeight: 'bolder', fontSize: '12px' }}>
                    {data.total_COUNT}
                </TableCell>
                <TableCell align="center" >
                    {data.current_COUNT}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px', height: '4em' }}>
                    <Link style={{ color: 'rgb(100,116,139)' }} to='/systemConfiguration/modifyInventoryConfiguration'
                        state={{ data: data }} >
                        <EditNoteSharpIcon />
                    </Link>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}