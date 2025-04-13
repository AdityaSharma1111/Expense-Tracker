import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../charts/CustomBarChart';
import moment from 'moment';

function IncomeOverview({ transactions, onAddIncome }) {
  const [chartData, setChartData] = useState([]);

  const incomeBarChart = (data) => {
    if (!Array.isArray(data)) return [];

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedData.map((item) => ({
      month: moment(item?.date).format('MMM YYYY'),
      amount: item?.amount,
      source: item?.source,
    }));
  };

  useEffect(() => {
    const res = incomeBarChart(transactions.incomes);
    setChartData(res);
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-xl font-semibold text-gray-800">Income Overview</h5>
          <p className="text-sm text-gray-500 mt-1">
            Track your earnings over time and analyze your income sources.
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={onAddIncome}
        >
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-8">
        <CustomBarChart data={chartData} xAxisKey="source" />
      </div>
    </div>
  );
}

export default IncomeOverview;
