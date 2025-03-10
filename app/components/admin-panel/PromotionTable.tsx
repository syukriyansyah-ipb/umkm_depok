'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from '@/app/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/app/components/ui/pagination';
import { Button } from '@/app/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import * as Dialog from '@radix-ui/react-dialog';
import { ExternalLink } from 'lucide-react';

interface Promotion {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  tokopediaUrl: string;
  shopeeUrl: string;
  tiktokUrl: string;
  discount: number;
  active: boolean;
}

const DATA_PER_PAGE = 10;

export default function PromotionList() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
  const currentData = promotions.slice((currentPage - 1) * DATA_PER_PAGE, currentPage * DATA_PER_PAGE);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await fetch(`/api/promotions/${deleteId}`, {
        method: 'DELETE',
      });
      setDeleteId(null);
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
            <TableCaption>Promotions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>FacebookUrl</TableHead>
                <TableHead>InstagramUrl</TableHead>
                <TableHead>ShopeeUrl</TableHead>
                <TableHead>TokopediaUrl</TableHead>
                <TableHead>TiktokUrl</TableHead>
                <TableHead>Active</TableHead>
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
                  <TableCell className="text-center">
                    {promo.facebookUrl ? (
                      <Link
                        href={promo.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center"
                      >
                        <ExternalLink className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                      </Link>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {promo.instagramUrl ? (
                      <Link
                        href={promo.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center"
                      >
                        <ExternalLink className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                      </Link>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {promo.shopeeUrl ? (
                      <Link
                        href={promo.shopeeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center"
                      >
                        <ExternalLink className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                      </Link>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {promo.tokopediaUrl ? (
                      <Link
                        href={promo.tokopediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center"
                      >
                        <ExternalLink className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                      </Link>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {promo.tiktokUrl ? (
                      <Link
                        href={promo.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center"
                      >
                        <ExternalLink className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                      </Link>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {promo.active ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/admin/promotions/${promo._id}/edit`}>
                        <Button variant="destructive" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <Button className='text-red-500 hover:text-red-600' variant="destructive" size="icon" onClick={() => setDeleteId(promo._id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
                            <Dialog.Title className="text-lg font-semibold text-gray-900">Confirm Deletion</Dialog.Title>
                            <Dialog.Description className="mt-2 text-gray-600">Are you sure you want to delete this promotion?</Dialog.Description>
                            <div className="mt-4 flex justify-end space-x-2">
                              <Dialog.Close asChild>
                                <Button variant="outline" className='text-gray-500 hover:text-gray-600'>Cancel</Button>
                              </Dialog.Close>
                              <Button variant="outline" onClick={handleDelete} className='text-red-500 hover:text-red-600 bg-red-100 hover:bg-red-200 border-red-300'>Delete</Button>
                            </div>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
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
                  <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} aria-disabled={currentPage === 1} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink isActive={currentPage === index + 1} onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} aria-disabled={currentPage === totalPages} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
