import React from 'react';
import ReactApexChart from 'react-apexcharts';


class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                data: this.props?.data
            }],
            options: {
                chart: {
                    height: 170,
                    innerWidth: 170,
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
                        columnWidth: '35%',
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
                    categories: this.props?.catagory,
                    labels: {
                        style: {
                            // colors: colors,
                            fontSize: '10px'
                        }
                    }
                }
            },


        };
    }



    render() {
        return (
            <div className='cleflex ' style={{ fontSize: '8px', overflowY: 'hidden' }}>
                <div id="chart" className='overflow-hidden'>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={this.props.height} width={this.props.width} />
                </div>
            </div>
        );
    }
}



export default BarChart;