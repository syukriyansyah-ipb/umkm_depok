'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { UploadDropzone } from '@/lib/uploadthing';
import toast from 'react-hot-toast';
import Loading from '@/app/components/front-end/LoadingSpinner'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(1, 'Description is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  imageUrl: z.string().min(1, 'Image is required'),
  discount: z.number().min(0).max(100),
  instagramUrl: z.string().url("Invalid instagramUrl URL").optional().or(z.literal("")),
  facebookUrl: z.string().url("Invalid facebookUrl URL").optional().or(z.literal("")),
  tiktokUrl: z.string().url("Invalid tiktokUrl URL").optional().or(z.literal("")),
  shopeeUrl: z.string().url("Invalid shopeeUrl URL").optional().or(z.literal("")),
  tokopediaUrl: z.string().url("Invalid tokopediaUrl URL").optional().or(z.literal("")),
  active: z.boolean(),
});


export default function EditPromotion() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Tambahkan state untuk loading fetch data

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      imageUrl: '',
      discount: 0,
      facebookUrl: '',
      instagramUrl: '',
      tiktokUrl: '',
      shopeeUrl: '',
      tokopediaUrl: '',
      active: true,
    },
  });

  useEffect(() => {
    const fetchPromotion = async () => {
      setIsFetching(true); // Aktifkan loading
      try {
        const response = await fetch(`/api/promotions/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch promotion');

        const data = await response.json();
        const startDate = new Date(data.startDate).toISOString().split('T')[0];
        const endDate = new Date(data.endDate).toISOString().split('T')[0];

        form.reset({ ...data, startDate, endDate, facebookUrl: data.facebookUrl ?? "", 
          instagramUrl: data.instagramUrl ?? "",
          tiktokUrl: data.tiktokUrl ?? "",
          shopeeUrl: data.shopeeUrl ?? "",
          tokopediaUrl: data.tokopediaUrl ?? "" });
      } catch (error) {
        console.error('Error fetching promotion:', error);
      } finally {
        setIsFetching(false); // Matikan loading setelah data diambil
      }
    };

    fetchPromotion();
  }, [params.id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/promotions/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to update promotion');
      toast.success('Promotion updated successfully');
      router.push('/admin/promotions');
      router.refresh(); // Tetap di halaman yang sama, tetapi refresh data
    } catch (error) {
      
      toast.error('Error updating promotion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!params?.id) {
    return <div>Invalid promotion ID</div>;
  }

  if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      }
  

  return (
    <div className="container mx-auto px-4 py-1">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Edit Promotions</h1>
      </div>
     
      <Card className="w-full p-4 bg-white rounded-lg shadow-md">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <UploadDropzone
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            if (res?.[0]) {
                              field.onChange(res[0].url);
                            }
                          }}
                          onUploadError={(error: Error) => {
                            console.error('Upload error:', error);
                          }}
                        />
                        {field.value && (
                          <div className="relative w-full h-48">
                            <img
                              src={field.value}
                              alt="Promotion preview"
                              className="rounded-lg object-cover w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="facebookUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>facebookUrl</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} disabled={isLoading}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagramUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>instagramUrl</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} disabled={isLoading}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tiktokUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>tiktokUrl</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} disabled={isLoading}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shopeeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>shopeeUrl</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} disabled={isLoading}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tokopediaUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>tokopediaUrl</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} disabled={isLoading}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

              <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-blue-500 text-white hover:bg-blue-600">
                  {isLoading ? 'Updating...' : 'Update Promotion'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
