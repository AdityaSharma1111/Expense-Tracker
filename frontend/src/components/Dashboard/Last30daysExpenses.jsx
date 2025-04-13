import React, { useState, useEffect } from 'react';
import CustomBarChart from '../charts/CustomBarChart';

function Last30daysExpenses({ data }) {
  const [chartData, setChartData] = useState([]);

  const expenseBarChart = (dataItem) => {
    if (!Array.isArray(dataItem)) return [];

    return dataItem.map((item) => ({
      category: item?.category,
      amount: item?.amount,
    }));
  };

  useEffect(() => {
    // console.log("Data in Last30daysExpenses: ", data);
    
    const res = expenseBarChart(data.transactions);
    // console.log(res);
    
    setChartData(res);
  }, [data]);

  return (
    <div className='bg-white dark:bg-gray-800 p-5 rounded-xl shadow'>
      <div>
        <h5 className="text-lg text-gray-800 dark:text-white">Last 30 days Expenses</h5>
      </div>

      <CustomBarChart 
        data={chartData}
        xAxisKey="category"
      />
    </div>
  );
}

export default Last30daysExpenses;
