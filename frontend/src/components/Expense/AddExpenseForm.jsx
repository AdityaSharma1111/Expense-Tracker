import React, {useState} from 'react'
import Input from '../Input'
import {EmojiPickerModal} from '../index';

function AddExpenseForm({onAddExpense}) {
  const [expense, setExpense] = useState({
    category: "",
    amount: "", 
    date: "",
    icon: ""
  })

  const handleChange = (key, value) => setExpense({...expense, [key]: value});

  return (
    <div className='space-y-4'>

      <EmojiPickerModal
        icon = {expense.icon}
        onSelect = {(emoji) => handleChange("icon", emoji)}
      />
      {/* But emoji-picker-react gives an emoji object, not an event with target. */}

      <div className="space-y-2">
        <Input
          value={expense.category}
          onChange={({ target }) => handleChange("category", target.value)}
          label="Expense Category"
          placeholder="Food, Travel, etc."
          type="text"
        />

        <Input
          value={expense.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          label="Amount"
          placeholder=""
          type="number"
        />

        <Input
          value={expense.date}
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
          onClick={() => onAddExpense(expense)} // fixed parentheses for proper call
        >
            Add Expense
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm