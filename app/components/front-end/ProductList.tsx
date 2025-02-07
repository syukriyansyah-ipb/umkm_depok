'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductModal from './ui/ProductModal'
import Image from 'next/image'
import { ProductType } from '@/types/productType'
import { FaTiktok } from 'react-icons/fa'

import axios from "axios";



const filters = [
  { id: 'all', label: 'All' },
  { id: 'large', label: 'Large' },
  { id: 'medium', label: 'Medium' },
  { id: 'single', label: 'Single' },
  { id: 'double', label: 'Double' }
]

export default function ProductList() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)
  
  // dari contoh
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("price");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    axios
      .get("/api/get_products")
      .then((res) => {
        const formattedProducts = res.data.map((item: any) => ({
          _id: item._id,
          image: item.image,
          name: item.name,
          price: Number(item.price),
          category: item.category,
        }));
        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);


// asli
  

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h2>
         
        </div>
        {loading ? (
          <div className="flex justify-center items-center col-span-full">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {products.map(product => (
              <motion.div
                layout
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col relative"
              >
                <div className="relative pt-[100%] w-full overflow-hidden rounded-t-xl group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      priority
                    />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                    <h3 className="font-semibold text-lg text-white">{product.name}</h3>
                    <p className="text-sm text-gray-300">{product.category}</p>
                    <p className="font-bold text-xl text-white">Rp {product.price.toLocaleString('id-ID')}</p>
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
                      View Details
                    </button>
                    <div className="flex space-x-4 mt-2">
                      <a 
                        href="https://www.tiktok.com/@yourstore" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 transition-colors duration-300"
                      >
                        <FaTiktok size={24} />
                      </a>
                      <a 
                        href="https://shopee.co.id/yourstore" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 transition-colors duration-300"
                      >
                        {/* <ShopeeIcon /> */}
                      </a>
                    </div>
                  </div>
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

