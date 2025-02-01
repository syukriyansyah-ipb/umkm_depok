"use client"
import { useAppSelector } from "@/redux/hooks"
import { useSession } from "next-auth/react"
import type React from "react"
import Login from "../components/admin-panel/Login"
import Loader from "../components/admin-panel/Loader"
import Sidebar from "../components/admin-panel/Sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useAppSelector((store) => store.loading)
  const { data: session } = useSession()

  if (!session?.user) {
    return <Login />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden w-screen">
        <main className="flex-1 overflow-y-auto bg-gray-200 p-4">
          <div className="h-full flex flex-col">{children}</div>
        </main>
      </div>
      {isLoading && <Loader />}
    </div>
  )
}

export default Layout

