// // ChartSwitcher.js
// import React, { useState } from 'react';
// import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
//
// // Register necessary Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
//
// const ChartSwitcher = ({ chartData }) => {
//     const [chartType, setChartType] = useState('bar');
//
//     const handleChangeChartType = (event) => {
//         setChartType(event.target.value);
//     };
//
//     const renderChart = () => {
//         switch (chartType) {
//             case 'bar':
//                 return <Bar data={chartData} options={{ responsive: true }} />;
//             case 'line':
//                 return <Line data={chartData} options={{ responsive: true }} />;
//             case 'pie':
//                 return <Pie data={chartData} options={{ responsive: true }} />;
//             case 'doughnut':
//                 return <Doughnut data={chartData} options={{ responsive: true }} />;
//             default:
//                 return <Bar data={chartData} options={{ responsive: true }} />;
//         }
//     };
//
//     return (
//         <div>
//             <div className="mb-4">
//                 <label htmlFor="chartType" className="block text-gray-700">Select Chart Type:</label>
//                 <select id="chartType" value={chartType} onChange={handleChangeChartType} className="p-2 border border-gray-300 rounded">
//                     <option value="bar">Bar</option>
//                     <option value="line">Line</option>
//                     <option value="pie">Pie</option>
//                     <option value="doughnut">Doughnut</option>
//                 </select>
//             </div>
//             <div className="chart-container">
//                 {renderChart()}
//             </div>
//         </div>
//     );
// };
//
// export default ChartSwitcher;
// ChartSwitcher.js
import React, { useState } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ChartSwitcher = ({ chartData }) => {
    const [selectedChart, setSelectedChart] = useState('bar');

    const handleChartChange = (event) => {
        setSelectedChart(event.target.value);
    };

    if (!chartData) {
        return <p>Loading chart...</p>;
    }

    const chartComponents = {
        bar: <Bar data={chartData} />,
        line: <Line data={chartData} />,
        pie: <Pie data={chartData} />,
        doughnut: <Doughnut data={chartData} />,
    };

    return (
        <div>
            <div className="text-center mb-4">
                <label className="mr-2">Choose chart type:</label>
                <select value={selectedChart} onChange={handleChartChange} className="select">
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                    <option value="pie">Pie</option>
                    <option value="doughnut">Doughnut</option>
                </select>
            </div>
            <div>
                {chartComponents[selectedChart]}
            </div>
        </div>
    );
};

export default ChartSwitcher;
