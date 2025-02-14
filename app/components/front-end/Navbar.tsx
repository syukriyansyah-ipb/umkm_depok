'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface AboutData {
  name: string
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [aboutData, setAboutData] = useState<AboutData | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Error fetching UMKM data:", err))
  }, [])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <button onClick={() => scrollToSection('hero')} className="text-2xl font-bold text-gray-800 md:ml-3">
            {aboutData ? aboutData.name : "Loading..."}
          </button>
          <div className="hidden md:flex space-x-4">
            <NavLink onClick={() => scrollToSection('hero')}>Beranda</NavLink>
            <NavLink onClick={() => scrollToSection('promo')}>Promo</NavLink>
            <NavLink onClick={() => scrollToSection('products')}>Produk</NavLink>
            <NavLink onClick={() => scrollToSection('service')}>Layanan</NavLink>
            <NavLink onClick={() => scrollToSection('about')}>Tentang Kami</NavLink>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <NavLink onClick={() => scrollToSection('hero')} mobile>Beranda</NavLink>
            <NavLink onClick={() => scrollToSection('promo')} mobile>Promo</NavLink>
            <NavLink onClick={() => scrollToSection('products')} mobile>Produk</NavLink>
            <NavLink onClick={() => scrollToSection('about')} mobile>Tentang Kami</NavLink>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({ children, onClick, mobile = false }: { children: React.ReactNode; onClick: () => void; mobile?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`text-gray-800 hover:text-gray-600 transition-colors duration-300 ${
        mobile ? 'block py-2' : ''
      }`}
    >
      {children}
    </button>
  )
}
