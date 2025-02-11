'use client'
import { motion } from 'framer-motion'
import Image from "next/image"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="flex flex-col items-center space-y-4"
      >
        {/* Logo atau Nama Brand */}
        <div className="relative w-24 h-24">
          <Image
            src="/logo.png" // Ganti dengan path logo Anda
            alt="Brand Logo"
            fill
            className="object-contain"
          />
        </div>

        {/* Teks Loading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl font-semibold text-gray-700"
        >
          Loading...
        </motion.p>

        {/* Animasi Loading */}
        <motion.div
          className="w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  )
}