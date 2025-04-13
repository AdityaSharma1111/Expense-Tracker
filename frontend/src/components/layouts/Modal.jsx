import React from 'react'

function Modal({ children, isOpen, onClose, title }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {title}
          </h3>

          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 text-lg font-bold"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="text-gray-700">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
