import React from 'react';
import Chart from 'react-apexcharts';

const DonutChart = () => {
    const options = {
        chart: {
            type: 'donut',
        },
        colors: ['#006AEB', '#D9D9D9', '#59A4FF'],
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    console.log(val)
                    return `${val}%`;
                },
                title: {
                    formatter: function (seriesName) {
                        console.log(seriesName)
                        return 'Bilal';
                    }
                }
            }
        },
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

    const series = [70, 30, 40]; // Data for the donut chart

    return (
        <div className="donut-chart">
            <Chart options={options} series={series} type="donut" width="272" />
        </div>
    );
};

export default DonutChart;
