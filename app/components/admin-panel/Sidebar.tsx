"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

// Anggap role didapat dari props atau context/auth
export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Daftar menu, filter Users hanya untuk Superadmin
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "🏠" },
    { name: "Hero Section", path: "/admin/heros", icon: "🖼️" },
    { name: "Promo Section", path: "/admin/promotions", icon: "🎉" },
    { name: "Products Section", path: "/admin/products", icon: "🛍️" },
    { name: "Categories Section", path: "/admin/categories", icon: "📁" },
    { name: "Services Section", path: "/admin/services-section", icon: "🛠️" },
    { name: "About Section", path: "/admin/about", icon: "📄" },
    ...(role === "superadmin" ? [{ name: "Users", path: "/admin/users", icon: "👥" }] : []),
  ];

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
