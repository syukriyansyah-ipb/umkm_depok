'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import { useRef, useState, useEffect } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { sliderData } from '@/lib/sliderData'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  // const containerRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[700px]">
      <div className="container mx-auto h-full">
        <div className="flex h-full">
          {/* Left side with white background */}
          <div className="w-1/3 bg-white p-12 flex flex-col justify-center relative z-10">
            <div className="space-y-6">
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold text-gray-800"
              >
                {sliderData[currentSlide].title}
              </motion.h1>

              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-600 text-lg"
              >
                {sliderData[currentSlide].description}
              </motion.p>

              <motion.div
                key={`social-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex space-x-4"
              >
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors duration-300">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors duration-300">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors duration-300">
                  <Linkedin size={24} />
                </a>
              </motion.div>

              <motion.button
                key={`button-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
              >
                Lihat Koleksi
              </motion.button>
            </div>
          </div>

          {/* Right side with image carousel */}
          <div className="flex-1 relative overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute bottom-0 right-0 w-[75%] h-[85%]">
              <motion.div
                key={`bg-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Image
                  src={sliderData[currentSlide].backgroundImage}
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>

            {/* Product Image */}
            <motion.div
              key={`product-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-[80%] h-[80%]">
                <Image
                  src={sliderData[currentSlide].image}
                  alt={sliderData[currentSlide].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Navigation buttons */}
            <div className="absolute bottom-8 right-8 flex space-x-4 z-20">
              <button
                onClick={prevSlide}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-8 left-8 flex space-x-2 z-20">
              {sliderData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index 
                      ? 'bg-white w-6' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

