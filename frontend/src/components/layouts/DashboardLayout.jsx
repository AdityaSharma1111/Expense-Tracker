import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

function DashboardLayout({ children, activeMenu }) {
  const { user } = useContext(UserContext);

  // if(user === null) return;

  const [open, setOpen] = useState(true); // Sidebar is visible initially

  // Function to toggle the sidebar visibility
  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <div>
      {/* Pass open state and toggleMenu function to Navbar */}
      <Navbar activeMenu={activeMenu} open={open} toggleMenu={toggleMenu} />

      {user && (
        <div className="flex">
          {open && (
            <div className="w-64">
              {/* Sidebar Menu */}
              <SideMenu activeMenu={activeMenu} />
            </div>
          )}

          {/* Main Content */}
          <div className="grow mx-5">{children}</div>
        </div>
      )}
      
      {/* {!user && (
      <div className="p-4 text-center">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login"; // Hard redirect to refresh everything
          }}
          className="text-sm bg-red-500 text-white px-4 py-2 rounded"
        >
          Force Logout
        </button>
      </div>
    )} */}
    </div>
  );
}

export default DashboardLayout;
