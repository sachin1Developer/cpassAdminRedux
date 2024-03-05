import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import { Textarea } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHttpLinks, getRoleDetailsById, modifyRoleTypeManagement } from './slice/RoleTypeManagement';
import CommanButton from '../../../components/CommanButton';
import Heading from '../../../components/header/Heading';


function ModifyRole() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = useSelector(state => state.token?.data?.token)

    const [httpLinks, setHttpLinks] = useState([]);
    const [nameOnly, setNameOnly] = useState([]);
    const [dataWithoutDuplicat, setDataWithoutDuplicat] = useState([]);
    const [rolesCreateResponse, setRolesCreateResponse] = useState([]);
    const roleId = localStorage.getItem("RoleId");
    const [roleName, setRoleName] = useState();
    const [description, setDescription] = useState();

    const [detailsData, setDetailsData] = useState([]);

    const [loading, setloading] = useState(false)

    if ((id === null) || (id === undefined) || (parseInt(id) === 1)) {
        navigate('/operatorConfig/viewRoleType')
    }


    const getRoleDetails = () => {
        dispatch(getRoleDetailsById({ token: token, id: id }))
            .then((resp) => {
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    setDetailsData(resp?.payload?.data?.body[0]?.httpLinkslst);
                    setRoleName(resp?.payload?.data?.body[0]?.roleName)
                    setDescription(resp?.payload?.data?.body[0]?.description)
                    setVal(resp?.payload?.data?.body[0]?.httpLinkslst)
                } else {
                    toast.error('Internal server error')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching HTTP Link list');
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

    const modifyRoles = () => {
        const request = {
            "roleId": id,
            "roleName": roleName,
            "description": description,
            "httpLinkslst": val
        }
        console.log(request)
        setloading(true)
        dispatch(modifyRoleTypeManagement({ token: token, data: request }))
            .then((resp) => {
                console.log(resp?.payload?.data?.message)
                if (resp?.payload?.data?.httpStatusCode === 200) {
                    // setRolesCreateResponse(resp?.payload?.data?.message);
                    toast.success(resp?.payload?.data?.message);
                    navigate('/operatorConfig/viewRoleType')
                } else {
                    toast.error('Interval server error')
                }
                setloading(false)
            })
            .catch((error) => {
                console.error(error);
                toast.error("error while updating");
                setloading(false)
            });
    }



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

    useEffect(() => {
        getHttpLinks();
        getRoleDetails();
    }, [])

    useEffect(() => {
        removeDuplicate()
    }, [httpLinks])

    const [val, setVal] = useState([]);
    const [selectAll, setSelectAll] = useState(false)

    const [masterCheckbox, setMasterCheckbox] = useState(false);
    const [linkedCheckboxes, setLinkedCheckboxes] = useState(new Array(dataWithoutDuplicat.length).fill(false));
    const [selectedValues, setSelectedValues] = useState([]);

    // setTimeout(() => {
    //     console.log(val)
    //     // console.log(linkedCheckboxes)
    // }, 2000);

    // **************************************************************


    const toggleAllCheckboxes = (e) => {
        let { checked } = e.target;
        if (checked) {
            setMasterCheckbox(!masterCheckbox);
            setLinkedCheckboxes(new Array(dataWithoutDuplicat.length).fill(!masterCheckbox));
            setSelectedValues([]);
            setVal(dataWithoutDuplicat)
            console.log(val)
        }
        else {
            setMasterCheckbox(false);
            setLinkedCheckboxes(new Array(dataWithoutDuplicat.length).fill(false));
            setVal([])
        }
    };

    const toggleLinkedCheckbox = (index, e) => {
        const { value, checked } = e.target
        // const updatedCheckboxes = []
        let newValue = JSON.parse(value)
        if (checked) {
            const updatedCheckboxes = [...linkedCheckboxes];
            updatedCheckboxes[index] = !updatedCheckboxes[index];
            setLinkedCheckboxes(updatedCheckboxes);
            setMasterCheckbox(!updatedCheckboxes);
            val.push(newValue)
            setVal([...val])
            console.log(val)
        }
        else {
            const updatedCheckboxes = [...linkedCheckboxes];
            updatedCheckboxes[index] = !updatedCheckboxes[index];
            setMasterCheckbox(false)
            setLinkedCheckboxes(updatedCheckboxes)
            val.pop(val)
            setVal([...val])
            console.log(val)
        }
    };

    //   *************************************************************************************

    let renderDatas = dataWithoutDuplicat?.map((data, index) => {
        return (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" align="left" scope="row" style={{ fontWeight: '600', fontSize: '12px' }}>
                    {data?.description}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px' }}>
                    {detailsData.some(list => list?.linkId === data?.linkId) ?
                        <Input className='border border-secondary linkedCheckbox' type="checkbox"
                            value={JSON.stringify(data)}
                            id={data?.linkId}
                            checked={linkedCheckboxes[index]}
                            onChange={(e) => toggleLinkedCheckbox(index, e)} /> :
                        <Input className='border border-secondary linkedCheckbox' type="checkbox"
                            value={JSON.stringify(data)}
                            id={data?.linkId}
                            checked={linkedCheckboxes[index]}
                            onChange={(e) => toggleLinkedCheckbox(index, e)} />
                    }
                </TableCell>
            </TableRow>
        );
    });
    // *****************************************************************************************



    let renderData = dataWithoutDuplicat?.map((data, index) => {
        return (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" align="left" scope="row" style={{ fontWeight: '600', fontSize: '12px' }}>
                    {data?.description}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '500', fontSize: '15px' }}>
                    {/* {detailsData.some(list => list?.linkId === data?.linkId) ? */}
                    <Input className='border border-secondary linkedCheckbox' type="checkbox"
                        value={JSON.stringify(data)}
                        id={data?.linkId}
                        checked={linkedCheckboxes[index] || detailsData.some(list => list?.linkId === data?.linkId)}
                        // checked={linkedCheckboxes[true]}
                        onChange={(e) => toggleLinkedCheckbox(index, e)} />
                    {/* : <Input className='border border-secondary linkedCheckbox' type="checkbox"
                            value={JSON.stringify(data)}
                            id={data?.linkId}
                            checked={linkedCheckboxes[index]}
                            onChange={(e) => toggleLinkedCheckbox(index, e)} />
                    } */}
                </TableCell>
            </TableRow>
        );
    });



    return (
        <div className='mx-3'>
            <Heading name='Modify Role'>
                <Link to='/operatorConfig/viewRoleType'>
                    <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </Heading>
            <div className='d-flex justify-content-center '>
                    <TextField id="outlined-basic" type='text' className='mx-2' label="Role Name" variant="outlined" autoFocus='true' value={roleName} />
                    <Textarea id="outlined-basic" type='text' className='mx-2' placeholder="Description" variant="outlined" minRows={3} value={description} />
            </div>
            <div className='d-flex justify-content-center mt-4  '>
                <Row>
                    <Col sm={9}>
                        <p>Select All</p>
                    </Col>
                    <Col sm={2}>
                        <input type="checkbox" id="masterCheckbox" checked={masterCheckbox} onChange={(e) => { toggleAllCheckboxes(e) }} />
                    </Col>
                </Row>
            </div>
            <div className='d-flex justify-content-center'>
                <TableContainer style={{ backgroundColor: '' }} >
                    <Table className='' aria-label="simple table">
                        <TableHead>
                            <TableRow className='bodyColor'>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}></TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bolder', color: 'rgb(100,116,139)', backgroundColor: '#d6d6f7' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="">
                            {renderData}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <div className='d-flex justify-content-center'>
                <CommanButton className='btnBack my-4' onClick={modifyRoles}>Submit</CommanButton>
            </div>

        </div >
    );


}




export default ModifyRole;
