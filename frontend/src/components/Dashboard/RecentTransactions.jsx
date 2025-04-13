import React from 'react'
import { IoMdDocument } from 'react-icons/io'
import { LuArrowRight } from 'react-icons/lu'
import { TransactionInfoCard } from '../index.js'
import moment from 'moment'

function RecentTransactions({ transactions, onSeeMore }) {
  return (
    <div className='bg-white dark:bg-gray-800 p-5 rounded-xl shadow'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-lg font-semibold text-gray-800 dark:text-white'>Recent Transactions</h5>
        <button
          className='text-sm text-primary hover:underline hover:cursor-pointer flex items-center dark:text-white'
          onClick={onSeeMore}
        >
          See More <LuArrowRight className='inline-block ml-1 dark:text-white' />
        </button>
      </div>

      <div className='mt-2'>
        {transactions?.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === 'income' ? item.source : item.category}
            icon={item.icon}
            date={moment(item.date).format('DD MMM YYYY')}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default RecentTransactions;
