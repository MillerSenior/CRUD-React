// frontend/src/components/UsStatesChart.js
import React, { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController
);

const UsStatesChart = ({ chartData }) => {
    const chartRef = useRef(null);
    const myChartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (myChartRef.current) {
            myChartRef.current.destroy();  // Destroy the existing chart if it exists
        }

        myChartRef.current = new ChartJS(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'US States Incarceration Rate',
                    },
                },
            },
        });

        return () => {
            if (myChartRef.current) {
                myChartRef.current.destroy();  // Clean up when the component is unmounted
            }
        };
    }, [chartData]);

    return <canvas ref={chartRef} />;
};

export default UsStatesChart;
