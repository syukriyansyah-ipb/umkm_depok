'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from "next/image"
import { useRef, useEffect, useState } from 'react'

const promos = [
  {
    id: 1,
    title: "Sofa Premium 50% Off",
    description: "Dapatkan sofa premium dengan diskon spesial",
    image: "/images/promo.jpg",
    tag: "Flash Sale"
  },
  {
    id: 2,
    title: "New Sofa Scandinavian",
    description: "Koleksi sofa minimalis modern terbaru",
    image: "/images/promo.jpg",
    tag: "New Arrival"
  },
  {
    id: 3,
    title: "Bundle Sofa Set",
    description: "Hemat 2 juta untuk pembelian set lengkap",
    image: "/images/promo.jpg",
    tag: "Bundle"
  },
  {
    id: 4,
    title: "Year End Sale",
    description: "Diskon akhir tahun untuk semua koleksi sofa",
    image: "/images/promo.jpg",
    tag: "Special Offer"
  },
  {
    id: 5,
    title: "Custom Sofa Order",
    description: "Buat sofa sesuai keinginan dengan diskon 20%",
    image: "/images/promo.jpg",
    tag: "Custom Order"
  },
  {
    id: 6,
    title: "Sofa Bed Collection",
    description: "Koleksi sofa bed multifungsi dengan harga spesial",
    image: "/images/promo.jpg",
    tag: "Special Price"
  }
]

export default function Promo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
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
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Promo & Event</h1>
          <button className="text-red-500 hover:text-red-600">
            Lihat Semua <ArrowRight className="inline ml-1" size={16} />
          </button>
        </div>
        
        <div className="relative">
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            className="overflow-x-auto flex gap-4 pb-4 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing scroll-smooth"
          >
            {promos.map((promo) => (
              <motion.div
                key={promo.id}
                className="flex-none w-[65vw] md:w-[38vw] h-[200px] relative rounded-xl shadow-lg overflow-hidden snap-center select-none"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0">
                  <span className="absolute top-4 left-4 px-3 py-1 text-sm bg-white rounded-full">
                    {promo.tag}
                  </span>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/90 to-transparent">
                    <h3 className="font-bold text-base md:text-lg text-gray-800 mb-1 line-clamp-1">
                      {promo.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-2">
                      {promo.description}
                    </p>
                    <button className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-1.5 rounded-full text-xs md:text-sm w-fit transition-colors">
                      Lihat Detail
                    </button>
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
