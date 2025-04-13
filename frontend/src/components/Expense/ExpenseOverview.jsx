import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../charts/CustomBarChart';
import moment from 'moment';

function ExpenseOverview({ transactions, onAddExpense }) {
  const [chartData, setChartData] = useState([]);

  const expenseBarChart = (data) => {
    if (!Array.isArray(data)) return [];

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedData.map((item) => ({
      month: moment(item?.date).format('MMM YYYY'),
      amount: item?.amount,
      category: item?.category,
    }));
  };

  useEffect(() => {
    const res = expenseBarChart(transactions.expenses);
    setChartData(res);
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-xl font-semibold text-gray-800">Expense Overview</h5>
          <p className="text-sm text-gray-500 mt-1">
            Track your earnings over time and analyze your expense categorys.
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={onAddExpense}
        >
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-8">
        <CustomBarChart data={chartData} xAxisKey="category" />
      </div>
    </div>
  );
}

export default ExpenseOverview;
