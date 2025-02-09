'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Edit2, Trash2, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import { formatRupiah } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  stock: number;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    whatsapp?: string;
  };
  active: boolean;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = selectedCategory
        ? `/api/products?category=${selectedCategory}`
        : '/api/products';
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 overflow-x-auto pb-4">
        <Button
          variant={selectedCategory === '' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('')}
          className="whitespace-nowrap"
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category._id}
            variant={selectedCategory === category._id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category._id)}
            className="whitespace-nowrap"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product._id} variants={item}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      product.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                      <p className="text-sm text-gray-500">{product.category.name}</p>
                    </div>
                    <p className="text-lg font-bold text-primary">
                      {formatRupiah(product.price)}
                    </p>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                  
                  <div className="flex gap-2 mt-4">
                    {product.socialLinks.instagram && (
                      <a
                        href={product.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-600"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {product.socialLinks.facebook && (
                      <a
                        href={product.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {product.socialLinks.twitter && (
                      <a
                        href={product.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-500"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {product.socialLinks.whatsapp && (
                      <a
                        href={`https://wa.me/${product.socialLinks.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-600"
                      >
                        <MessageCircle className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50">
                  <div className="flex justify-end gap-2 w-full">
                    <Link href={`/products/${product._id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}