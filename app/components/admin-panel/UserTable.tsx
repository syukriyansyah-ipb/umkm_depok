'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from '@/app/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/app/components/ui/pagination';
import { Button } from '@/app/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import Loading from '@/app/components/front-end/LoadingSpinner'

interface User {
  _id: string;
  username: string;
  role : string;
  
}

const DATA_PER_PAGE = 10;

export default function UserList() {
  const [users, setCategories] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(users.length / DATA_PER_PAGE);
  const currentData = users.slice((currentPage - 1) * DATA_PER_PAGE, currentPage * DATA_PER_PAGE);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await fetch(`/api/users/${deleteId}`, {
        method: 'DELETE',
      });
      setDeleteId(null);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
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
        <TableCaption>Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/users/${user._id}/edit`}>
                    <Button variant="destructive" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button className='text-red-500 hover:text-red-600' variant="destructive" size="icon" onClick={() => setDeleteId(user._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">Confirm Deletion</Dialog.Title>
                        <Dialog.Description className="mt-2 text-gray-600">Are you sure you want to delete this user?</Dialog.Description>
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
              Showing {currentData.length} of {users.length} users
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
