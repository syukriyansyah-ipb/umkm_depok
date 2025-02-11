'use client'
import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-50">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dot Bounce Animation */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-gray-700 rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: index * 0.2 }}
            />
          ))}
        </div>

        {/* Teks Loading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-700"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  )
}