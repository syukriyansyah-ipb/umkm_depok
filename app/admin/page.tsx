'use client'
import DashboardComponent from '@/app/components/admin-panel/Dashboard';
import { redirect } from "next/navigation"
import { useSession } from 'next-auth/react';

export default function AdminDashboard() {
  const {data: session} = useSession();

  if (!session || !["admin", "superadmin"].includes(session.user.role as string)) {
    redirect("/unauthorized")
  }

  return (
    <div>
       <DashboardComponent />
    </div>
  )
}








