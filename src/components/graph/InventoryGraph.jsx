import React from 'react'
import ReactApexChart from 'react-apexcharts';

export default function InventoryGraph({ data }) {

    // console.log(data)

    var options = {
        series: [{
            data: data.map((value) => value.current_COUNT)
        }],
        chart: {
            // height: 150,
            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // console.log(chart, w, e)
                }
            }
        },
        // colors: colors,
        plotOptions: {
            bar: {
                columnWidth: '20%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories:
                data.map((value) => [interfaceName(value.interface), "[" + value.total_COUNT + "]"]),
            // [
            //     ['SMS', '[70000]'],
            //     ['OBD', '[70000]'],
            //     ['USSD', '[70000]']
            // ],
            labels: {
                style: {
                    // colors: colors,
                    fontSize: '10px'
                }
            }
        }
    };

    return (
        <ReactApexChart options={options} type="bar" series={options.series} height={300} width={400}  />
    )
}

function interfaceName(name) {
    if(name === 'F'){
        return "Facebook"
    }
    if(name === 'O'){
        return "OBD"
    }
    if(name === 'S'){
        return "SMS"
    }
    if(name === 'T'){
        return "Twitter"
    }
    if(name === 'U'){
        return "USSD"
    }
    return name
   
}