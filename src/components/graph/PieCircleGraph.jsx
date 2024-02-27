import React from 'react'
import ReactApexChart from 'react-apexcharts';

export default function PieCircleGraph({ series, label, height, width }) {
    let options = {
        series: series,
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: label,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    return (
        <ReactApexChart options={options} series={options.series} type='pie' height={height} width={width} />
    )
}
