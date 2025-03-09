import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineFileText,
  AiOutlineLogout,
} from "react-icons/ai";
import { FiBriefcase, FiList } from "react-icons/fi";

const AdminMenu = () => {
  const location = useLocation(); // Get current path

  const menuItems = [
    { icon: <AiOutlineDashboard size={20} />, label: "Players", path: "/admin/players" },
    { icon: <AiOutlineFileText size={20} />, label: "Player Stats", path: "/admin/playerStats" },
    { icon: <FiList size={20} />, label: "Tournement Summary", path: "/admin/summary" },
  ];

  const footerItems = [
    { icon: <AiOutlineLogout size={20} />, label: "Log Out", path: "/logout" },
  ];

  return (
    <div className="h-screen flex flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-green-700 font-bold text-xl text-left">Spirit 11</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {menuItems.map((item) => (
          <NavItem key={item.label} icon={item.icon} label={item.label} path={item.path} active={location.pathname === item.path} />
        ))}
      </nav>

      {/* Footer Menu (Pushed to Bottom) */}
      <div className="py-4 space-y-1">
        {footerItems.map((item) => (
          <NavItem key={item.label} icon={item.icon} label={item.label} path={item.path} active={location.pathname === item.path} />
        ))}
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, path, active }) => {
  return (
    <Link to={path} className={`flex items-center px-4 py-2 w-full text-left transition-colors duration-150 ${active ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
      <div className="flex items-center">{icon}</div>
      <span className="ml-3 text-sm font-medium">{label}</span>
    </Link>
  );
};

export default AdminMenu;
