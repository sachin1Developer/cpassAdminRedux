import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function DynamicTable({ data, children }) {
    return (
        <TableContainer className="p-2 shadow-lg mb-2 bg-body-tertiary rounded">
            <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: '#d6d6f7' }}>
                    <TableRow className='bodyColor'>
                        {data.map((header, index) => (
                            <TableCell key={index} align="center" className="border border-2 fw-bolder fs-6">
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DynamicTable;
