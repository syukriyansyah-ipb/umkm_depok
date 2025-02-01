"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { GoSortDesc } from "react-icons/go";

interface IProduct {
  _id: string;
  imgScr: string;
  fileKey: string;
  name: string;
  price: number;
  category: string;
}

const TrendingProducts = ({ searchQuery }: { searchQuery: string }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("price");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    axios
      .get("/api/get_products")
      .then((res) => {
        const formattedProducts = res.data.map((item: any) => ({
          _id: item._id,
          imgScr: item.imgScr,
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

  
  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "All" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase()
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div id="trending-products" className="container mx-auto px-6 mt-20">
   
      <div className="sm:flex justify-between items-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Featured Collections
        </h2>

        
        <div className="flex flex-col sm:flex-row gap-4 text-lg mt-4 sm:mt-0">
        
          <div className="relative">
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
              className="px-4 py-2 pr-10 rounded-lg shadow-md text-black bg-white border border-gray-300 focus:ring focus:ring-blue-500 appearance-none"
            >
              <option value="All">All Categories</option>
              <option value="Album">Album</option>
              <option value="Merch">Merch</option>
              <option value="Photocard">Photocard</option>
            </select>
            <GoSortDesc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

         
          <div className="relative">
            <select
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
              className="px-4 py-2 pr-10 rounded-lg shadow-md text-black bg-white border border-gray-300 focus:ring focus:ring-purple-500 appearance-none"
            >
              <option value="price">Sort by Price</option>
              <option value="name">Sort by Name</option>
            </select>
            <GoSortDesc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

     
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="flex justify-center items-center col-span-full">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : sortedProducts.length > 0 ? (
          sortedProducts.map((item: IProduct) => (
            <div
              key={item._id}
              className="transition-transform transform hover:scale-105"
            >
              <ProductCard
                id={item._id}
                img={item.imgScr}
                category={item.category}
                title={item.name}
                price={item.price}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default TrendingProducts;
