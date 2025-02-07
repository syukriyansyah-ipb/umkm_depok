'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from "next/image"
import { format } from 'date-fns'
import { useRef, useEffect, useState } from 'react'
import { FaFacebook, FaInstagram, FaShopify, FaTiktok } from 'react-icons/fa' // Import ikon media sosial

interface Promotion {
  _id: string
  title: string
  description: string
  startDate: string
  endDate: string
  imageUrl: string
  discount: number
  active: boolean
}

export default function Promo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const [promotions, setPromotions] = useState<Promotion[]>([])

  const fetchPromotions = async () => {
    try {
      const response = await fetch('/api/promotions')
      const data = await response.json()
      setPromotions(data)
    } catch (error) {
      console.error('Failed to fetch promotions:', error)
    }
  }

  useEffect(() => {
    setIsMounted(true)
    fetchPromotions()
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    const ele = containerRef.current
    if (!ele) return

    const startPos = {
      left: ele.scrollLeft,
      x: e.clientX,
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startPos.x
      ele.scrollLeft = startPos.left - dx
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  if (!isMounted) {
    return <div className="h-[300px]" /> // placeholder saat loading
  }

  return (
    <section className="py-8 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 pt-5 text-blue-900"
        >
          Promo
        </motion.h2>
        
        <div className="relative">
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            className="overflow-x-auto flex gap-4 pb-4 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing scroll-smooth"
          >
            {promotions.map((promo) => (
              <motion.div
                key={promo._id}
                className="flex-none w-[65vw] md:w-[38vw] h-[200px] relative rounded-xl shadow-lg overflow-hidden snap-center select-none bg-gradient-to-br from-purple-500 to-indigo-500"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={promo.imageUrl}
                  alt={promo.title}
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0">
                  {/* Tag Diskon */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-sm bg-yellow-400 text-gray-900 rounded-full font-semibold">
                    {promo.discount}% Off
                  </span>

                  {/* Tanggal Promo */}
                  <div className="absolute top-4 right-4 px-3 py-1 text-sm bg-white text-gray-800 rounded-full font-medium">
                    {format(new Date(promo.startDate), 'dd MMM')} - {format(new Date(promo.endDate), 'dd MMM')}
                  </div>
                  
                  {/* Konten Bawah */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <h3 className="font-bold text-lg text-white mb-1 line-clamp-1">
                      {promo.title}
                    </h3>
                    <p className="text-sm text-gray-200 mb-2 line-clamp-2">
                      {promo.description}
                    </p>
                    <div className="flex space-x-2">
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
                        <FaFacebook size={20} />
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors">
                        <FaInstagram size={20} />
                      </a>
                      <a href="https://shopee.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-colors">
                        <FaShopify size={20} />
                      </a>
                      <a href="https://tokopedia.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors">
                        <FaTiktok size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}