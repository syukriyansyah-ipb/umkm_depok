'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductModal from './ui/ProductModal'
import Image from 'next/image'
import { ProductType } from '@/types/productType'

// Data produk
const productData: ProductType[] = [
  { 
    id: 1, 
    name: 'Large Sofa Blue', 
    category: 'Large', 
    price: 999,
    image: '/images/sofa_1.png',
    type: 'Furniture',
    description: 'A large blue sofa perfect for living rooms.'
  },
  { 
    id: 2, 
    name: 'Large Sofa White', 
    category: 'Large', 
    price: 899,
    type: 'Furniture',
    image: '/images/sofa_4.png',
    description: 'A large blue sofa perfect for living rooms.'
  },
  { 
    id: 3, 
    name: 'Single Chair', 
    category: 'Single', 
    price: 499,
    type: 'Furniture',
    image: '/images/sofa_3.png',
    description: 'A large blue sofa perfect for living rooms.'
  },
  { 
    id: 4, 
    name: 'Medium Sofa Gray', 
    category: 'Medium', 
    price: 799,
    type: 'Furniture',
    image: '/images/sofa_1.png',
    description: 'A large blue sofa perfect for living rooms.'
  },
  { 
    id: 5, 
    name: 'Double Sofa Beige', 
    category: 'Double', 
    price: 1299,
    type: 'Furniture',
    image: '/images/sofa_4.png',
    description: 'A large blue sofa perfect for living rooms.'
  },
  { 
    id: 6, 
    name: 'Single Armchair', 
    category: 'Single', 
    price: 599,
    type: 'Furniture',
    image: '/images/sofa_3.png',
    description: 'A large blue sofa perfect for living rooms.'
  },
]

const filters = [
  { id: 'all', label: 'All' },
  { id: 'large', label: 'Large' },
  { id: 'medium', label: 'Medium' },
  { id: 'single', label: 'Single' },
  { id: 'double', label: 'Double' }
]

export default function ProductList() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState(productData)
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId)
    const filtered = filterId === 'all' 
      ? productData 
      : productData.filter(product => product.category.toLowerCase() === filterId)
    setFilteredProducts(filtered)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gray-800 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                <div className="relative pt-[100%] w-full overflow-hidden rounded-t-xl group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                    <h3 className="font-semibold text-lg text-white">{product.name}</h3>
                    <p className="text-sm text-gray-300">{product.category}</p>
                    <p className="font-bold text-xl text-white">${product.price.toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  )
}

