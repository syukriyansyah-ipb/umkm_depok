'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductModal from './ui/ProductModal'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaTiktok, FaStore } from 'react-icons/fa'
import { SiShopee } from 'react-icons/si'
import axios from 'axios'

interface ProductType {
  _id: string
  name: string
  category: {
    _id: string
    name: string
  }
  price: number | string
  imageUrl: string | null
  description: string | null
  socialLinks: {
    instagram: string
    facebook: string
    tiktok: string
    shopee: string
    tokopedia: string
  }
  isBestSeller: boolean
}

export default function ProductList() {
  const [activeFilter, setActiveFilter] = useState<{ _id: string; name: string } | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)
  const [products, setProducts] = useState<ProductType[]>([])
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    axios.get('/api/categories')
      .then((res) => {
        const fetchedCategories = res.data.map((category: any) => ({
          _id: category._id,
          name: category.name
        }))
        setCategories([{ _id: 'best_seller', name: 'Best Seller' }, ...fetchedCategories])
        setActiveFilter({ _id: 'best_seller', name: 'Best Seller' })
      })
      .catch(err => console.error(err))

    axios.get('/api/products')
      .then((res) => {
        const formattedProducts = res.data.map((item: any) => ({
          _id: item._id,
          imageUrl: item.imageUrl,
          name: item.name,
          price: Number(item.price),
          category: item.category,
          description: item.description,
          socialLinks: item.socialLinks,
          isBestSeller: item.isBestSeller
        }))
        setProducts(formattedProducts)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (!isClient) return null // Menghindari mismatch SSR dan CSR

  const filteredProducts = activeFilter?._id === 'best_seller'
    ? products.filter(product => product.isBestSeller)
    : products.filter(product => product.category._id === activeFilter?._id)

  return (
    <section className="py-16 bg-gray-50 flex justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">Produk</h2>
          <div className="flex justify-center flex-wrap gap-4">
            {categories.map(filter => (
              <button
                key={filter._id}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 text-md sm:text-sm ${
                  activeFilter?._id === filter._id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-60 bg-gray-400 rounded-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-400 rounded"></div>
                  <div className="h-4 bg-gray-400 rounded"></div>
                  <div className="h-4 bg-gray-400 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.div
                  layout
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col relative"
                >
                  <div className="relative pt-[85%] w-full overflow-hidden group">
                    <Image
                      src={product.imageUrl || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                      priority
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
