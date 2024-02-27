import React from 'react'
import ReactApexChart from 'react-apexcharts';

export default function LineGraph({ height, width ,series,category}) {
    let options = {
        series: [{
            data: series
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        // title: {
        //     text: 'Product Trends by Month',
        //     align: 'left'
        // },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: category,
        }
    };
    return (
        <ReactApexChart options={options} series={options.series} type="line" height={height} width={width} />
    )
}
