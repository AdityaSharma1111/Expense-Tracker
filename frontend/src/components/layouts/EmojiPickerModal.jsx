import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from 'react-icons/lu';

function EmojiPickerModal({ icon, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
        <div
          className='flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded transition'
          onClick={() => setIsOpen(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-200 rounded-full overflow-hidden">
            {icon ? (
              <img src={icon} alt='icon' className='w-full h-full object-cover' />
            ) : (
              <LuImage className='text-gray-600' />
            )}
          </div>
          <p className="text-sm text-gray-700 font-medium">
            {icon ? "Change Icon" : "Pick Icon"}
          </p>
        </div>

        {/* Emoji picker modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="relative w-fit">
              {/* Close button above emoji picker */}
              <button
                className="absolute -top-4 -right-4 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-black z-50"
                onClick={() => setIsOpen(false)}
              >
                <LuX className='w-5 h-5' />
              </button>

              {/* Emoji Picker container */}
              <div className="bg-white p-2 rounded-lg shadow-lg z-40">
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    onSelect(emoji?.imageUrl || "");
                    setIsOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmojiPickerModal;
