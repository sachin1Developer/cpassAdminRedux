import React from 'react';
import { TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import exportFromJSON from 'export-from-json'
import DownloadIcon from '@mui/icons-material/Download';


function AdReportList({ key, data }) {
   
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
        const fileName = '' + date + '--PerdayAd-Report';
        const exportType = exportFromJSON.types.csv

        exportFromJSON({ data, fileName, exportType })
    };

    return (
        <>
            <TableBody className=''>
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} className='reportsList' >

                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '12px', height: '4em', width: '100px' }}>
                        {data?.reportDate.slice(0, 10)} </TableCell>

                    <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                        {data?.newSubscriber}</TableCell>

                    <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                        {data?.unsubscription}</TableCell>

                    <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                        {data?.activeSubscriber}
                    </TableCell>

                    <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                        {data?.dailyCharges}</TableCell>

                    <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>{data?.uniqueSubscriber}</TableCell>

                    <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                        {data?.totalIncomingCalls}</TableCell>

                    <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                        {data?.internationalCalls}</TableCell>

                    <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                        {data?.localCalls}</TableCell>

                    <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                        {data?.timeOfExposure}</TableCell>

                    <TableCell align="center" style={{ fontWeight: '500', fontSize: '12px', height: '4em' }}>
                        <Tooltip title="Download per day csv file" >
                            <button onClick={() => { exportCsvForPerDay(data?.reportDate?.slice(0, 10), data) }} style={{ border: 'none', textDecoration: 'underLine', color: '#6366f1', fontWeight: '700', backgroundColor: 'transparent' }}>
                                <DownloadIcon />
                            </button>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            </TableBody>
        </>
    );
}

export default AdReportList;