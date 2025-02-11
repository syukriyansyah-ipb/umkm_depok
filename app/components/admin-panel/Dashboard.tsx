"use client";

import { useEffect, useState } from "react";
import { BarChart, Tag, ShoppingCart, Users, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import Loading from '@/app/components/front-end/LoadingSpinner'

export default function DashboardComponent() {
  const [stats, setStats] = useState({ categories: 0, products: 0, promotions: 0, users: 0 });
  const [products, setProducts] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading true sebelum fetch
      try {
        const [categoryRes, productRes, promoRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/products"),
          fetch("/api/promotions"),
        //   fetch("/api/users"),
        ]);

        if (!categoryRes.ok || !productRes.ok || !promoRes.ok) {
          throw new Error("Failed to fetch data from API");
        }

        const [categories, products, promotions] = await Promise.all([
          categoryRes.json(),
          productRes.json(),
          promoRes.json(),
        ]);

        setStats({
          categories: categories?.length ?? 0,
          products: products?.length ?? 0,
          promotions: promotions?.length ?? 0,
          users:  0,
        });

        setProducts(products ?? []);
        setPromotions(promotions ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading false setelah fetch selesai
      }
    }

    fetchData();
  }, []);

  if (loading) {
   return <div className="flex justify-center items-center h-screen">
             <Loading />
           </div>
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Categories" value={stats.categories.toString()} icon={<Tag size={28} />} color="bg-blue-500" />
        <StatCard title="Total Products" value={stats.products.toString()} icon={<ShoppingCart size={28} />} color="bg-green-500" />
        <StatCard title="Total Promotions" value={stats.promotions.toString()} icon={<Percent size={28} />} color="bg-yellow-500" />
        <StatCard title="Total Users" value={stats.users.toString()} icon={<Users size={28} />} color="bg-red-500" />
      </div>

      {/* Products Table */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Latest Products</h2>
        {products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.slice(0, 5).map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category?.name ?? "N/A"}</TableCell>
                  <TableCell>Rp. {product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-600">No products available.</p>
        )}
      </div>

      {/* Promotions List */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Active Promotions</h2>
        {promotions.length > 0 ? (
          <ul className="space-y-4">
            {promotions.slice(0, 3).map((promo) => (
              <li key={promo._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                <div>
                  <h3 className="text-lg font-bold">{promo.title}</h3>
                  <p className="text-sm text-gray-600">{promo.description}</p>
                  <p className="text-sm text-gray-600">
                    <strong>Discount:</strong> {promo.discount}%
                  </p>
                </div>
                <img src={promo.imageUrl} alt={promo.title} className="w-16 h-16 rounded-lg object-cover" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No active promotions.</p>
        )}
      </div>
    </div>
  );
}

// Component untuk Statistik Kartu
function StatCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <Card className={`p-4 flex items-center justify-between ${color} text-white rounded-lg shadow-md`}>
      <div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="p-3 bg-white bg-opacity-20 rounded-full">{icon}</div>
    </Card>
  );
}
