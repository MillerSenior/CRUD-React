// import React, { useEffect, useState } from 'react';
// import UsStatesChart from '../components/UsStatesChart';
// import Navigation from '../components/NavBar';
// import axios from 'axios';
// import {API_HOST} from "../config";
//
// function Chart() {
//     const [chartData, setChartData] = useState(null);
//     const [error, setError] = useState(null);
//     const [rawData, setRawData] = useState(null);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(API_HOST + '/api/us-states');
//                 console.log('Raw API Response:', response);
//                 console.log('Response data:', response.data);
//                 setRawData(response.data);
//
//                 setRawData(response.data);
//
//                 let data = response.data;
//
//                 // Log the type and structure of the data
//                 console.log('Data type:', typeof data);
//                 console.log('Is Array:', Array.isArray(data));
//                 console.log('Data structure:', JSON.stringify(data, null, 2));
//
//                 // Try to process the data regardless of its type
//                 let processableData = data;
//                 if (typeof data === 'object' && !Array.isArray(data)) {
//                     processableData = Object.values(data);
//                 }
//
//                 if (!Array.isArray(processableData) || processableData.length === 0) {
//                     throw new Error('Unable to process data into required format');
//                 }
//
//                 // Transform data into the format required by Chart.js
//                 const formattedData = {
//                     labels: processableData.map(item => item.state_name),
//                     datasets: [
//                         {
//                             label: 'Incarceration Rate',
//                             data: processableData.map(item => item.incarceration_rate),
//                             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                             borderColor: 'rgba(75, 192, 192, 1)',
//                             borderWidth: 1,
//                         },
//                     ],
//                 };
//                 setChartData(formattedData);
//                 console.log('Formatted Data:', formattedData);
//             } catch (error) {
//                 console.error('Error fetching or processing data:', error);
//                 setError(error.message);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     if (error) {
//         return (
//             <div className="Chart">
//                 <Navigation />
//                 <h1>Error</h1>
//                 <p>{error}</p>
//                 <h2>Raw Data:</h2>
//                 <pre>{JSON.stringify(rawData, null, 2)}</pre>
//             </div>
//         );
//     }
//
//     return (
//         <div className="Chart">
//             <Navigation />
//             <h1>US States Incarceration Data Visualization</h1>
//             {chartData ? <UsStatesChart chartData={chartData} /> : <p>Loading chart...</p>}
//         </div>
//     );
// }
//
// export default Chart;
import React, { useEffect, useState } from 'react';
import UsStatesChart from '../components/UsStatesChart';
import Navigation from '../components/NavBar';
import axios from 'axios';
import { API_HOST } from "../config";

function Chart() {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_HOST + '/api/us-states');
                console.log('Response data:', response.data);

                let data = response.data;

                // Ensure response data is an array
                if (!Array.isArray(data)) {
                    throw new Error('Data is not an array');
                }

                // Transform data into the format required by Chart.js
                const formattedData = {
                    labels: data.map(item => item.state_name),
                    datasets: [
                        {
                            label: 'Incarceration Rate',
                            data: data.map(item => item.incarceration_rate),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                };
                setChartData(formattedData);
            } catch (error) {
                console.error('Error fetching or processing data:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <div className="Chart">
                <Navigation />
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="Chart">
            <Navigation />
            <h1>US States Incarceration Data Visualization</h1>
            {chartData ? <UsStatesChart chartData={chartData} /> : <p>Loading chart...</p>}
        </div>
    );
}

export default Chart;
