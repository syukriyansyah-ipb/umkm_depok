'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { sliderData } from '@/lib/sliderData'
import { motion, AnimatePresence } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="relative w-full h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex flex-col md:flex-row overflow-hidden">
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative z-10">
                <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start p-4 md:p-8 lg:p-12">
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.h1 
                        key={`title-${index}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-2 md:mb-4 text-center md:text-left leading-tight"
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
                          {slide.title}
                        </span>
                      </motion.h1>
                    )}
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.p 
                        key={`desc-${index}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-4 md:mb-8 max-w-md text-center md:text-left leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.div
                        key={`social-${index}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
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
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      key={`bg-${index}`}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute bottom-0 right-0 w-full h-full md:w-3/4 md:h-3/4"
                    >
                      <Image
                        src={slide.backgroundImage || "/placeholder.svg"}
                        alt={slide.title}
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      key={`image-${index}`}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="relative w-3/4 h-3/4 md:w-4/5 md:h-4/5">
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt={`Image for ${slide.title}`}
                          layout="fill"
                          objectFit="contain"
                          priority
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

