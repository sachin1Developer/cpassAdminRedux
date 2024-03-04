import React from 'react';
import { TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import exportFromJSON from 'export-from-json'
import DownloadIcon from '@mui/icons-material/Download';


function PvmReportListData(props) {
    const exportCsvForPerDay = (date, inputObject) => {
        // const data = Object.entries(inputObject).map(([key, value]) => [key, ""+ value]);
        const data = [
            ['18760000012 , 4 '],
            ['18760000013 , Unanswered Calls '],
            ['18760000014 , Interrupted Calls '],
            ['18760000015 , 8 '],
            ['18760000016 , Completed Calls '],
            ['18760000007 , 1 '],
            ['18760000003 , Interrupted Calls '],
        ]
        console.log(data)
        const fileName = '' + date + '--PerdayPvm-Report';
        const exportType = exportFromJSON.types.csv

        exportFromJSON({ data, fileName, exportType })
    };
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} className='reportsList' >

            <TableCell align="center" className="border border-2">
                {props.date?.slice(0, 10)} </TableCell>

            <TableCell align="center" className="border border-2">{props.totalNoOfCalls}</TableCell>

            <TableCell align="center" className="border border-2">{props.completedCalls}</TableCell>

            <TableCell align="center" className="border border-2">
                {props.unansweredCalls}</TableCell>

            <TableCell align="center" className="border border-2">{props.interruptedCalls}</TableCell>

            <TableCell align="center" className="border border-2">{props.invalidNumbers}</TableCell>

            <TableCell align="center" className="border border-2">
                {props.interactions}
            </TableCell>
            <TableCell align="center" className="border border-2">
                <Tooltip title="Download per day csv file" >
                    <button onClick={() => { exportCsvForPerDay(props.date?.slice(0, 10), props.data) }} style={{ border: 'none', textDecoration: 'underLine', color: '#6366f1', fontWeight: '700', backgroundColor: 'transparent' }}>
                        <DownloadIcon />
                    </button>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}

export default PvmReportListData;