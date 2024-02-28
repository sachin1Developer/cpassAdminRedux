import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Input, Row, Tooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { InputLabel, MenuItem, Select, Table, TableCell, TableContainer, TableHead, TableRow, FormControl, TextField } from "@mui/material";
import { Container } from "react-bootstrap";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { FormControl } from "react-bootstrap";



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function ScheduleSegment() {

    return (
        <Container>
            {/* <div className='d-flex'>
                <b>
                    <h3 className='pvmHeading text-slate-800'>Schedule Segment ✨ </h3>
                </b>
            </div> */}
            <div className="my-4">
                <Row className="d-flex my-3">
                    <Col sm={6}>
                        <FormControl fullWidth className='w-100'>
                            <InputLabel id="demo-simple-select-label">Service Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={1}
                                autoFocus='true'
                                // error={!validate}    
                                label="Service Name"
                                // onChange={handleRoleType}
                                MenuProps={MenuProps} >
                                <MenuItem value={1}>Services</MenuItem>
                                <MenuItem value={2}>TEST</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col sm={6}>
                        <Input className='w-100' id="outlined-basic" type='file' accept='.csv' label="Import File" variant="standard" />
                        <label style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', color: '#ff0202c7' }}> *Extension must be .csv</label>
                    </Col>
                </Row>
                <Row className="d-flex my-2">
                    <Col sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker', 'TimePicker', 'TimePicker']}>
                                <TimePicker label="Schedule Start Time" name="startTime" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Col>
                    <Col sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker', 'TimePicker', 'TimePicker']}>
                                <TimePicker label="Schedule End Time" name="startTime" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Col>
                </Row>
                <Row className="d-flex my-4">
                    <Col sm={6}>
                        <FormControl fullWidth className=' w-100'>
                            <InputLabel id="demo-simple-select-label">Group Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={1}
                                // error={!validate}    
                                label="Group Type"
                                // onChange={handleRoleType}
                                MenuProps={MenuProps} >
                                <MenuItem value={1}>CDMA</MenuItem>
                                <MenuItem value={2}>GSM</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col sm={4}>
                    </Col>
                </Row>
            </div>
            <div className="d-flex justify-content-around">
                <Button className="btnBack">Submit</Button>
                <Button className="btnBack">Clear</Button>
            </div>
        </Container>
    );
}

export default ScheduleSegment;