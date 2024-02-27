import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import { Textarea } from '@mui/joy';


const nameId = "nameId"

function AddRoleType() {
    const [httpLinks, setHttpLinks] = useState([]);
    const [nameOnly, setNameOnly] = useState([]);
    const [dataWithoutDuplicat, setDataWithoutDuplicat] = useState([]);
    const [rolesCreateResponse, setRolesCreateResponse] = useState([]);
    const roleId = localStorage.getItem("RoleId");
    const [roleName, setRoleName] = useState("");
    const [description, setDescription] = useState("");

    const getHttpLinks = () => {
        // callApi.getAllHttpLinks()
        //     .then((resp) => {
        //         // console.log(resp.data.body)
        //         setHttpLinks(resp.data.body);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         toast.error('Error while fetching subscriber range list');
        //     });
    }

    const getRoleName = () => {
        // callApi.getAllRoleNameOnly()
        //     .then((resp) => {
        //         console.log(resp.data.body)
        //         setNameOnly(resp.data.body);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         toast.error('Error while fetching subscriber range list');
        //     });
    }

    const handleRoleName = (e) => {
        // setRoleName(e.target.value);
        // let flag = false
        // nameOnly.map((name) => {
        //     if (e.target.value === name) {
        //         flag = true;
        //         setRoleName(e.target.value);
        //     }
        // })
        // if (flag === false) {
        //     setRoleName(e.target.value);
        // } else {
        //     toast.error('This Role name is already exist', {
        //         toastId: nameId
        //     });
        // }
    }


    const addRoles = () => {
        const request = {
            "roleId": roleId,
            "roleName": roleName,
            "description": description,
            "httpLinkslst": val
        }
        console.log(request)
        // callApi.createRoles(request)
        //     .then((resp) => {
        //         console.log(resp.data)
        //         console.log(resp.data.message)
        //         setRolesCreateResponse(resp.data.message);
        //         toast.success(resp.data.message);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         toast.error(rolesCreateResponse);
        //     });
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
        getRoleName();
    }, [])

    useEffect(() => {
        removeDuplicate()
    }, [httpLinks])

    const [val, setVal] = useState([]);
    const [selectAll, setSelectAll] = useState(false)
    let checkedCondition = selectAll ? true : false || val ? false : true

    const handleCheckbox = (e) => {
        let { checked } = e.target;
        if (checked) {
            setSelectAll(true)
            setVal(dataWithoutDuplicat)
        }
        else {
            setSelectAll(false)
            setVal([])
        }
    }

    const handleChange = (e) => {
        let { value, checked } = e.target;
        let newValue = JSON.parse(value)
        console.log(checked, newValue)
        if (checked) {
            console.log("push")
            console.log(val)
            console.log(val.push(newValue))
            setVal([...val])

            if (val.length === dataWithoutDuplicat.length) {
                setSelectAll(true)
            }
        }
        else {
            console.log("pop")
            let templArr = val.filter((each) => { return each.linkId === newValue.linkId });
            setSelectAll(false)
            setVal(templArr)
            console.log(val)
        }
    };


    const [masterCheckbox, setMasterCheckbox] = useState(false);
    const [linkedCheckboxes, setLinkedCheckboxes] = useState(new Array(dataWithoutDuplicat.length).fill(false));
    const [selectedValues, setSelectedValues] = useState([]);

    setTimeout(() => {
        console.log(val)
        // console.log(linkedCheckboxes)
    }, 2000);

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
        }
    };

    //   *************************************************************************************

    let renderData = dataWithoutDuplicat?.map((data, index) => {
        return <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" align="left" scope="row" style={{ fontWeight: '600', fontSize: '12px' }}>
                {data?.description}
            </TableCell>
            <TableCell align="center" style={{ color: 'black', fontWeight: '500', fontSize: '15px' }}>
                {/* <Input className='border border-secondary' checked={checkedCondition} value={JSON.stringify(data)} type='checkbox' onClick={(e) => { handleChange(e) }} /> */}


                <Input className='border border-secondary linkedCheckbox' type="checkbox"
                    value={JSON.stringify(data)}
                    id={data?.linkId}
                    checked={linkedCheckboxes[index]}
                    onChange={(e) => toggleLinkedCheckbox(index, e)} />


            </TableCell>
        </TableRow>
    })




    return (
        <Container>
            {/* {
                rolesCreateResponse === "Role created successfully" &&
                <Redirect to="/operatorConfig/viewRoleType" />
            } */}
            <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                    <b>
                        <h3 className='pvmHeading text-slate-800'>Add Role ✨</h3>
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
                    <TextField id="outlined-basic" type='text' label="Role Name" variant="outlined" autoFocus='true' value={roleName}
                        onChange={handleRoleName} />
                </Col>
                <Col sm={6}>
                    <Textarea id="outlined-basic" type='text' placeholder="Description" variant="outlined" minRows={3} value={description} onChange={(e) => { setDescription(e.target.value) }} />
                </Col>
            </Row>
            <div className='d-flex justify-content-center mt-4  '>
                <Row>
                    <Col sm={9}>
                        <p>Select All</p>
                    </Col>
                    <Col sm={2}>
                        {/* <Input type="checkbox" className='border border-secondary' value={selectAll} onClick={handleCheckbox} /> */}
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
                        {/* Array.from(new Set(addresses.map(a => a.id))) */}
                        <TableBody className="">
                            {renderData}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <div className='d-flex justify-content-center'>
                {/* <ViewHttpLinks /> */}
                <Button className='btnBack my-4' onClick={addRoles}>Submit</Button>
            </div>

        </Container >
    );


}




export default AddRoleType;





const ViewHttpLinks = ({ key, data, valArray, check }) => {
    console.log(valArray)

    // const token = localStorage.getItem("Bearer");
    const [checked, setChecked] = useState([true, false]);
    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };
    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="Child 1"
                control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
            />
            <FormControlLabel
                label="Child 2"
                control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
            />
        </Box>
    );


    return (
        <div>
            <FormControlLabel
                label="Parent"
                control={
                    <Checkbox
                        checked={checked[0] && checked[1]}
                        indeterminate={checked[0] !== checked[1]}
                        onChange={handleChange1}
                    />
                }
            />
            {children}
        </div>
        // <TableBody key={key} className="">
        //     {
        //         token === null && <Redirect to='/' />
        //     }
        //     <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        //         <TableCell component="th" align="left" scope="row" style={{ fontWeight: '600', fontSize: '12px' }}>
        //             {data?.description}
        //         </TableCell>
        //         <TableCell align="center" style={{ color: 'black', fontWeight: '500', fontSize: '15px' }}>
        //             <Input className='border border-secondary'  checked={valArray?.includes(data)} value={JSON.stringify(data)} type='checkbox' color='black' onClick={(e) => { check(e) }} />
        //         </TableCell>
        //     </TableRow>
        // </TableBody>
    );
}