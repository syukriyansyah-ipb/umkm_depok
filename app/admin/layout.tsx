'use client'
import { ReactNode } from 'react';
import { useRouter } from "next/navigation";
import Header from '../../components/Header';

export default function AdminLayout ({ children }: { children: ReactNode }) {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
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

