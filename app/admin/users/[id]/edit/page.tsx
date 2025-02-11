'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import Loading from '@/app/components/front-end/LoadingSpinner'

const formSchema = z.object({
  username: z.string().min(1, 'Name is required').max(50).regex(/^\S+$/, "Username cannot contain spaces"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().default('admin'),
  isPasswordChanged: z.boolean().default(true)
});

export default function EditPromotion() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Tambahkan state untuk loading fetch data

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      role : 'admin',
      isPasswordChanged : true
    },
  });

  useEffect(() => {
    const fetchPromotion = async () => {
      setIsFetching(true); // Aktifkan loading
      try {
        const response = await fetch(`/api/users/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch user');

        const data = await response.json();

        form.reset({ ...data});
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsFetching(false); // Matikan loading setelah data diambil
      }
    };

    fetchPromotion();
  }, [params.id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to update user');
      router.push('/admin/users');
      router.refresh(); // Tetap di halaman yang sama, tetapi refresh data
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!params?.id) {
    return <div>Invalid user ID</div>;
  }

  if (isFetching || isLoading) {
      return <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    }

  return (
    <div className="container mx-auto px-4 py-1">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Edit Kategori</h1>
      </div>
     
      <Card className="w-full p-4 bg-white rounded-lg shadow-md">
        <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type='password' {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading} className="bg-blue-500 text-white hover:bg-blue-600">
                    {isLoading ? 'Updating...' : 'Update'}
                  </Button>
                </div>
              </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
