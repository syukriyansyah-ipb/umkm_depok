import DashboardComponent from '@/app/components/admin-panel/Dashboard';
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || !["admin", "superadmin"].includes(session.user.role as string)) {
    redirect("/unauthorized")
  }

  return (
    <div>
       <DashboardComponent />
    </div>
  )
}








