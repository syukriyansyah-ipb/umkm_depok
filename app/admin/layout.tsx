// /app/admin/layout.tsx
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  
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

export default AdminLayout;
