import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function ProductModal({ product, onClose }) {
  if (!product) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-lg p-8 max-w-md w-full"
        >
          <div className="relative h-64 bg-gray-100 mb-4 rounded-lg overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">{product.name}</h2>
          <p className="text-gray-600 mb-4 text-center">{product.type}</p>
          <p className="text-gray-800 mb-4">{product.description}</p>
          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

