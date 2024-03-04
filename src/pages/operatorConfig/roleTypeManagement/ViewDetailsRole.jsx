import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Box, Checkbox, Chip, FormControlLabel, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { toast } from 'react-toastify';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHttpLinks, getRoleDetailsById } from './slice/RoleTypeManagement';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';


function ViewDetailsRole() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state.token?.data?.token)

    if ((id === null) || (id === undefined)) {
        navigate('/operatorConfig/viewRoleType')
    }

    const [httpLinks, setHttpLinks] = useState([]);
    const [dataWithoutDuplicat, setDataWithoutDuplicat] = useState([]);
    const [detailsData, setDetailsData] = useState([]);
    


    const getRoleDetails = () => {
        dispatch(getRoleDetailsById({ id: id, token: token }))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setDetailsData(resp?.payload?.data?.body[0]);
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching subscriber range list');
            });
    }

    const getHttpLinks = () => {
        dispatch(getAllHttpLinks(token))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setHttpLinks(resp?.payload?.data?.body);
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching subscriber range list');
            });
    }


    useEffect(() => {
        getHttpLinks();
        getRoleDetails();
    }, [])

    useEffect(() => {
        removeDuplicate()
    }, [httpLinks])


    const removeDuplicate = async () => {
        const filteredArr = await httpLinks.reduce((acc, current) => {
            const x = acc.find(item => item.linkId === current.linkId);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);

        setDataWithoutDuplicat(filteredArr)
    }


    // setTimeout(() => {
    //     console.log(val)
    //     // console.log(linkedCheckboxes)
    // }, 2000);


    //   *************************************************************************************

    let renderData = dataWithoutDuplicat?.map((data, index) => {
        return (
            <div key={index} >
                <Chip label={data?.description} icon={detailsData?.httpLinkslst?.some(list => list?.linkId === data?.linkId) ? <CheckBoxOutlinedIcon style={{ color: 'green' }} /> : <CancelPresentationOutlinedIcon style={{ color: 'red' }} />} variant="outlined" style={{ width: "100%", justifyContent: 'flex-start', padding: "10px" }} />
            </div>
        );
    });




    return (
        <div className='mx-3'>
            <Heading name='View Role Detail'>
                <Link to='/operatorConfig/viewRoleType'>
                    <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </Heading>
            <div className='d-flex justify-content-center '>
                <span className='d-flex p-2 shadow-lg bg-body-tertiary rounded'>
                <div className='mx-2 fs-5'>Role Name</div>
                <div className='mx-2 fs-5'>:</div>
                <div className='mx-2 fs-5'>{detailsData?.roleName}</div>
                </span>
            </div>

            <div className='d-flex justify-content-around my-4'>
                <Stack direction='column' spacing={2}  >
                    {renderData.slice(0, renderData.length / 2)}
                </Stack>
                <Stack direction='column' spacing={2} >
                    {renderData.slice(renderData.length / 2, renderData.length - 1)}
                </Stack>
            </div>
        </div>
    );


}

export default ViewDetailsRole;