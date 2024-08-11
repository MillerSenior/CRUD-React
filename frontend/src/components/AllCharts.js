// // AllCharts.js or another parent component
// import React from 'react';
// import ChartSwitcher from './ChartSwitcher';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
//
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
//
// const sampleData = {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: [10, 20, 30, 40, 50],
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//         },
//         {
//             label: 'Dataset 2',
//             data: [15, 25, 35, 45, 55],
//             backgroundColor: 'rgba(153, 102, 255, 0.2)',
//             borderColor: 'rgba(153, 102, 255, 1)',
//             borderWidth: 1,
//         },
//     ],
// };
//
// const AllCharts = () => (
//     <div className="p-4">
//         <ChartSwitcher chartData={sampleData} />
//     </div>
// );
//
// export default AllCharts;
// AllCharts.js
import React from 'react';
import ChartSwitcher from './ChartSwitcher';

const AllCharts = ({ chartData }) => (
    <div className="p-4">
        <ChartSwitcher chartData={chartData} />
    </div>
);

export default AllCharts;
