import React, { useState, useEffect } from 'react';
import CustomBarChart from '../charts/CustomBarChart';

function Last60daysIncome({ data }) {
    const [chartData, setChartData] = useState([]);

    const incomeBarChart = (dataItem) => {
        if (!Array.isArray(dataItem)) return [];
        
        return dataItem.map((item) => ({
            source: item?.source,
            amount: item?.amount,
        }));
    };

    useEffect(() => {
        const res = incomeBarChart(data.transactions);
        setChartData(res);
    }, [data]);

    return (
        <div className='bg-white dark:bg-gray-800 p-5 rounded-xl shadow'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg text-gray-800 dark:text-white'>Last 60 days income transactions</h5>
            </div>

            <CustomBarChart 
                data={chartData}
                xAxisKey="source" 
            />
        </div>
    );
}

export default Last60daysIncome;
