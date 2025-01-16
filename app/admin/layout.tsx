'use client'
import { ReactNode } from 'react';
// import { useRouter } from "next/navigation";

export default function AdminLayout ({ children }: { children: ReactNode }) {
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row">
        {/* Sidebar atau menu admin bisa ditambahkan di sini */}
        <aside className="w-64 bg-gray-200">
          {/* Menu Admin */}
        </aside>
        <main className="flex-grow p-8">{children}</main>
      </div>
    </div>
  );
};

