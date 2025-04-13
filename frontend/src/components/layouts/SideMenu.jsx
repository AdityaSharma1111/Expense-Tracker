import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/SideMenuData';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.jsx';
import { CharAvatar } from '../index.js';
import ThemeBtn from '../ThemeBtn.jsx';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };

  const handleMenuClick = (path) => {
    if (path === "/logout") {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 shadow-lg flex flex-col items-center py-6">
      <div className="mb-8 flex flex-col items-center">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="Profile pic"
            className="w-20 h-20 rounded-full object-cover mb-2"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName || ""}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
          {user?.fullName}
        </h4>
      </div>

      <div className="w-full px-4">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={index}
            onClick={() => handleMenuClick(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left 
              ${activeMenu === item.label
                ? 'bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-400'
                : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-white'
              }`}
          >
            <item.icon className="text-xl" />
            <span>{item.label}</span>
          </button>
        ))}
        <ThemeBtn />
      </div>
    </div>
  );
};

export default SideMenu;
