import React from 'react'

function InfoCard({icon, label, value, color}) {
  return (
    <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center gap-4'>
      <div className={`text-white p-3 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <h6 className='text-sm text-gray-500 dark:text-gray-400'>{label}</h6>
        <span className='text-xl font-semibold text-gray-800 dark:text-white'>₹{value}</span>
      </div>
    </div>
  )
}

export default InfoCard;
