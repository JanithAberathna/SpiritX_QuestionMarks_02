import React from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";



const User = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar and Content Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar (Not Fixed) */}
        <div className="w-64 bg-white border-r border-gray-300">
           <UserMenu/>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default User;
