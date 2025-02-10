import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Plus } from 'lucide-react';
import ProductTable from '@/app/components/admin-panel/ProductTable';

export default function Products() {
  return (
    <div className="container mx-auto px-3 py-2">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link href="/admin/products/new">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            <Plus className="mr-2 h-4 w-4 " />
            New
          </Button>
        </Link>
      </div>
      <ProductTable />
    </div>
  );
}