import React from 'react'

function DeleteAlert({content, onDelete}) {
  return (
    <div>
        <p className="text-sm ">{content}</p>

        <div className="flex justify-end mt-6">
            <button
            type="button"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={onDelete}
            >
            Delete
            </button>
        </div>
    </div>

  )
}

export default DeleteAlert