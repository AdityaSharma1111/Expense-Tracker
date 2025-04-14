import React from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import AISummary from '../AISummary';

const Navbar = ({ activeMenu, open, toggleMenu }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      {/* Toggle Button for Sidebar */}
      <button
        className="text-2xl text-white hover:text-gray-400 focus:outline-none"
        onClick={toggleMenu} // Call toggleMenu on button click
      >
        {/* Conditionally render icons based on the open state */}
        {open ? (
          <HiOutlineX className="w-6 h-6" />
        ) : (
          <HiOutlineMenu className="w-6 h-6" />
        )}
      </button>
      <AISummary />
      <h2 className="text-xl font-bold">Expense Trackerrrrr</h2>
    </div>
  );
};

export default Navbar;
