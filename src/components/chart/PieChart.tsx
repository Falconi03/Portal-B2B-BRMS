import React from 'react';
import { Page } from "@/components";
import Chart from 'react-apexcharts';

interface PropsChart {
    labels: any[]
    title: string
    series: any[]
}

const MyChart = (props: PropsChart) => {

    const chart = {
        pieChart: {
            options: {
                chart: {
                    height: 365,
                },
                dataLabels: {
                    dropShadow: {
                        enabled: false,
                        top: 10,
                        left: 10,
                        blur: 1,
                        opacity: 0.45
                    }
                },
                colors: ['#fb5597', '#f59c1a', '#348fe2', '#00acac', '#8753de', '#6959CD',
                    '#191970', '#00CED1', '#00FF7F', '#B8860B', '#C71585', '#B22222',
                    '#0000CD', '#20B2AA', '#8FBC8F', '#8B4513', '#FF1493', '#FF4500',
                    '#4169E1', '#7FFFD4', '#006400', '#D2691E', '#FFC0CB', '#FFFF00',
                    '#87CEFA', '#5F9EA0', '#00FF00', '#F5DEB3', '#DC143C', '#E0FFFF'],

                labels: props.labels,
                title: {
                    text: props.title
                }
            },
            series: props.series
        }
    }



    return (
        <Chart type="pie" options={chart.pieChart.options} series={chart.pieChart.series} />
    )

}
export default MyChart;