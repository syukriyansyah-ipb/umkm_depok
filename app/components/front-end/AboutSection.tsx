"use client"

import { useState, useEffect } from "react"
import { Facebook, Instagram, ShoppingBag, TwitterIcon as TikTok, Phone, Mail } from "lucide-react"
import { FaTiktok } from "react-icons/fa"
import { SiTiktok, SiShopee } from "react-icons/si"

import { motion } from "framer-motion"

interface AboutData {
  name: string
  address: string
  mapUrl: string
  description: string
  phoneNumber: string
  email: string
  socialMedia: {
    facebook?: string
    instagram?: string
    tokopedia?: string
    tiktok?: string
    shopee?: string
  }
}

export default function AboutSection() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Error fetching UMKM data:", err))
  }, [])

  if (!aboutData) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 p-5">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-blue-900"
        >
          Tentang Kami
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-semibold mb-6 text-blue-800">{aboutData.name}</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">{aboutData.description}</p>
            <p className="text-gray-700">
              <strong className="text-blue-800">Alamat:</strong> {aboutData.address}
            </p>
            <div className="text-gray-700 mb-6">
                <Phone className="inline-block mr-2 text-blue-600" size={20} /> {aboutData.phoneNumber} | <Mail className="inline-block text-blue-600 hover:text-blue-800 transition-colors duration-300" /> {aboutData.email}
            </div>
            <div className="flex space-x-6 mb-6 ">
              {aboutData.socialMedia.facebook && (
                <a href={aboutData.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook className="text-blue-600 hover:text-blue-800 transition-colors duration-300" size={28} />
                </a>
              )}
              {aboutData.socialMedia.instagram && (
                <a href={aboutData.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="text-pink-600 hover:text-pink-800 transition-colors duration-300" size={28} />
                </a>
              )}
              {aboutData.socialMedia.tiktok && (
                <a href={aboutData.socialMedia.tiktok} target="_blank" rel="noopener noreferrer">
                  <FaTiktok className="text-black hover:text-gray-800 transition-colors duration-300" size={28} />
                </a>
              )}
              {aboutData.socialMedia.shopee && (
                <a href={aboutData.socialMedia.shopee} target="_blank" rel="noopener noreferrer">
                  <SiShopee className="text-orange-600 hover:text-orange-800 transition-colors duration-300" size={28} />
                </a>
              )}
              {aboutData.socialMedia.tokopedia && (
                <a href={aboutData.socialMedia.tokopedia} target="_blank" rel="noopener noreferrer">
                  <ShoppingBag className="text-green-600 hover:text-green-800 transition-colors duration-300" size={28} />
                </a>
              )}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-0 pb-[56.25%]"
          >
            <iframe
              src={aboutData.mapUrl}
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  )
}