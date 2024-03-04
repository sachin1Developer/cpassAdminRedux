import React from 'react';
import { TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import exportFromJSON from 'export-from-json'
import DownloadIcon from '@mui/icons-material/Download';


function CorpReportList(props) {
    const exportCsvForPerDay = (date, inputObject) => {
        // const data = Object.entries(inputObject).map(([key, value]) => [key, ""+ value]);
        const data = [
            ['18760000012 , New Subscriber , 00:10:00 '],
            ['18760000013 , Terminations , 00:00:43 '],
            ['18760000014 ,  International Calls , 00:10:00'],
            ['18760000015 ,  Local Calls , 00:10:00'],
            ['18760000016 , Terminations , 00:13:00'],
            ['18760000007 ,  New Subscriber , 00:10:00'],
            ['18760000003 ,  New Subscriber , 00:14:00'],
        ]
        console.log(data)
        const fileName = '' + date + '--PerdayCorp-Report';
        const exportType = exportFromJSON.types.csv

        exportFromJSON({ data, fileName, exportType })
    };
    return (

        <TableRow key={props.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} className='reportsList' >

            <TableCell className="border border-2" align="center" >{props.data.reportDate.slice(0, 10)}</TableCell>

            <TableCell className="border border-2" align="center" style={{ color: 'green', fontWeight: '600' }} >{props.data.newSubscriber}</TableCell>

            <TableCell className="border border-2" align="center" style={{ color: 'red', fontWeight: '600' }}>
                {props.data.unsubscription}</TableCell>

            <TableCell className="border border-2" align="center" style={{ color: '#6366f1', fontWeight: '600' }}>
                {props.data.totalSubscriber} </TableCell>

            <TableCell className="border border-2" align="center" >
                {props.data.totalIncomingCalls}</TableCell>

            <TableCell className="border border-2" align="center" >
                {props.data.internationalCalls}</TableCell>

            <TableCell className="border border-2" align="center" >
                {props.data.localCalls}</TableCell>

            <TableCell className="border border-2" align="center" >
                {props.data.timeOfExposure}</TableCell>

            <TableCell className="border border-2" align="center" >
                <Tooltip title="Download per day csv file" >
                    <button onClick={() => { exportCsvForPerDay(props.data.reportDate.slice(0, 10), props.data) }} style={{ border: 'none', textDecoration: 'underLine', color: '#6366f1', fontWeight: '700', backgroundColor: 'transparent' }}>
                        <DownloadIcon />
                    </button>
                </Tooltip>
            </TableCell>
        </TableRow>
    );

}

export default CorpReportList;