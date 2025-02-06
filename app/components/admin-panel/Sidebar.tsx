// components/admin-panel/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: "🏠" },
  { name: "Hero Section", path: "/admin/hero", icon: "🖼️" },
  { name: "Events & Promo Section", path: "/admin/events", icon: "🎉" },
  { name: "Products Section", path: "/admin/products", icon: "🛍️" },
  { name: "About Section", path: "/admin/about", icon: "📄" },
  { name: "Users", path: "/admin/users", icon: "👥" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg md:hidden"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col p-4 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative z-40`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-2 rounded transition-all duration-200 ${
                pathname === item.path
                  ? "bg-gray-700"
                  : "hover:bg-gray-700 hover:translate-x-2"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}