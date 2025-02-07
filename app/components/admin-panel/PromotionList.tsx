'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Promotion {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  discount: number;
  active: boolean;
}

export default function PromotionList() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await fetch('/api/promotions');
      const data = await response.json();
      setPromotions(data);
    } catch (error) {
      console.error('Failed to fetch promotions:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this promotion?')) return;

    try {
      await fetch(`/api/promotions/${id}`, {
        method: 'DELETE',
      });
      fetchPromotions();
    } catch (error) {
      console.error('Failed to delete promotion:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promotions.map((promotion) => (
        <Card key={promotion._id} className="flex flex-col">
          <div className="relative h-48">
            <img
              src={promotion.imageUrl}
              alt={promotion.title}
              className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
            />
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded-full text-sm ${promotion.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {promotion.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <CardContent className="flex-grow p-4">
            <h2 className="text-xl font-semibold mb-2">{promotion.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{promotion.description}</p>
            <div className="text-sm text-gray-500">
              <p>Discount: {promotion.discount}%</p>
              <p>Start: {format(new Date(promotion.startDate), 'MMM dd, yyyy')}</p>
              <p>End: {format(new Date(promotion.endDate), 'MMM dd, yyyy')}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 bg-gray-50 rounded-b-lg">
            <div className="flex justify-end gap-2 w-full">
              <Link href={`/promotions/${promotion._id}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(promotion._id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}