'use client'
import { motion } from 'framer-motion';

export default function BestSeller () {
  return (
    <div className="py-16 bg-gray-100">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold">Best Seller Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Map daftar produk best seller di sini */}
        </div>
      </motion.div>
    </div>
  );
};
