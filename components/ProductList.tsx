'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye } from 'lucide-react'
import Image from 'next/image'

const products = [
  { id: 1, name: 'Smartphone X1', category: 'Elektronik', price: 'Rp 5.999.000', image: '/images/sofa_1.png' },
  { id: 2, name: 'Jaket Denim Premium', category: 'Pakaian', price: 'Rp 899.000', image: '/images/sofa_2.png' },
  { id: 3, name: 'Laptop UltraSlim', category: 'Elektronik', price: 'Rp 12.500.000', image: '/images/sofa_3.png' },
  { id: 4, name: 'Sneakers SportMax', category: 'Pakaian', price: 'Rp 1.299.000', image: '/images/sofa_4.png' },
  { id: 5, name: 'Smartwatch FitPro', category: 'Aksesoris', price: 'Rp 2.199.000', image: '/images/sofa_1.png' },
  { id: 6, name: 'Kacamata VR Pro', category: 'Aksesoris', price: 'Rp 4.500.000', image: '/images/sofa_2.png' },
]

const categories = ['Semua', 'Elektronik', 'Pakaian', 'Aksesoris']

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredProducts = selectedCategory === 'Semua'
    ? products
    : products.filter(product => product.category === selectedCategory)

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Produk Unggulan</h2>
        <div className="flex justify-center mb-12">
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`mx-2 px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-800 hover:bg-gray-100 hover:shadow'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-w-4 aspect-h-3 overflow-hidden group">
                  {/* <p>{product.image}</p> */}
                  <Image
  src={product.image || "/placeholder.svg"}
  alt={product.name}
  layout="responsive"
  width={500} // Sesuaikan ukuran
  height={375} // 4:3 rasio
  objectFit="cover"
  className="rounded-lg"
/>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Lihat Detail
                    </motion.button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-indigo-600 text-lg font-semibold mb-4">{product.price}</p>
                  <motion.button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 text-lg font-semibold flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Eye className="mr-2" size={20} />
                    Detail Produk
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-xl p-8 max-w-lg w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <X size={24} />
              </button>
              <div className="relative aspect-w-16 aspect-h-9 mb-6 overflow-hidden rounded-lg">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-gray-800">{selectedProduct.name}</h3>
              <p className="text-gray-600 mb-2 text-lg">{selectedProduct.category}</p>
              <p className="text-2xl font-semibold mb-4 text-indigo-600">{selectedProduct.price}</p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <motion.button
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Eye className="mr-2" size={20} />
                Lihat Spesifikasi Lengkap
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

