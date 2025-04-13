import React from 'react'
import { LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from 'react-icons/lu'

function TransactionInfoCard({
    title,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn = false,
    onDelete
}) {
  return (
    <div className='flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm mb-3'>
      <div className='flex items-center gap-4'>
        {icon ? (
          <img src={icon} alt={title} className='w-10 h-10 rounded-full object-cover' />
        ) : (
          <LuUtensils className='text-xl text-gray-600 dark:text-gray-300' />
        )}
        <div>
          <p className='text-sm font-medium text-gray-800 dark:text-white'>{title}</p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>{date}</p>
        </div>
      </div>
      
      <div className='flex items-center gap-2'>
        {!hideDeleteBtn && (
          <button onClick={onDelete} className='text-gray-500 hover:text-red-600 dark:hover:text-red-500'>
            <LuTrash2 size={18} />
          </button>
        )}
        <div className='flex flex-col items-end text-sm font-medium'>
          <span className={`${type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {type === 'income' ? '+' : '-'} ₹{amount}
          </span>
          {type === 'income' ? (
            <LuTrendingUp className='text-green-500 dark:text-green-400' />
          ) : (
            <LuTrendingDown className='text-red-500 dark:text-red-400' />
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard
