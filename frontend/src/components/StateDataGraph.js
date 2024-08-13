// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import { API_HOST } from '../config';
//
// const StateDataGraph = ({ stateName }) => {
//     const [dataPoints, setDataPoints] = useState([]);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         if (stateName) {
//             const fetchDataPoints = async () => {
//                 try {
//                     const token = localStorage.getItem('token');
//                     const response = await fetch(`${API_HOST}/api/us-states/state-data?state=${stateName}`, {
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },
//                     });
//
//                     if (!response.ok) {
//                         throw new Error(`HTTP error! Status: ${response.status}`);
//                     }
//
//                     const data = await response.json();
//                     setDataPoints(data);
//                 } catch (error) {
//                     console.error('Error fetching state data:', error);
//                     setError('Failed to fetch state data');
//                 }
//             };
//
//             fetchDataPoints();
//         }
//     }, [stateName]);
//
//     if (error) {
//         return <p>{error}</p>;
//     }
//
//     // You can choose which data you want to visualize here
//     const data = {
//         labels: ['Prisons', 'Population', 'Incarcerated'], // Customize this based on what you want to display
//         datasets: [
//             {
//                 label: `${stateName} Data Points`,
//                 data: dataPoints.length > 0 ? [dataPoints[0].prisons, dataPoints[0].state_pop, dataPoints[0].num_inside] : [],
//                 fill: false,
//                 backgroundColor: 'rgba(75,192,192,0.4)',
//                 borderColor: 'rgba(75,192,192,1)',
//             },
//         ],
//     };
//
//     return <Line data={data} />;
// };
//
// export default StateDataGraph;
import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { API_HOST } from '../config';

const StateDataGraph = ({ stateName }) => {
    const [dataPoints, setDataPoints] = useState([]);
    const [chartType, setChartType] = useState('Line');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (stateName) {
            const fetchDataPoints = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`${API_HOST}/api/us-states/state-data?state=${stateName}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                    setDataPoints(data);
                } catch (error) {
                    console.error('Error fetching state data:', error);
                    setError('Failed to fetch state data');
                }
            };

            fetchDataPoints();
        }
    }, [stateName]);

    if (error) {
        return <p>{error}</p>;
    }

    const chartData = {
        labels: ['Prisons', 'Population', 'Incarcerated'], // Customize this based on what you want to display
        datasets: [
            {
                label: `${stateName} Data Points`,
                data: dataPoints.length > 0 ? [dataPoints[0].prisons, dataPoints[0].state_pop, dataPoints[0].num_inside] : [],
                fill: false,
                backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(54,162,235,0.4)', 'rgba(255,99,132,0.4)'],
                borderColor: ['rgba(75,192,192,1)', 'rgba(54,162,235,1)', 'rgba(255,99,132,1)'],
                borderWidth: 1,
            },
        ],
    };

    const renderChart = () => {
        switch (chartType) {
            case 'Line':
                return <Line data={chartData} />;
            case 'Bar':
                return <Bar data={chartData} />;
            case 'Pie':
                return <Pie data={chartData} />;
            default:
                return <Line data={chartData} />;
        }
    };

    return (
        <div>
            <div>
                <label>Select Chart Type: </label>
                <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                    <option value="Line">Line</option>
                    <option value="Bar">Bar</option>
                    <option value="Pie">Pie</option>
                </select>
            </div>
            {renderChart()}
        </div>
    );
};

export default StateDataGraph;
