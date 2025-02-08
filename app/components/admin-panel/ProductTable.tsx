'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/app/components/ui/table';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/ui/pagination';

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

const DATA_PER_PAGE = 10;

export default function PromotionList() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/promotions');
      const data = await response.json();
      setPromotions(data);
    } catch (error) {
      console.error('Failed to fetch promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(promotions.length / DATA_PER_PAGE);
  const currentData = promotions.slice(
    (currentPage - 1) * DATA_PER_PAGE,
    currentPage * DATA_PER_PAGE
  );

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
    <div className="text-black bg-white p-4 rounded-lg shadow-md">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <Table>
            <TableCaption>Products</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((promo) => (
                <TableRow key={promo._id}>
                  <TableCell>{promo.title}</TableCell>
                  <TableCell>{promo.description}</TableCell>
                  <TableCell>{promo.discount}%</TableCell>
                  <TableCell>{format(new Date(promo.startDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{format(new Date(promo.endDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <Image src={promo.imageUrl} alt={promo.title} width={50} height={50} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/admin/promotions/${promo._id}/edit`}>
                        <Button variant="outline" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(promo._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Showing {currentData.length} of {promotions.length} promotions
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
