import React from 'react'
import ReactApexChart from 'react-apexcharts';

export default function CampaignSummary() {
    var options = {
        series: [{
            name: 'Total',
            data: [44, 55, 57, 56, 61, 58, 63]
        }, {
            name: 'Processed',
            data: [76, 85, 101, 98, 87, 105, 91]
        }, {
            name: 'Delivered',
            data: [35, 41, 36, 26, 45, 48, 52]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '40%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 4,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['2023-11-14', '2023-11-15', '2023-11-16', '2023-11-17', '2023-11-18', '2023-11-19', '2023-11-20'],
        },
        yaxis: {
            title: {
                text: 'Count'
            }
        },
        fill: {
            opacity: 3
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return " " + val + " count"
                }
            }
        }
    };


    return (
        <ReactApexChart options={options} type="bar" series={options.series} height={200}  />
    )
}
