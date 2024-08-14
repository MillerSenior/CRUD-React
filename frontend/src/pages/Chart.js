import React, { useEffect, useState } from 'react';
import UsStatesBarChart from '../components/UsStatesBarChart';
import UsStatesLineChart from '../components/UsStatesLineChart';
import UsStatesPieChart from '../components/UsStatesPieChart';
import UsStatesDoughnutChart from '../components/UsStatesDoughnutChart';
import Navigation from '../components/NavBar';
import axios from 'axios';
import { API_HOST } from "../config";
import AllCharts from "../components/AllCharts";
import Container from "../components/Container";
import StateDropdown from "../components/StateDropdown";
import StateDataGraph from "../components/StateDataGraph";

function Chart() {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedState, setSelectedState] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_HOST + '/api/us-states', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data;

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
                setError(error.message);
                console.log("something went wrong");
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
        <Container>
            <div className="Chart">
                <Navigation/>
                <h1 className="text-center text-2xl font-bold mb-4">US States Incarceration Data Visualization</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="card bg-base-100 shadow-xl border-2 border-gray-700 border-opacity-50 p-4">
                        <h2 className="text-lg font-semibold mb-2 text-center">All Charts</h2>
                        {chartData ? <AllCharts chartData={chartData}/> : <p>Loading charts...</p>}
                    </div>
                    <div className="card bg-base-100 shadow-xl border-2 border-gray-700 border-opacity-50 p-4">
                        <h2 className="text-lg font-semibold mb-2 text-center">Bar Chart</h2>
                        {chartData ? <UsStatesBarChart chartData={chartData}/> : <p>Loading chart...</p>}
                    </div>
                    <div className="card bg-base-100 shadow-xl border-2 border-gray-700 border-opacity-50 p-4">
                        <h2 className="text-lg font-semibold mb-2 text-center">Line Chart</h2>
                        {chartData ? <UsStatesLineChart chartData={chartData}/> : <p>Loading chart...</p>}
                    </div>
                    <div className="card bg-base-100 shadow-xl border-2 border-gray-700 border-opacity-50 p-4">
                        <h2 className="text-lg font-semibold mb-2 text-center">Pie Chart</h2>
                        {chartData ? <UsStatesPieChart chartData={chartData}/> : <p>Loading chart...</p>}
                    </div>
                    <div className="card bg-base-100 shadow-xl border-2 border-gray-700 border-opacity-50 p-4">
                        <h2 className="text-lg font-semibold mb-2 text-center">Doughnut Chart</h2>
                        {chartData ? <UsStatesDoughnutChart chartData={chartData}/> : <p>Loading chart...</p>}
                    </div>
                    <div className="card bg-base-100 shadow-xl border-2 border-gray-700 border-opacity-50 p-4">
                        <h2 className="text-lg font-semibold mb-2 text-center">State Data Visualization</h2>
                        <StateDropdown onSelect={setSelectedState}/>
                        {selectedState && <StateDataGraph stateName={selectedState}/>}
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Chart;
