import Sidebar from "@/app/components/admin-panel/Sidebar"
import Header from "@/app/components/admin-panel/Header"
import toast, { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Toaster />
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header username="John Doe" />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="max-w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

