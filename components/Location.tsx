'use client'

import { motion } from 'framer-motion'
import { Users, Briefcase, Award } from 'lucide-react'

export default function CompanyProfile() {
  const stats = [
    { icon: Users, value: '1000+', label: 'Pelanggan Puas' },
    { icon: Briefcase, value: '50+', label: 'Proyek Selesai' },
    { icon: Award, value: '10+', label: 'Penghargaan' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tentang Perusahaan Kami
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Visi Kami</h3>
            <p className="text-gray-600 mb-6">
              Menjadi perusahaan terkemuka dalam industri kami, memberikan solusi inovatif yang mengubah cara orang hidup dan bekerja.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Misi Kami</h3>
            <p className="text-gray-600">
              Kami berkomitmen untuk memberikan produk dan layanan berkualitas tinggi, mendorong inovasi, dan menciptakan nilai bagi pelanggan dan karyawan kami.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <stat.icon size={40} className="mx-auto mb-4 text-indigo-600" />
                <h4 className="text-3xl font-bold mb-2">{stat.value}</h4>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Nilai-Nilai Kami</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Integritas, inovasi, dan kepuasan pelanggan adalah inti dari semua yang kami lakukan. Kami percaya bahwa dengan menjunjung tinggi nilai-nilai ini, kami dapat menciptakan dampak positif yang langgeng bagi masyarakat dan lingkungan.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
