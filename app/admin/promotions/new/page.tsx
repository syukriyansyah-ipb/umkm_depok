'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Switch } from '@/app/components/ui/switch';
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
  lazada: z.string().url("Invalid Lazada URL").optional().or(z.literal("")),
  blibli: z.string().url("Invalid Blibli URL").optional().or(z.literal("")),
  bukalapak: z.string().url("Invalid Bukalapak URL").optional().or(z.literal("")),
  active: z.boolean(),
});

export default function NewPromotion() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/promotions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to create promotion');
      toast.success('Promotion created successfully!');
      router.push('/admin/promotions');
      router.refresh();
    } catch (error) {
      toast.error('Error creating promotion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
      return <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    }

  return (
    <div className="container mx-auto px-4 py-1">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Create New Promotions</h1>
      </div>
      <Card className='bg-white p-4 rounded-lg shadow-md'>
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
                      <Input {...field} />
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
                      <Textarea {...field} />
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
                        <Input type="date" {...field} />
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
                        <Input type="date" {...field} />
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
                          onClientUploadComplete={(res: { url: any; }[]) => {
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
                        <Input type="url" {...field} />
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
                        <Input type="url" {...field} />
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
                        <Input type="url" {...field} />
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
                        <Input type="url" {...field} />
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
                        <Input type="url" {...field} />
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  {isLoading ? 'Creating...' : 'Create Promotion'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}