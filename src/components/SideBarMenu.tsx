
"use client"
import React, { useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { GoFileDirectory, GoFile } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { VscPieChart } from "react-icons/vsc";
import Link from "next/link";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="bg-white p-3 rounded-lg shadow-md text-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`mb-[4rem] transition-all duration-300 ease-in-out ${isHovered ? "ml-2" : ""}`}
      >
        <AiFillAlert
          size={isHovered ? 55 : 33}
          color="#000000"
        />
      </div>

      {[
        { href: "/dashboard", label: "Dashboard", icon: <FiUsers size={22} color="#4B5563" /> },
        { href: "/directories", label: "Directories", icon: <GoFileDirectory size={22} color="#4B5563" /> },
        { href: "/calendar", label: "Calendar", icon: <CiCalendar size={22} color="#4B5563" /> },
        { href: "/files", label: "Files", icon: <GoFile size={22} color="#4B5563" /> },
        { href: "/charts", label: "Charts", icon: <VscPieChart size={22} color="#4B5563" /> },
      ].map((item, index) => (
        <div
          key={index}
          className={`relative flex items-center mt-5 w-10 transition-all duration-300 ease-in-out ${isHovered ? "w-32" : ""
            }`}
        >
          <Link href={item.href} className="flex items-center">
            <div className="p-1 transition-transform transform">
              {item.icon}
            </div>
            <span
              className={`absolute left-10 text-gray-600 whitespace-nowrap transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                }`}
            >
              {item.label}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Sidebar;








