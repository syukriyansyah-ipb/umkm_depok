'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from '@/app/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/app/components/ui/pagination';
import { Button } from '@/app/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { ExternalLink } from 'lucide-react';
import Loading from '@/app/components/front-end/LoadingSpinner'
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Product {
  _id: string;
  name: string,
  description: string,
  price: number,
  category: string,
  imageUrl: string,
  socialLinks: {
    instagram: string,
    facebook:  string,
    tiktok: string,
    tokopedia: string,
    shopee: string,
  },
  isBestSeller: boolean,
}

const DATA_PER_PAGE = 10;

export default function PromotionList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(products.length / DATA_PER_PAGE);
  const currentData = products.slice((currentPage - 1) * DATA_PER_PAGE, currentPage * DATA_PER_PAGE);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await fetch(`/api/products/${deleteId}`, {
        method: 'DELETE',
      });
      setDeleteId(null);
      toast.success('Product has been deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete promotion:', error);
    }
  };

  if (loading) {
      return <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    }

  return (
    <div className="text-black bg-white p-4 rounded-lg shadow-md">
      
      <Table>
        <TableCaption>Promotions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>FacebookUrl</TableHead>
            <TableHead>InstagramUrl</TableHead>
            <TableHead>ShopeeUrl</TableHead>
            <TableHead>TokopediaUrl</TableHead>
            <TableHead>TiktokUrl</TableHead>
            <TableHead>Best Seller</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              {/* <TableCell>{product.description}</TableCell> */}
              {/* <TableCell>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{product.description}</ReactMarkdown>
              </TableCell> */}
              <TableCell>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {product.description.split(" ").length > 20
                    ? product.description.split(" ").slice(0, 20).join(" ") + "..."
                    : product.description}
                </ReactMarkdown>
              </TableCell>

              <TableCell>{formatRupiah(product.price)}</TableCell>
              <TableCell>
                <Image src={product.imageUrl} alt={product.name} width={50} height={50} />
              </TableCell>
              <TableCell className="text-center">
                {product.socialLinks.facebook ? (
                  <Link
                    href={product.socialLinks.facebook}
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
                {product.socialLinks.instagram ? (
                  <Link
                    href={product.socialLinks.instagram}
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
                {product.socialLinks.shopee ? (
                  <Link
                    href={product.socialLinks.shopee}
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
                {product.socialLinks.tokopedia ? (
                  <Link
                    href={product.socialLinks.tokopedia}
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
                {product.socialLinks.tiktok ? (
                  <Link
                    href={product.socialLinks.tiktok}
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
                {product.isBestSeller ? 'Yes' : 'No'}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/products/${product._id}/edit`}>
                    <Button variant="destructive" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button className='text-red-500 hover:text-red-600' variant="destructive" size="icon" onClick={() => setDeleteId(product._id)}>
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
              Showing {currentData.length} of {products.length} products
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
    </div>
  );
}
