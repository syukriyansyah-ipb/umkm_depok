'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Logo
          </Link>
          <div className="hidden md:flex space-x-4">
            <NavLink href="/">Beranda</NavLink>
            <NavLink href="/products">Produk</NavLink>
            <NavLink href="/about">Tentang Kami</NavLink>
            <NavLink href="/contact">Kontak</NavLink>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
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
            <NavLink href="/" mobile>Beranda</NavLink>
            <NavLink href="/products" mobile>Produk</NavLink>
            <NavLink href="/about" mobile>Tentang Kami</NavLink>
            <NavLink href="/contact" mobile>Kontak</NavLink>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({ href, children, mobile = false }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`text-gray-800 hover:text-gray-600 transition-colors duration-300 ${
        mobile ? 'block py-2' : ''
      }`}
    >
      {children}
    </Link>
  )
}

