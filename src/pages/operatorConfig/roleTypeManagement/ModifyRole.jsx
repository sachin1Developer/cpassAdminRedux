import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import callApi from '../../../serviceApi/CallApi';
import { toast } from 'react-toastify';
import { Textarea } from '@mui/joy';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';




function ModifyRole() {

    const location = useLocation();
    console.log(location.state.data);

    const [httpLinks, setHttpLinks] = useState([]);
    const [nameOnly, setNameOnly] = useState([]);
    const [dataWithoutDuplicat, setDataWithoutDuplicat] = useState([]);
    const [rolesCreateResponse, setRolesCreateResponse] = useState([]);
    const roleId = localStorage.getItem("RoleId");
    const [roleName, setRoleName] = useState(location.state.data?.roleName);
    const [description, setDescription] = useState(location.state.data?.description);

    const [detailsData, setDetailsData] = useState([]);


    const getRoleDetails = () => {
        callApi.getRoleDetailsById(location.state.data?.roleId)
            .then((resp) => {
                setDetailsData([...resp.data.body[0]?.httpLinkslst]);
                setVal(resp.data.body[0]?.httpLinkslst)
                // setLoading(false);
                console.log(resp.data.body[0]?.httpLinkslst)
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching HTTP Link list');
            });
    }


    const getHttpLinks = () => {
        callApi.getAllHttpLinks()
            .then((resp) => {
                // console.log(resp.data.body)
                setHttpLinks(resp.data.body);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error while fetching subscriber range list');
            });
    }

    const modifyRoles = () => {
        const request = {
            "roleId": location.state.data?.roleId,
            "roleName": roleName,
            "description": description,
            "httpLinkslst": val
        }
        console.log(request)
        callApi.updateRoleType(request)
            .then((resp) => {
                console.log(resp.data.message)
                setRolesCreateResponse(resp.data.message);
                toast.success(resp.data.message);
            })
            .catch((error) => {
                console.error(error);
                toast.error(rolesCreateResponse);
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
        <Container>
            {
                rolesCreateResponse === "roll is updated" &&
                <Redirect to="/operatorConfig/viewRoleType" />
            }
            <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                    <b>
                        <h3 className='pvmHeading text-slate-800'>Modify Role ✨</h3>
                    </b>
                </div>
                <div className='d-flex'>
                    <Link to='/operatorConfig/viewRoleType'>
                        <Button type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</Button>
                    </Link>
                </div>

            </div>
            <Row className='mx-5'>
                <Col sm={4}>
                    <TextField id="outlined-basic" type='text' label="Role Name" variant="outlined" autoFocus='true' value={roleName} />
                </Col>
                <Col sm={6}>
                    <Textarea id="outlined-basic" type='text' placeholder="Description" variant="outlined" minRows={3} value={description} />
                </Col>
            </Row>
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
                <Button className='btnBack my-4' onClick={modifyRoles}>Submit</Button>
            </div>

        </Container >
    );


}




export default ModifyRole;
