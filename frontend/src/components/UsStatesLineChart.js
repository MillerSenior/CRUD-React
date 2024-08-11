import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UsStatesLineChart = ({ chartData }) => (
    <Line data={chartData} options={{ responsive: true }} />
);

export default UsStatesLineChart;
