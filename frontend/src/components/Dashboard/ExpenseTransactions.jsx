import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import { TransactionInfoCard } from '../index.js'

function ExpenseTransactions({transactions, onSeeMore}) {
  return (
    <div className='card'>
        <div className='flex items-center justify-between mb-4'>
            <h5 className='text-lg text-gray-800 dark:text-white'>Expenses</h5>

            <button 
            className='text-sm text-primary hover:underline hover:cursor-pointer flex items-center dark:text-white'
            onClick={onSeeMore}>
                See More <LuArrowRight className='inline-block ml-1 dark:text-white' />
            </button>
        </div>

        <div className="mt-6">
            {transactions?.slice(0, 5)?.map((expense) => (
                <TransactionInfoCard
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format("DD MMM YYYY")}
                amount={expense.amount}
                type="expense"
                hideDeleteBtn
                />
            ))}
        </div>

    </div>
  )
}

export default ExpenseTransactions;
