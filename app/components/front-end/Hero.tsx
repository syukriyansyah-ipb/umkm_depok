'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import { useState, useEffect } from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaStore } from 'react-icons/fa'
import { SiShopee } from "react-icons/si"
import axios from "axios"

interface HeroData {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  backgroundImageUrl: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    tiktok: string;
    tokopedia: string;
    shopee: string;
  };
  active: boolean;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heros, setHeros] = useState<HeroData[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("/api/heros")
      .then((res) => {
        const activeHeros = res.data.filter((item: HeroData) => item.active)
        setHeros(activeHeros)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!heros || heros.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heros.length)
    }, 5000);

    return () => clearInterval(interval);
  }, [heros]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!heros || heros.length === 0) {
    return <div className="flex justify-center items-center h-screen">No data available</div>
  }

  const currentHero = heros[currentSlide]

  return (
    <section className="relative h-[700px]">
      <div className="container mx-auto h-full">
        <div className="flex h-full flex-col md:flex-row">
          
          {/* Left Content */}
          <div className="w-full md:w-1/3 bg-white p-12 flex flex-col justify-center items-center relative z-10">
            <div className="space-y-6 text-center mt-8">
              
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold text-gray-800"
              >
                {currentHero.title}
              </motion.h1>

              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-600 text-lg"
              >
                {currentHero.description}
              </motion.p>

              {/* Social Media Links */}
              <motion.div
                key={`social-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex space-x-4 justify-center"
              >
                {currentHero?.socialLinks?.facebook && (
                  <a href={currentHero.socialLinks.facebook || "#"} className="text-blue-600 hover:text-blue-800">
                    <FaFacebook size={24} />
                  </a>
                )}
                {currentHero?.socialLinks?.tiktok && (
                  <a href={currentHero.socialLinks.tiktok || "#"} className="text-zinc-700 hover:text-black">
                    <FaTiktok size={24} />
                  </a>
                )}
                {currentHero?.socialLinks?.instagram && (
                  <a href={currentHero.socialLinks.instagram || "#"} className="text-pink-600 hover:text-pink-800">
                    <FaInstagram size={24} />
                  </a>
                )}
                {currentHero?.socialLinks?.shopee && (
                  <a href={currentHero.socialLinks.shopee || "#"} className="text-orange-700 hover:text-orange-900">
                    <SiShopee size={24} />
                  </a>
                )}
                {currentHero?.socialLinks?.tokopedia && (
                  <a href={currentHero.socialLinks.tokopedia || "#"} className="text-green-700 hover:text-green-900">
                    <FaStore size={24} />
                  </a>
                )}
              </motion.div>

            </div>
          </div>

          {/* Right Content (Image) */}
          <div className="flex-1 relative overflow-hidden w-full bg-white">
            
            {/* Background Image */}
            <div className="absolute bottom-0 right-0 w-[75%] h-[85%]">
              <motion.div
                key={`bg-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                {currentHero.backgroundImageUrl && (
                  <Image
                    src={currentHero.backgroundImageUrl}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </motion.div>
            </div>

            {/* Product Image */}
            <motion.div
              key={`hero-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {currentHero.imageUrl && (
                <div className="relative w-[80%] h-[80%]">
                  <Image
                    src={currentHero.imageUrl}
                    alt={currentHero.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-8 right-8 flex space-x-4 z-20">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + heros.length) % heros.length)}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
              >
                <ChevronLeft className="w-6 h-6 text-zinc-600 hover:text-zinc-800" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heros.length)}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
              >
                <ChevronRight className="w-6 h-6 text-zinc-600 hover:text-zinc-800" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-8 flex space-x-2 z-20">
              {heros.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80'
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
