'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from "next/image";

export default function Promo() {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-600 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 md:mb-0 md:mr-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Penawaran Spesial!
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Dapatkan diskon 20% untuk semua produk kami. Hanya untuk waktu terbatas!
            </motion.p>
            <motion.button
              className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold flex items-center hover:bg-indigo-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Beli Sekarang <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </div>
          <motion.div
            className="w-full md:w-1/3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* <Image
              src="/placeholder.svg?height=300&width=300&text=Promo+Image"
              alt="Promo"
              className="w-full h-auto rounded-lg shadow-md"
            /> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
