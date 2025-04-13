import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import { TransactionInfoCard } from '../index.js';

function IncomeTransactions({ transactions, onSeeMore }) {
  return (
    <div className='card bg-white dark:bg-gray-800'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-lg text-gray-800 dark:text-white'>Incomes</h5>

        <button 
          className='text-sm text-primary hover:underline hover:cursor-pointer flex items-center dark:text-white'
          onClick={onSeeMore}>
          See More <LuArrowRight className='inline-block ml-1 dark:text-white' />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("DD MMM YYYY")}
            amount={income.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
}

export default IncomeTransactions;
