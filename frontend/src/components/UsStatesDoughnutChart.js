import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UsStatesDoughnutChart = ({ chartData }) => {
    const options = {
        responsive: true,
    };

    const data = {
        ...chartData,
        datasets: chartData.datasets.map((dataset) => ({
            ...dataset,
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)', // Blue
                'rgba(75, 192, 192, 0.6)', // Green
                'rgba(255, 206, 86, 0.6)', // Yellow
                'rgba(255, 159, 64, 0.6)', // Orange
                'rgba(153, 102, 255, 0.6)', // Purple
                'rgba(255, 99, 132, 0.6)', // Red
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
        })),
    };

    return <Doughnut data={data} options={options} />;
};

export default UsStatesDoughnutChart;