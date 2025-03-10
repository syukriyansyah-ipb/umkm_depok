import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Plus } from 'lucide-react';
import PromotionTable from '@/app/components/admin-panel/PromotionTable';

export default function Home() {
  return (
    <div className="container mx-auto px-3 py-2">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Promotions</h1>
        <Link href="/admin/promotions/new">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            <Plus className="mr-2 h-4 w-4 " />
            New
          </Button>
        </Link>
      </div>
      <PromotionTable />
    </div>
  );
}