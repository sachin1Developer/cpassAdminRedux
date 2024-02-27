import React from 'react'
import ReactApexChart from 'react-apexcharts';

export default function BarGraph({ height, width ,series,category}) {
    var options = {
        series: [{
            data: series
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                columnWidth:"40%"
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: category,
        }
    };
    return (
        <ReactApexChart options={options} series={options.series} type='bar' height={height} width={width} />
    )
}


