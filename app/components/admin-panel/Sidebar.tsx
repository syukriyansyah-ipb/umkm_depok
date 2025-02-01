"use client"

import { useState, useEffect } from "react"
import { MdDashboard, MdEmojiEvents } from "react-icons/md"
import { GrTransaction } from "react-icons/gr"
import { IoMenu, IoImages } from "react-icons/io5"
import { RiShoppingCartLine } from "react-icons/ri"
import { BiSolidBuildingHouse } from "react-icons/bi";
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const menus = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    href: "/admin/dashboard",
  },
  {
    title: "Hero Section",
    icon: <IoImages />,
    href: "/admin/hero",
  },
  {
    title: "Promo & Event",
    icon: <MdEmojiEvents  />,
    href: "/admin/promo",
  },
  {
    title: "Products",
    icon: <RiShoppingCartLine />,
    href: "/admin/products",
  },
  {
    title: "About Section",
    icon: <BiSolidBuildingHouse />,
    href: "/admin/about",
  }
]

const Sidebar = () => {
  const pathName = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsOpen(window.innerWidth >= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 md:hidden text-2xl bg-white p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <IoMenu />
      </button>
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white w-[300px] min-h-screen p-6 shrink-0 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center justify-center mb-8">
          <Image src="/products/logoo.png" alt="logo" width={150} height={100} className="rounded-lg" />
        </div>

        <nav>
          <ul className="space-y-2">
            {menus.map((menu) => {
              const isActive = pathName === menu.href
              return (
                <li key={menu.title}>
                  <Link
                    href={menu.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <span className={`text-xl ${isActive ? "text-white" : "text-gray-400"}`}>{menu.icon}</span>
                    <span className="font-medium">{menu.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      {isOpen && isMobile && <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={toggleSidebar}></div>}
    </>
  )
}

export default Sidebar

