import React from 'react';
import ChartSwitcher from './ChartSwitcher';

const AllCharts = ({ chartData }) => (
    <div className="p-4">
        <ChartSwitcher chartData={chartData} />
    </div>
);

export default AllCharts;
