import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

function ExpenseList({ transactions, onDelete, onDownload }) {
  return (
    <div className='mt-8'>
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Expense Category</h5>
        <button
          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition duration-200"
          onClick={onDownload}
        >
          <LuDownload className="text-xl" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions.expenses?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("DD MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default ExpenseList
