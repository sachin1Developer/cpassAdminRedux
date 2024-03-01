import { TableCell, TableRow } from '@mui/material';
import { signal } from '@preact/signals-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const specficCampId = signal(null)

function PvmViewList({ data, key }) {
    const navigate = useNavigate();

    const [nextPage, setNextPage] = useState(false)
    const [isHovered, setIsHovered] = useState(false);

    if (nextPage) {
        navigate('/graphPvmReport')
    }

    const tableRowStyle = {
        cursor: "pointer",
        boxShadow: isHovered ? '1px 2px 7px grey' : 'none'
    }

    return (

        <TableRow key={key}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            className='container-fluid'
            style={tableRowStyle}
            onClick={() => { navigate(`/graphPvmReport/${data?.campaignId}`) }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <TableCell align="center" style={{ color: '#6366f1', fontWeight: '700', fontSize: '12px', height: '4em' }}>{data?.campaignId}</TableCell>
            <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>{data?.campaignName}</TableCell>
            <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>{data?.startDate?.slice(0, 10)}</TableCell>
            <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>{data?.endDate?.slice(0, 10)}</TableCell>
        </TableRow>
    )
}

export default PvmViewList;