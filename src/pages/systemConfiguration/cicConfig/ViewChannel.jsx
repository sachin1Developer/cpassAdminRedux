import React from 'react';
import { Button, Container } from 'reactstrap';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ChannelGraph from '../../../graph/ChannelGraph';


function ViewChannel() {
    // const location = useLocation();
    // console.log(location.state.data)
    return (
        <div>
            View Channel
            <ChannelGraph />
        </div>
    );

}

export default ViewChannel;