'use client'
import Sidebar from "@/app/components/admin-panel/Sidebar"
import Header from "@/app/components/admin-panel/Header"
import toast, { Toaster } from "react-hot-toast";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { redirect } from "next/navigation"
import { useSession } from 'next-auth/react';
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {data: session} = useSession();
  if (!session || !["admin", "superadmin"].includes(session.user.role as string)) {
    redirect("/unauthorized")
  }

  return (
    <Theme appearance="light" accentColor="iris">
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Toaster />
      {/* Sidebar */}
      <Sidebar role={session?.user?.role} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header username={session?.user?.name} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="max-w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
    </Theme>
  )
}

