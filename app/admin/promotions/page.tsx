import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Plus } from 'lucide-react';
import PromotionList from '@/app/components/admin-panel/PromotionList';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Promotions Dashboard</h1>
        <Link href="/admin/promotions/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Promotion
          </Button>
        </Link>
      </div>
      <PromotionList />
    </div>
  );
}