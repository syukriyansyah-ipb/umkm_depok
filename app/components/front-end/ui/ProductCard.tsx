import { motion } from 'framer-motion'
import Image from 'next/image'

interface Product {
  id: number;
  name: string;
  type: string;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onDetails: () => void;
}

export default function ProductCard({ product, onDetails }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-64 bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          layout="fill"
          objectFit="contain"
          className="transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={onDetails}
            className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-center">{product.name}</h3>
        <p className="text-gray-600 text-center">{product.type}</p>
      </div>
    </motion.div>
  )
}

