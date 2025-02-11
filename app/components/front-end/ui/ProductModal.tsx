import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
  price: number | string;
  imageUrl: string | null;
  description: string | null;
  isBestSeller: boolean;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

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
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg p-8 max-w-md w-full relative"
        >
          {/* Tombol Close yang Elegan */}
          <button
            onClick={onClose}
            className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Gambar Produk */}
          <div className="relative h-60 bg-gray-200 mb-4 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl || '/placeholder.svg'}
              alt={product.name}
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/* Kategori dan Nama Produk */}
          <p className="text-gray-600 text-sm">{product.category.name}</p>
          <h2 className="text-md font-bold mb-2 text-gray-800">{product.name}</h2>

          {/* Deskripsi dengan Scroll */}
          <div className="overflow-y-auto max-h-40 mb-4">
            <p className="text-gray-800 text-sm">
              product.description                
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}