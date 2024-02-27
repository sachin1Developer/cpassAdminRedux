import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function LineSummary({data,which}) {
    // console.log(data)

    let options = {
        chart: {
            // height: 328,
            type: 'line',
            zoom: {
                enabled: false
            },
            dropShadow: {
                enabled: true,
                top: 3,
                left: 2,
                blur: 4,
                opacity: 1,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        //colors: ["#3F51B5", '#2196F3'],
        series: [{
            name: "Success",
            data: data.map(entry => entry.totalSuccess)
        },
        {
            name: "Delivered",
            data: (which === 'O' && data.map(entry => entry.totalObdDelivered)|| which === 'S' && data.map(entry => entry.totalSmsDelivered))
        },
        {
            name: "Total Processed",
            data: data.map(entry => entry.totalProcessed)
        },
        {
            name: "Failure",
            data: data.map(entry => entry.totalFaliure)
        }
        ],
        title: {
            text: 'Campaign Summary',
            align: 'left',
            offsetY: 25,
            offsetX: 20
        },
        subtitle: {
            text: 'Count',
            offsetY: 55,
            offsetX: 20
        },
        markers: {
            size: 6,
            strokeWidth: 0,
            hover: {
                size: 9
            }
        },
        grid: {
            show: true,
            padding: {
                bottom: 0
            }
        },
        labels: data.map(entry => entry.date),
        xaxis: {
            tooltip: {
                enabled: false
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetY: -20
        }
    }
    return (
        <ReactApexChart options={options} type="line" series={options.series} height={360} width={900} />
    )
}
