import React from 'react';
import useTheme from '../context/theme';

export default function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const onChangeBtn = (e) => {
    const darkModeStatus = e.target.checked;
    darkModeStatus ? darkTheme() : lightTheme();
  };

  return (
    <label className='items-center cursor-pointer'>
      <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100 text-gray-700">
        <span className="text-sm font-medium flex-1 dark:text-white ">Toggle Theme</span>
        <div className="relative inline-block w-11 h-6">
          <input
            type="checkbox"
            checked={themeMode === 'dark'}
            onChange={onChangeBtn}
            className="peer sr-only"
          />
          <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-colors duration-300"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-100 peer-checked:translate-x-full"></div>
        </div>
      </div>
    </label>
  );
}