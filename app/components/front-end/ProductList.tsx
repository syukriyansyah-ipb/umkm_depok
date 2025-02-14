'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductModal from './ui/ProductModal'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaTiktok, FaStore } from 'react-icons/fa' // Import ikon media sosial
import { SiShopee } from "react-icons/si"
import axios from "axios"

interface ProductType {
  _id: string
  name: string
  category: {
    _id: string,
    name: string
  }
  price: number | string
  imageUrl: string | null
  description: string | null
  socialLinks: {
    instagram: string,
    facebook: string,
    tiktok: string,
    shopee: string,
    tokopedia: string,
  }
  isBestSeller: boolean
}

export default function ProductList() {
  const [activeFilter, setActiveFilter] = useState({ _id: 'best_seller', name: 'Best Seller' }) // Default filter
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)
  const [products, setProducts] = useState<ProductType[]>([])
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch categories
    axios.get("/api/categories")
      .then((res) => {
        const fetchedCategories = res.data.map((category: any) => ({
          _id: category._id,
          name: category.name
        }))
        setCategories([{ _id: 'best_seller', name: 'Best Seller' }, ...fetchedCategories])
      })
      .catch(err => console.error(err))

    // Fetch products
    axios
      .get("/api/products")
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
        }));
        setProducts(formattedProducts);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  // Filter produk berdasarkan kategori yang dipilih
  const filteredProducts = activeFilter._id === 'best_seller'
    ? products.filter(product => product.isBestSeller) // Filter produk Best Seller
    : products.filter(product => product.category._id === activeFilter._id) // Filter produk berdasarkan kategori

  return (
    <section id="products" className="py-16 bg-gray-50 flex justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">Produk</h2>
          {loading || categories.length === 0 || filteredProducts.length === 0 ? (
            <div className="flex justify-center items-center col-span-full">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
          <div className="flex justify-center flex-wrap gap-4">
            {categories.map(filter => (
              <button
                key={filter._id}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 text-md sm:text-sm ${
                  activeFilter._id === filter._id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
          )}
        </div>

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
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300 rounded-lg">
                    {product.imageUrl && (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                        priority
                      />
                    )}
                  </div>
                  {product.isBestSeller && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Best Seller
                    </span>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full hover:bg-white shadow-lg"
                    >
                      Detail
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs md:text-xs text-gray-600">{product.category.name}</p>
                  <p className="font-semibold text-xs md:text-lg text-gray-800">{product.name}</p>
                  <p className="font-semibold text-xs md:text-lg text-gray-800">Rp {product.price.toLocaleString('id-ID')}</p>
                  <div className="flex space-x-1 md:space-x-2 mt-2">
                    {product.socialLinks.facebook && (
                      <a href={product.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-400 transition-colors">
                        <FaFacebook className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                    {product.socialLinks.instagram && (
                      <a href={product.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[#E1306C] transition-colors">
                        <FaInstagram className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                    {product.socialLinks.shopee && (
                      <a href={product.socialLinks.shopee} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-400 transition-colors">
                        <SiShopee className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                    {product.socialLinks.tiktok && (
                      <a href={product.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition-colors">
                        <FaTiktok className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                    {product.socialLinks.tokopedia && (
                      <a href={product.socialLinks.tokopedia} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-500 transition-colors">
                        <FaStore className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal untuk menampilkan detail produk */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}