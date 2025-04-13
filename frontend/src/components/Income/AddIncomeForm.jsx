import React, {useState} from 'react'
import Input from '../Input'
import {EmojiPickerModal} from '../index';

function AddIncomeForm({onAddIncome}) {
  const [income, setIncome] = useState({
    source: "",
    amount: "", 
    date: "",
    icon: ""
  })

  const handleChange = (key, value) => setIncome({...income, [key]: value});

  return (
    <div className='space-y-4'>

      <EmojiPickerModal
        icon = {income.icon}
        onSelect = {(emoji) => handleChange("icon", emoji)}
      />
      {/* But emoji-picker-react gives an emoji object, not an event with target. */}

      <div className="space-y-2">
        <Input
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          label="Income Source"
          placeholder="Freelance, Salary, etc."
          type="text"
        />

        <Input
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          label="Amount"
          placeholder=""
          type="number"
        />

        <Input
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          label="Date"
          placeholder=""
          type="date"
        />
      </div>

      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
          onClick={() => onAddIncome(income)} // fixed parentheses for proper call
        >
            Add Income
        </button>
      </div>
    </div>
  )
}

export default AddIncomeForm