'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ui/ProductCard'
import ProductModal from './ui/ProductModal'

// Updated product data with more realistic images
const products = [
  { id: 1, name: 'Large Sofa Blue', type: 'Large', image: '/images/sofa_1.png', description: 'Elegant timepiece with a leather strap' },
  { id: 2, name: 'Large Sofa White', type: 'Large', image: '/images/sofa_4.png', description: 'High-quality sound with noise cancellation' },
  { id: 3, name: 'Single Chair', type: 'Single', image: '/images/sofa_3.png', description: 'Genuine leather wallet with multiple card slots' },
  { id: 1, name: 'Large Sofa Blue', type: 'Large', image: '/images/sofa_1.png', description: 'Elegant timepiece with a leather strap' },
  { id: 2, name: 'Large Sofa White', type: 'Large', image: '/images/sofa_4.png', description: 'High-quality sound with noise cancellation' },
  { id: 3, name: 'Single Chair', type: 'Single', image: '/images/sofa_3.png', description: 'Genuine leather wallet with multiple card slots' },

]

const productTypes = ['All', 'Large', 'Single']

interface Product {
  id: number;
  name: string;
  type: string;
  image: string;
  description: string;
}

export default function ProductSection() {
  const [filter, setFilter] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(product => product.type === filter)

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
        
        <div className="flex justify-center space-x-4 mb-16">
          {productTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full ${
                filter === type ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              } transition-colors duration-300`}
            >
              {type}
            </button>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onDetails={() => setSelectedProduct(product)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  )
}

