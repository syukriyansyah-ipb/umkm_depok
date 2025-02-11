"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

interface HeaderProps {
  username: string;
}

export default function Header({ username }: HeaderProps) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: "/login" }); // Redirect ke login setelah logout
    } catch (error) {
      console.error("Logout failed:", error);
      setLoading(false);
    }
  };

  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-10 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800"></h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">{username}</span>
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`px-3 py-1 rounded transition-colors duration-200 flex items-center ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          {loading ? "Logging out..." : <span className="hidden sm:inline mr-2">Logout</span>}
          <FaSignOutAlt className="sm:ml-0" />
        </button>
      </div>
    </header>
  );
}
