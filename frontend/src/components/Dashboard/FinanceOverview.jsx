import React from 'react'
import {CustomPieChart} from '../index.js'

const COLORS = ["#4f46e5", "#10b981", "#ef4444"];

function FinanceOverview({totalBalance, totalIncome, totalExpense}) {
    const data = [
        { name: 'Total Balance', value: totalBalance},
        { name: 'Total Income', value: totalIncome},
        { name: 'Total Expense', value: totalExpense}
    ];

    return (
        <div className='bg-white dark:bg-gray-800 p-5 rounded-xl shadow mt-4'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg text-gray-800 dark:text-white'>Financial Overview</h5>
            </div>

            <CustomPieChart
                data={data}
                label="Total Balance"
                totalAmt = {`₹${totalBalance}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
  )
}

export default FinanceOverview;
